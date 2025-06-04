

import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({ apiKey: "AIzaSyBoL09RoWmo06hw2RVEMf70kN8tWdPUl18" });

let historyarr = [];

async function main() {
  while (true) {
    const userinput = readlineSync.question('ask your qn here (or type "exit" to quit): ');

    if (userinput.trim().toLowerCase() === "exit") {
      console.log("Exiting...");
      break;
    }

    historyarr.push({
      role: "user",
      parts: [{ text: userinput }]
    });

    const chat = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: historyarr
    });

    console.log(chat.text);

    historyarr.push({
      role: "model",
      parts: [{ text: chat.text }]
    });
  }
}

main();
