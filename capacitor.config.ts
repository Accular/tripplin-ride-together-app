
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b7d5f3a368cf484bac8a86344f029e21',
  appName: 'tripplin-ride-together-app',
  webDir: 'dist',
  server: {
    url: 'https://b7d5f3a3-68cf-484b-ac8a-86344f029e21.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // Enable live reload for development
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    }
  }
};

export default config;
