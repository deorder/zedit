ngapp.service('themeService', function(settingsService) {
    let service = this,
        unknownMetaData = {
            author: 'Unknown',
            released: '?',
            updated: '?',
            description: 'This theme does not have embedded metadata.'
        };

    let loadTheme = function(filePath) {
        let fileContents = fh.appDir.read(filePath),
            filename = filePath.split('\\').last(),
            defaultMetaData = Object.assign(unknownMetaData, {
                name: service.extractThemeName(filename),
            }),
            match = fileContents.match(new RegExp(/^\/\*\{([\w\W]+)\}\*\//)),
            metaData = defaultMetaData;
        try {
            if (match) metaData = JSON.parse(`{${match[1]}}`);
        } catch (x) {
            console.log(`Error parsing metadata for theme ${filename}: ${x.message}`);
        }
        metaData.filename = filename;
        return metaData;
    };

    this.extractThemeName = function(filename, defaultName = '') {
        let match = filename.match(/(.*)\.css/);
        return match ? match[1] : defaultName;
    };

    this.getThemes = function() {
        let themes = fh.appDir.find('themes', { matching: '*.css' });
        return themes.map(loadTheme);
    };

    this.getSyntaxThemes = function() {
        let themes = fh.appDir.find('syntaxThemes', { matching: '*.css' });
        return themes.map(function(theme) {
            let filename = theme.split('\\').last();
            return {
                filename: filename,
                name: service.extractThemeName(filename)
            };
        });
    };

    this.getCurrentTheme = function() {
        let settingsTheme = settingsService.globalSettings.theme,
            themePath = `themes\\${settingsTheme}`;
        if (!settingsTheme || !fh.appDir.exists(themePath)) {
            let availableThemes = service.getThemes();
            return availableThemes[0].filename;
        }
        return settingsTheme;
    };

    this.getCurrentSyntaxTheme = function() {
        let settingsTheme = settingsService.globalSettings.syntaxTheme,
            themePath = `syntaxThemes\\${settingsTheme}`;
        if (!settingsTheme || !fh.appDir.exists(themePath)) {
            return '';
        }
        return settingsTheme;
    };

    this.init = function(scope) {
        let themeStylesheet = document.getElementById('theme'),
            syntaxThemeStylesheet = document.getElementById('syntaxTheme');

        // event listeners
        scope.$on('setTheme', (e, theme) => scope.theme = theme);
        scope.$on('setSyntaxTheme', (e, theme) => scope.syntaxTheme = theme);

        scope.$watch('theme', function() {
            let themeFilePath = fh.jetpack.path(`themes/${scope.theme}`);
            themeStylesheet.href = themeFilePath;
            scope.$broadcast('themeChanged', scope.theme);
            ipcRenderer.send('set-theme', themeFilePath);
        });

        scope.$watch('syntaxTheme', function() {
            if (scope.syntaxTheme === '') {
                syntaxThemeStylesheet.href = '';
            } else {
                let syntaxThemePath = `syntaxThemes/${scope.syntaxTheme}`;
                syntaxThemeStylesheet.href = fh.jetpack.path(syntaxThemePath);
            }
            scope.$broadcast('syntaxThemeChanged', scope.syntaxTheme);
        });

        // initialization
        scope.theme = service.getCurrentTheme();
        scope.syntaxTheme = service.getCurrentSyntaxTheme();
    }
});
