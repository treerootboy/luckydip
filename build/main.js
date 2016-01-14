'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const globalShortcut = electron.globalShortcut;

const ipcMain = electron.ipcMain;

const dialog = electron.dialog;

const Menu = electron.remote.Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, printWindow;

function createWindow () {

    mainWindow = new BrowserWindow({width: 1360, height: 790, fullscreen: true});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    var menu = new Menu();
    menu.append(new MenuItem({ 
        label: '打印', 
        click: fucntion(){
            printWindow = new BrowserWindow({width: 800, height: 600});
            printWindow.loadURL('file://' + __dirname + '/index.html#/print');
            printWindow.on('closed', function() {
                printWindow = null;
            });
            printWindow.show();
        }
    }));

    globalShortcut.register('ctrl+alt+r', function() {
        dialog.showMessageBox(mainWindow, {
            type: 'question',
            buttons: ['确定', '取消'],
            title: '重置数据',
            message: '确定要重置数据',
            cancelId: 1,
        }, function(response){
            if (response==0)
                mainWindow.webContents.session.clearStorageData({
                    origin: "file://",
                    storages: ['localstorage'],
                    quotas: ['persistent']
                }, function(){
                    mainWindow.webContents.reload();
                });
        });
    });

    globalShortcut.register('ctrl+r', function() {
        mainWindow.webContents.reload();
    });

    globalShortcut.register('esc', function() {
        mainWindow.setFullScreen(!(mainWindow.isFullScreen()));
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
