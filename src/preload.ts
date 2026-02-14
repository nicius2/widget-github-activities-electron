import { contextBridge } from 'electron';

console.log('=== Preload Script ===');

// The environment variables are already loaded in the main process
// We just need to expose them to the renderer
const envVars = {
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || '',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
};

console.log('GITHUB_USERNAME:', envVars.GITHUB_USERNAME);
console.log('GITHUB_TOKEN:', envVars.GITHUB_TOKEN ? 'Token loaded (hidden)' : 'Token NOT loaded');

// Expose environment variables to renderer
contextBridge.exposeInMainWorld('env', envVars);

