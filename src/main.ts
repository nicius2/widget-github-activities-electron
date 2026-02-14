import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
     const { width, height } = screen.getPrimaryDisplay().workAreaSize;

     mainWindow = new BrowserWindow({
          width: 900,
          height: 200,
          x: width - 920,
          y: 20,
          frame: false,
          transparent: true,
          alwaysOnTop: true,
          resizable: false,
          skipTaskbar: true,
          webPreferences: {
               nodeIntegration: true,
               contextIsolation: false,
          },
     });

     mainWindow.loadFile(path.join(__dirname, '../src/renderer/index.html'));

     // Enable dragging
     mainWindow.setIgnoreMouseEvents(false);

     // Open DevTools in development
     // mainWindow.webContents.openDevTools();

     mainWindow.on('closed', () => {
          mainWindow = null;
     });
}

app.whenReady().then(() => {
     createWindow();

     app.on('activate', () => {
          if (BrowserWindow.getAllWindows().length === 0) {
               createWindow();
          }
     });
});

app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') {
          app.quit();
     }
});
