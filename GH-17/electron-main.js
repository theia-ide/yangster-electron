// @ts-check
const cluster = require('cluster');
if (cluster.isMaster) {
    // Workaround for https://github.com/electron/electron/issues/9225. Chrome has an issue where
    // in certain locales (e.g. PL), image metrics are wrongly computed. We explicitly set the
    // LC_NUMERIC to prevent this from happening (selects the numeric formatting category of the
    // C locale, http://en.cppreference.com/w/cpp/locale/LC_categories).
    if (process.env.LC_ALL) {
        process.env.LC_ALL = 'C';
    }
    process.env.LC_NUMERIC = 'C';
    const electron = require('electron');
    electron.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron.app.quit();
        }
    });
    electron.app.on('ready', function () {
        const path = require('path');
        const { fork } = require('child_process');
        // Check whether we are in bundled application or development mode.
        const devMode = process.defaultApp || /node_modules[\/]electron[\/]/.test(process.execPath);
        const mainWindow = new electron.BrowserWindow({ width: 1024, height: 728, show: false });
        mainWindow.on('ready-to-show', () => mainWindow.show());
        const mainPath = path.join(__dirname, '..', 'backend', 'main');
        const loadMainWindow = function (port) {
            mainWindow.loadURL(`file://${path.join(__dirname, '../../lib/index.html')}?port=${port}`);
        };
        // We need to distinguish between bundled application and development mode when starting the clusters.
        // https://github.com/electron/electron/issues/6337#issuecomment-230183287
        if (devMode) {
            require(mainPath).then(address => {
                loadMainWindow(address.port);
            }).catch((error) => {
                console.error(error);
                electron.app.exit(1);
            });
        } else {
            const cp = fork(mainPath);
            cp.on('message', function (message) {
                loadMainWindow(message);
            });
            cp.on('error', function (error) {
                console.error(error);
                electron.app.exit(1);
            });
            electron.app.on('quit', function() {
                // If we forked the process for the clusters, we need to manually terminate it.
                // See: https://github.com/theia-ide/theia/issues/835
                process.kill(cp.pid);
            })
        }
        mainWindow.on('closed', function () {
            electron.app.exit(0);
        });
    });
} else {
    require('../backend/main');
}
