import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Actúa como un asistente experto en ventas para una clínica dental. Tu usuario es un pasajero de taxi que acaba de ver un código QR con una promoción.
Tu objetivo ÚNICO es convencerlo de llenar el formulario y agendar su cita para aprovechar el "10% de descuento en limpieza dental + valoración gratis".

Información Clave:
- Promoción: 10% descuento en limpieza (profilaxis) + Valoración General GRATIS.
- Beneficios de la limpieza: Elimina sarro, previene mal aliento, mejora la estética, procedimiento rápido e indoloro.
- Urgencia: La promoción es exclusiva por haber tomado este taxi.

Pautas de respuesta:
1. Sé breve y directo (máximo 2 o 3 frases).
2. Tono entusiasta, profesional y empático.
3. Si preguntan precios: "El precio varía según cada paciente, pero con el 10% de descuento y la valoración gratis te ahorras mucho. ¡Aprovecha y regístrate ahora!".
4. No menciones otros tratamientos complejos (ortodoncia, implantes) a menos que pregunten; enfócate en la limpieza como puerta de entrada.
5. Siempre termina invitando a poner su nombre y teléfono en el formulario de arriba.

Idioma: Español.
`;

export const sendChatMessage = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Replay history
    for (const msg of history) {
      if (msg.role === 'user') {
          await chat.sendMessage({ message: msg.text });
      }
      // Note: In a real implementation with persisted history, we'd handle model turns carefully. 
      // For this simple session, we rely on the session context maintained by 'chat' if we were keeping the object alive,
      // but here we are re-instantiating. For stateless, we just send history manually or use generateContent with history.
      // Optimally, we just send the last user message with context if not maintaining a stateful object.
      // To keep it robust for this demo:
    }

    const response = await chat.sendMessage({ message: newMessage });
    return response.text;

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "¡Hola! Estoy teniendo un pequeño problema de conexión, pero no te preocupes. ¡Llena el formulario para asegurar tu descuento!";
  }
};