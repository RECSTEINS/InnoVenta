// src/BotpressChat/config/botpress.config.js
import { Webchat } from '@botpress/webchat';


export const BOT_CLIENT_ID = "f3f4c84a-1aa4-48b5-8f80-c47bb0900e9e";
export const BOT_HOST_URL = "https://cdn.botpress.cloud/webchat/v1";

export const BOT_CONFIG = {
  botId: BOT_CLIENT_ID,
  hostUrl: BOT_HOST_URL,
  messagingUrl: "https://messaging.botpress.cloud",
  clientId: BOT_CLIENT_ID,
  webhookId: "your-webhook-id", // Opcional
  lazySocket: true,
  themeName: "prism",
  frontendVersion: "v1",
  showPoweredBy: false,
  enableConversationsDeletion: true,
  showConversationsButton: false,
  disableAnimations: false,
  closeOnEscape: false,
  showTimestamp: true,
  enableTranscriptDownload: false,
  stylesheet: "https://cdn.botpress.cloud/webchat/v1/inject.css",
  // Configuración del botón flotante
  hideWidget: false,
  disableAnimations: false,
  // Configuración del nombre del bot
  botName: "InnoventaBot",
  // Configuración de tamaño
  size: "large", // "small", "medium", "large"
  // O configuración personalizada
  // size: {
  //   width: 400,
  //   height: 600
  // }
};
