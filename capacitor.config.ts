import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vidhi.mitra',
  appName: 'Vidhi Mitra',
  webDir: 'out',
  server: {
    url: 'https://vidhi-mitra.shilpshakti.org.in',
    cleartext: false
  }
};

export default config;