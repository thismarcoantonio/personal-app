import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "personal.app.com",
  appName: "Personal App",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#4C11CA",
      sound: "beep.wav",
    },
  },
};

export default config;
