# zedit

An integrated development environment for Bethesda Plugin Files.

- [Documentation](https://z-edit.github.io)
- [xEdit Comparison](https://z-edit.github.io/#/docs?t=Overview%2FxEdit%20Comparison)
- [Screenshots](https://imgur.com/a/sHguD)

# usage
Download a release from the [releases tab](https://github.com/matortheeternal/zedit/releases) and install or extract it, then run `zEdit.exe`.

# development
zEdit is a Windows x64 NodeJS Electron application.  Install [NodeJS](https://nodejs.org/en/download/current/) **64-bit**, then start a terminal/command prompt in the application directory and run `node -v` and `npm -v`.  The output should be v6.9.5 and 5.3.0 or newer.  If you get anything else you probably have multiple installations of node which you'll need to sort out.

Before installing node modules you need to tell NodeJS where Python is so it can build certain native dependencies.  Install [python 2.7](https://www.python.org/downloads/windows/)\* and [add an environmental variable](https://kb.wisc.edu/cae/page.php?id=24500) `PYTHON` set to the full path to `python.exe`.  E.g. `C:\dev\lang\Python27\python.exe`.  Restart your command prompt and test the environmental variable by typing `echo %PYTHON%`.

You will also need to install the `windows-build-tools` package.  Run `npm install --global --production windows-build-tools` in an elevated command prompt to do so.

Clone zEdit and run `npm install` in an elevated command prompt in its directory.  This will install required node modules and dependencies.  You will also need to run `npm run rebuild` to rebuild the xelib native node addon to work with Electron.

You can then run the application with `npm start`.

## building
You can build a release of the application using `npm run release`.  The application structure is based off of [electron-boilerplate](https://github.com/szwacz/electron-boilerplate).  

## troubleshooting
- If you get `Error: Electron failed to install correctly`, simply delete the `node_modules\electron` folder and run `npm install` again.

# contact
If you're looking for support or want to contribute, join the [Modding Tools discord server](https://discord.gg/GUfRdpT).

You can view project progress and user stories on the [trello board](https://trello.com/b/AudbG6UN/zedit).
