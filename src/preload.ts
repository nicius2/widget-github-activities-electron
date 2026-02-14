import { contextBridge, ipcRenderer } from 'electron';

console.log('=== Preload Script ===');

contextBridge.exposeInMainWorld('env', {
  getEnv: () => ipcRenderer.invoke('get-env'),
});

