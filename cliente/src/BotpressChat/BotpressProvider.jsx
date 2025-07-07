import React, { useState } from "react";
import { Webchat } from "@botpress/webchat";
import { BOT_CONFIG } from "./config/botpress.config";

export default function BotpressChat() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Botón flotante para abrir el chat */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#007bff",
            color: "#fff",
            border: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            fontSize: 32,
            cursor: "pointer",
          }}
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}

      {/* Chat embebido, solo si open=true */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 400,
            maxWidth: "95vw",
            height: 600,
            maxHeight: "90vh",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Botón para cerrar */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: 40,
              borderBottom: "1px solid #eee",
              background: "transparent",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 28,
                cursor: "pointer",
                color: "#444",
                marginRight: 12,
                marginTop: 4,
                transition: "color 0.2s",
                lineHeight: 1,
                padding: 0,
              }}
              aria-label="Cerrar chat"
              onMouseOver={e => (e.currentTarget.style.color = "#007bff")}
              onMouseOut={e => (e.currentTarget.style.color = "#444")}
            >
              &#10005;
            </button>
          </div>
          {/* El chat */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <Webchat
              botId={BOT_CONFIG.botId}
              hostUrl={BOT_CONFIG.hostUrl}
              clientId={BOT_CONFIG.clientId}
              hideWidget={true} // Para que no salga el botón flotante de Botpress
              botName="InnoventaBot"
              disableAnimations={false}
              closeOnEscape={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}