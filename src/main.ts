import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('=== Main Process ===');
console.log('GITHUB_USERNAME:', process.env.GITHUB_USERNAME);
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? 'Loaded' : 'NOT loaded');

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
     const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
     const widgetWidth = 380;
     const widgetHeight = 200;

     // Calculate position: Centered horizontally, 15% from top vertically
     const defaultX = Math.round((screenWidth - widgetWidth) / 2);
     const defaultY = Math.round(screenHeight * 0.05);

     // Get position from env or use calculated defaults
     const posX = parseInt(process.env.WIDGET_X || defaultX.toString(), 10);
     const posY = parseInt(process.env.WIDGET_Y || defaultY.toString(), 10);

     mainWindow = new BrowserWindow({
          width: widgetWidth,
          height: widgetHeight,
          x: posX,
          y: posY,
          type: 'desktop', // Essential for Linux to keep it as a wallpaper widget
          frame: false,
          transparent: true,
          alwaysOnTop: false, // Changed to false to stay on desktop
          resizable: false,
          skipTaskbar: true,
          hasShadow: false,
          focusable: false, // Widget won't steal focus
          webPreferences: {
               preload: path.join(__dirname, 'preload.js'),
               contextIsolation: true, // Enable context isolation for security
               nodeIntegration: false, // Disable node integration for security
               backgroundThrottling: false, // Keep running in background
          },
     });

     mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

     // Set window to desktop level (behind all windows)
     mainWindow.setAlwaysOnTop(false);
     mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
     mainWindow.setSkipTaskbar(true);

     // On Linux, set window type to desktop
     if (process.platform === 'linux') {
          mainWindow.setAlwaysOnTop(false);
          // Window will stay behind other windows by default with alwaysOnTop: false
     }

     // Enable dragging
     mainWindow.setIgnoreMouseEvents(false);

     // Optimize memory usage
     mainWindow.webContents.on('did-finish-load', () => {
          // Reduce memory footprint
          mainWindow?.webContents.setBackgroundThrottling(false);
     });

     // Open DevTools in development
     // mainWindow.webContents.openDevTools();

     mainWindow.on('closed', () => {
          mainWindow = null;
     });
}

// Optimize app for background execution
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
     app.quit();
} else {
     app.on('second-instance', () => {
          // Someone tried to run a second instance, we should focus our window.
          if (mainWindow) {
               if (mainWindow.isMinimized()) mainWindow.restore();
               mainWindow.focus();
          }
     });

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
}
