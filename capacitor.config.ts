import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spcwin.app',
  appName: 'spcwin-app',
  webDir: 'public',
    server: {
    url: 'https://spcwin.info',
    cleartext: false
  }
};

export default config;
