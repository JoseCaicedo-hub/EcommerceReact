import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "./ChatBotCustom.css"; // nuevo archivo CSS

const DiseñoChat = {
  background: "#ffffff", /* Fondo blanco */
  fontFamily: "'Segoe UI', sans-serif",
  headerBgColor: "#000000", /* Encabezado negro */
  headerFontColor: "#ffffff", /* Texto de encabezado blanco */
  headerFontSize: "18px",
  botBubbleColor: "#f0f0f0", /* Burbuja del bot gris claro */
  botFontColor: "#333333", /* Texto del bot gris oscuro */
  userBubbleColor: "#e0e0e0", /* Burbuja del usuario gris */
  userFontColor: "#000000", /* Texto del usuario negro */
  borderRadius: "10px",
};

export default class MainChatBot extends Component {
  validarNombre = (value) => {
    if (value.length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    if (value.length > 15) {
      return "El nombre debe tener máximo 15 caracteres";
    }
    if (/\d/.test(value)) {
      return "El nombre no puede contener números";
    }
    if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
      return "El nombre debe comenzar con mayúscula.";
    }
    return true;
  };

  render() {
    return (
      <ThemeProvider theme={DiseñoChat}>
        <ChatBot
          headerTitle="💎 Asistente Virtual"
          botAvatar="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          userAvatar="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
          style={{
            boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
            borderRadius: "14px",
            border: "2px solid #000000", /* Borde negro */
            maxWidth: "350px",
          }}
          contentStyle={{
            background: "linear-gradient(145deg, #ffffff, #e0e0e0)", /* Fondo blanco a gris claro */
            color: "#333333", /* Gris oscuro */
            fontSize: "15px",
            padding: "10px",
            borderRadius: "0 0 14px 14px",
          }}
          inputStyle={{
            background: "#fff8f0",
            border: "1px solid #ffffff", /* Borde blanco */
            borderRadius: "6px",
            padding: "8px",
            fontSize: "14px",
            color: "#3e2f1c",
          }}
          bubbleStyle={{
            padding: "8px 12px",
            borderRadius: "10px",
          }}
          steps={[
            {
              id: "intro",
              message:
                "💎 Bienvenido a nuestra tienda de ropa. ¿Cómo te llamas?",
              trigger: "nombre",
            },
            {
              id: "nombre",
              user: true,
              validator: this.validarNombre,
              trigger: "saludo",
            },
            {
              id: "saludo",
              message:
                "Encantado de conocerte {previousValue} ✨. ¿Qué tipo de asesoría necesitas?",
              trigger: "tipoAsesoria",
            },
            {
              id: "tipoAsesoria",
              options: [
                {
                  value: "productos",
                  label: "👕 Información sobre productos de ropa",
                  trigger: "infoProductos",
                },
                {
                  value: "promociones",
                  label: "💸 Promociones y descuentos en ropa",
                  trigger: "promociones",
                },
                {
                  value: "personalizada",
                  label: "🤝 Asesoría de estilo personalizada",
                  trigger: "asesoriaPersonalizada",
                },
              ],
            },
            {
              id: "infoProductos",
              message:
                "Tenemos ropa para hombre, mujer y niños. ¿Quieres que te recomiende algo? 💙",
              trigger: "quieresRecomendacion",
            },
            {
              id: "quieresRecomendacion",
              options: [
                { value: "si", label: "Sí", trigger: "recomendacionRopa" },
                { value: "no", label: "No", trigger: "fin" },
              ],
            },
            {
              id: "recomendacionRopa",
              message:
                "✨ Recomendaciones:\n- Camisetas de algodón 👕\n- Pantalones casuales 👖\n- Gorras deportivas 🧢\n¿Quieres ayuda con algo más?",
              trigger: "finOpcional",
            },
            {
              id: "promociones",
              message:
                "🎉 Tenemos 20% OFF en toda la colección de verano. ¡Aprovecha antes de que acabe!",
              trigger: "fin",
            },
            {
              id: "asesoriaPersonalizada",
              message:
                "📞 Para asesoría personalizada, contáctanos al: +57 300 123 4567. ¿Quieres algo más?",
              trigger: "finOpcional",
            },
            {
              id: "finOpcional",
              options: [
                { value: "si", label: "Sí", trigger: "saludo" },
                { value: "no", label: "No, gracias", trigger: "despedida" },
              ],
            },
            {
              id: "fin",
              message: "¿Puedo ayudarte con algo más? 💬",
              trigger: "finOpcional",
            },
            {
              id: "despedida",
              message:
                "💙 ¡Gracias por visitarnos! Que tengas un excelente día ✨",
              end: true,
            },
          ]}
        />
      </ThemeProvider>
    );
  }
}
