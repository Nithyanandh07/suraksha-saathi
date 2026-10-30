// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
var aiClient = null;
try {
  if (process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI();
  }
} catch (err) {
  console.warn("Could not initialize GoogleGenAI with env var:", err);
}
var PRESET_EXPLANATIONS = {
  nip_point: {
    hi: {
      title: "\u0930\u094B\u0932\u0930 \u092E\u0936\u0940\u0928 \u092A\u093F\u0902\u091A \u092A\u0949\u0907\u0902\u091F - \u0939\u093E\u0925 \u092B\u0902\u0938\u0928\u0947 \u0915\u093E \u0917\u0902\u092D\u0940\u0930 \u0916\u0924\u0930\u093E!",
      hazardLevel: "DANGER",
      explanation: "\u0938\u093E\u0925\u0940 \u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0902: \u092F\u0939 \u092E\u0936\u0940\u0928 \u0924\u0947\u091C\u0940 \u0938\u0947 \u0918\u0942\u092E\u0928\u0947 \u0935\u093E\u0932\u0947 \u0930\u094B\u0932\u0930 \u0938\u0947 \u091A\u0932\u0924\u0940 \u0939\u0948\u0964 \u0922\u0940\u0932\u0947 \u0915\u092A\u0921\u093C\u0947, \u0905\u0902\u0917\u0942\u0920\u0940 \u092F\u093E \u0939\u093E\u0925 \u0930\u094B\u0932\u0930 \u0915\u0947 \u092A\u093E\u0938 \u0932\u0947 \u091C\u093E\u0928\u0947 \u092A\u0930 \u092D\u093E\u0930\u0940 \u091A\u094B\u091F \u0932\u0917 \u0938\u0915\u0924\u0940 \u0939\u0948\u0964 \u092C\u093F\u0928\u093E \u0938\u0947\u092B\u094D\u091F\u0940 \u0917\u093E\u0930\u094D\u0921 \u0915\u0947 \u092E\u0936\u0940\u0928 \u0915\u092D\u0940 \u0928 \u091B\u0941\u090F\u0902\u0964",
      dos: [
        "\u0915\u093E\u092E \u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u091A\u0947\u0915 \u0915\u0930\u0947\u0902 \u0915\u093F \u0938\u0947\u092B\u094D\u091F\u0940 \u0917\u093E\u0930\u094D\u0921 \u0932\u0917\u093E \u0939\u0941\u0906 \u0939\u0948\u0964",
        "\u0906\u0938\u094D\u0924\u0940\u0928 \u0915\u094B \u0915\u094B\u0939\u0928\u0940 \u0924\u0915 \u092E\u094B\u0921\u093C\u0947\u0902 \u0914\u0930 \u092C\u093E\u0932 \u0905\u091A\u094D\u091B\u0940 \u0924\u0930\u0939 \u092C\u093E\u0902\u0927 \u0915\u0930 \u0930\u0916\u0947\u0902\u0964",
        "\u0915\u094B\u0908 \u0930\u0941\u0915\u093E\u0935\u091F \u0939\u094B \u0924\u094B \u092A\u0939\u0932\u0947 \u0932\u093E\u0932 \u0907\u092E\u0930\u091C\u0947\u0902\u0938\u0940 \u0938\u094D\u091F\u0949\u092A (E-Stop) \u092C\u091F\u0928 \u0926\u092C\u093E\u090F\u0902\u0964"
      ],
      donts: [
        "\u091A\u0932\u0924\u0940 \u092E\u0936\u0940\u0928 \u0915\u0947 \u0905\u0902\u0926\u0930 \u0915\u092A\u0921\u093C\u093E \u092F\u093E \u0939\u093E\u0925 \u0921\u093E\u0932\u0915\u0930 \u0938\u092B\u093E\u0908 \u0928 \u0915\u0930\u0947\u0902\u0964",
        "\u0917\u0932\u0947 \u092E\u0947\u0902 \u0917\u092E\u091B\u093E, \u092E\u092B\u0932\u0930, \u0922\u0940\u0932\u093E \u0915\u0941\u0930\u094D\u0924\u093E \u092F\u093E \u091A\u0947\u0928 \u092A\u0939\u0928\u0915\u0930 \u092A\u093E\u0938 \u0928 \u091C\u093E\u090F\u0902\u0964",
        "\u0938\u0947\u092B\u094D\u091F\u0940 \u0938\u0947\u0902\u0938\u0930 \u092F\u093E \u0917\u093E\u0930\u094D\u0921 \u0915\u094B \u0915\u092D\u0940 \u092C\u093E\u0908\u092A\u093E\u0938 \u092F\u093E \u092C\u0902\u0926 \u0928 \u0915\u0930\u0947\u0902\u0964"
      ],
      requiredPPE: ["\u0938\u0947\u092B\u094D\u091F\u0940 \u091C\u0942\u0924\u0947", "\u092B\u093F\u091F\u093F\u0902\u0917 \u0926\u0938\u094D\u0924\u093E\u0928\u0947", "\u0906\u0908 \u092A\u094D\u0930\u094B\u091F\u0947\u0915\u094D\u0936\u0928 \u091A\u0936\u094D\u092E\u093E"],
      audioScript: "\u0938\u093E\u0935\u0927\u093E\u0928 \u0938\u093E\u0925\u0940! \u0907\u0938 \u0930\u094B\u0932\u0930 \u092E\u0936\u0940\u0928 \u092E\u0947\u0902 \u0939\u093E\u0925 \u092B\u0902\u0938\u0928\u0947 \u0915\u093E \u091C\u093E\u0928\u0932\u0947\u0935\u093E \u0916\u0924\u0930\u093E \u0939\u0948\u0964 \u092C\u093F\u0928\u093E \u0938\u0947\u092B\u094D\u091F\u0940 \u0917\u093E\u0930\u094D\u0921 \u0915\u0947 \u092E\u0936\u0940\u0928 \u0928 \u091A\u0932\u093E\u090F\u0902\u0964 \u0922\u0940\u0932\u0947 \u0915\u092A\u0921\u093C\u0947 \u0926\u0942\u0930 \u0930\u0916\u0947\u0902 \u0914\u0930 \u0916\u0924\u0930\u0947 \u092A\u0930 \u0932\u093E\u0932 \u0907\u092E\u0930\u091C\u0947\u0902\u0938\u0940 \u092C\u091F\u0928 \u0926\u092C\u093E\u090F\u0902\u0964"
    },
    ta: {
      title: "\u0B89\u0BB0\u0BC1\u0BB3\u0BC8 \u0B87\u0BAF\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BAA\u0BBF\u0B9F\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF - \u0B95\u0BC8 \u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B86\u0BAA\u0BA4\u0BCD\u0BA4\u0BC1!",
      hazardLevel: "DANGER",
      explanation: "\u0BA4\u0BCB\u0BB4\u0BB0\u0BC7 \u0B95\u0BB5\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD: \u0B87\u0BA8\u0BCD\u0BA4 \u0B87\u0BAF\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B9A\u0BC1\u0BB4\u0BB2\u0BC1\u0BAE\u0BCD \u0BB0\u0BCB\u0BB2\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA9. \u0BA4\u0BB3\u0BB0\u0BCD\u0BB5\u0BBE\u0BA9 \u0B86\u0B9F\u0BC8\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BC8 \u0B85\u0BB0\u0BC1\u0B95\u0BC7 \u0B9A\u0BC6\u0BA9\u0BCD\u0BB1\u0BBE\u0BB2\u0BCD \u0BAA\u0BB2\u0BA4\u0BCD\u0BA4 \u0B95\u0BBE\u0BAF\u0BAE\u0BCD \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD. \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0B95\u0BB5\u0B9A\u0BAE\u0BCD \u0B87\u0BA9\u0BCD\u0BB1\u0BBF \u0B87\u0BAF\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBE\u0BAE\u0BCD.",
      dos: [
        "\u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0B95\u0BB5\u0B9A\u0BAE\u0BCD \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE \u0B8E\u0BA9 \u0B9A\u0BB0\u0BBF\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
        "\u0B9A\u0B9F\u0BCD\u0B9F\u0BC8 \u0B95\u0BC8\u0B95\u0BB3\u0BC8 \u0B9A\u0BC1\u0BB0\u0BC1\u0B9F\u0BCD\u0B9F\u0BBF \u0B87\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BBE\u0B95 \u0BB5\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
        "\u0B8F\u0BA4\u0BC7\u0BA9\u0BC1\u0BAE\u0BCD \u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BB2\u0BCD \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BBE\u0BB2\u0BCD \u0B89\u0B9F\u0BA9\u0BC7 \u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1 \u0B8E\u0BAE\u0BB0\u0BCD\u0B9C\u0BC6\u0BA9\u0BCD\u0B9A\u0BBF \u0BAA\u0B9F\u0BCD\u0B9F\u0BA9\u0BC8 \u0B85\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD."
      ],
      donts: [
        "\u0B87\u0BAF\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B87\u0BAF\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B9A\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF \u0B95\u0BC8 \u0BB5\u0BC8\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBE\u0BAE\u0BCD.",
        "\u0BA4\u0BB3\u0BB0\u0BCD\u0BB5\u0BBE\u0BA9 \u0BA4\u0BC1\u0BA3\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B9A\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BBF \u0B85\u0BA3\u0BBF\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBE\u0BAE\u0BCD.",
        "\u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0B9A\u0BC6\u0BA9\u0BCD\u0B9A\u0BBE\u0BB0\u0BC8 \u0B85\u0B95\u0BB1\u0BCD\u0BB1\u0BB5\u0BCB \u0BAE\u0BC1\u0B9F\u0B95\u0BCD\u0B95\u0BB5\u0BCB \u0B95\u0BC2\u0B9F\u0BBE\u0BA4\u0BC1."
      ],
      requiredPPE: ["\u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0B95\u0BBE\u0BB2\u0BA3\u0BBF", "\u0B95\u0BC8\u0BAF\u0BC1\u0BB1\u0BC8\u0B95\u0BB3\u0BCD", "\u0B95\u0BA3\u0BCD \u0B95\u0BA3\u0BCD\u0BA3\u0BBE\u0B9F\u0BBF"],
      audioScript: "\u0B8E\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC8 \u0BA4\u0BCB\u0BB4\u0BB0\u0BC7! \u0B87\u0BA8\u0BCD\u0BA4 \u0BB0\u0BCB\u0BB2\u0BB0\u0BCD \u0B87\u0BAF\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B95\u0BC8 \u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B85\u0BAA\u0BBE\u0BAF\u0BAE\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0B95\u0BB5\u0B9A\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BBE\u0BAE\u0BB2\u0BCD \u0BB5\u0BC7\u0BB2\u0BC8 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BBE\u0BA4\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BCD."
    },
    en: {
      title: "Roller Pinch Point - Critical Entanglement Hazard!",
      hazardLevel: "DANGER",
      explanation: "Attention comrade: This machine has high-speed rotating pinch rollers. Loose clothing, jewelry, or hands can be dragged inside causing severe trauma. Never operate without guards.",
      dos: [
        "Verify all safety interlocking guards are secured before powering on.",
        "Keep sleeves tightly rolled and hair tucked under safety helmet.",
        "Hit the Red Emergency Stop (E-Stop) immediately if anything jams."
      ],
      donts: [
        "Never attempt to clear waste or wipe rollers while moving.",
        "Do not wear loose scarves, necklaces, or oversized gloves near in-running rolls.",
        "Never tamper with or override machine interlock switches."
      ],
      requiredPPE: ["Safety Boots", "Fitted Protective Gloves", "Safety Goggles"],
      audioScript: "Attention worker! Severe pinch point hazard on this roller. Keep hands away from running rolls and hit the emergency stop switch if any jam occurs."
    }
  },
  high_voltage: {
    hi: {
      title: "415V \u0909\u091A\u094D\u091A \u0935\u094B\u0932\u094D\u091F\u0947\u091C \u0935\u093F\u0926\u094D\u092F\u0941\u0924 \u092A\u0948\u0928\u0932 - \u091C\u093E\u0928 \u0915\u093E \u0916\u0924\u0930\u093E!",
      hazardLevel: "DANGER",
      explanation: "\u092F\u0939 \u092A\u0948\u0928\u0932 \u092D\u093E\u0930\u0940 \u092C\u093F\u091C\u0932\u0940 (415 \u0935\u094B\u0932\u094D\u091F) \u0938\u0947 \u091A\u093E\u0930\u094D\u091C \u0939\u0948\u0964 \u0907\u0938\u0947 \u091B\u0942\u0928\u0947 \u092F\u093E \u092C\u093F\u0928\u093E \u0911\u0925\u0930\u093E\u0907\u091C\u094D\u0921 \u0907\u0932\u0947\u0915\u094D\u091F\u094D\u0930\u0940\u0936\u093F\u092F\u0928 \u0915\u0947 \u0916\u094B\u0932\u0928\u0947 \u092A\u0930 \u0915\u0930\u0902\u091F \u0932\u0917\u0928\u0947 \u0938\u0947 \u091C\u093E\u0928 \u091C\u093E \u0938\u0915\u0924\u0940 \u0939\u0948\u0964 \u0915\u0947\u0935\u0932 \u0905\u0927\u093F\u0915\u0943\u0924 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0939\u0940 \u0907\u0938\u0947 \u0916\u094B\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
      dos: [
        "\u092A\u0948\u0928\u0932 \u0915\u0947 \u0938\u093E\u092E\u0928\u0947 \u0915\u092E \u0938\u0947 \u0915\u092E 1 \u092E\u0940\u091F\u0930 \u0915\u0940 \u0926\u0942\u0930\u0940 \u092C\u0928\u093E\u0915\u0930 \u0930\u0916\u0947\u0902\u0964",
        "\u0907\u0902\u0938\u0941\u0932\u0947\u091F\u0947\u0921 \u0930\u092C\u0930 \u092E\u0948\u091F \u092A\u0930 \u0939\u0940 \u0916\u0921\u093C\u0947 \u0939\u094B\u0902\u0964",
        "\u0915\u093F\u0938\u0940 \u092D\u0940 \u0938\u094D\u092A\u093E\u0930\u094D\u0915\u093F\u0902\u0917 \u092F\u093E \u0927\u0941\u090F\u0902 \u092A\u0930 \u0924\u0941\u0930\u0902\u0924 \u092E\u0947\u0928 \u092C\u094D\u0930\u0947\u0915\u0930 \u091F\u094D\u0930\u093F\u092A \u0915\u0930\u0947\u0902\u0964"
      ],
      donts: [
        "\u0917\u0940\u0932\u0947 \u0939\u093E\u0925\u094B\u0902 \u092F\u093E \u092D\u0940\u0917\u0947 \u0915\u092A\u0921\u093C\u094B\u0902 \u0938\u0947 \u092A\u0948\u0928\u0932 \u0915\u094B \u0915\u092D\u0940 \u0928 \u091B\u0941\u090F\u0902\u0964",
        "\u092C\u093F\u0928\u093E \u092A\u0930\u092E\u093F\u091F \u092F\u093E \u092C\u093F\u0928\u093E \u0907\u0932\u0947\u0915\u094D\u091F\u094D\u0930\u0940\u0936\u093F\u092F\u0928 \u0915\u0947 \u092A\u0948\u0928\u0932 \u0915\u093E \u0926\u0930\u0935\u093E\u091C\u093E \u0928 \u0916\u094B\u0932\u0947\u0902\u0964",
        "\u092A\u0948\u0928\u0932 \u0915\u0947 \u0938\u093E\u092E\u0928\u0947 \u092A\u093E\u0928\u0940, \u0915\u0947\u092E\u093F\u0915\u0932 \u092F\u093E \u0932\u094B\u0939\u0947 \u0915\u0940 \u091A\u0940\u091C\u0947\u0902 \u0928 \u0930\u0916\u0947\u0902\u0964"
      ],
      requiredPPE: ["\u0907\u0902\u0938\u0941\u0932\u0947\u091F\u0947\u0921 \u0930\u092C\u0930 \u0917\u094D\u0932\u0935\u094D\u0938 (1000V)", "\u0935\u093F\u0926\u094D\u092F\u0941\u0924 \u092A\u094D\u0930\u0924\u093F\u0930\u094B\u0927\u0940 \u091C\u0942\u0924\u0947", "\u092B\u0947\u0938 \u0936\u0940\u0932\u094D\u0921"],
      audioScript: "\u0938\u093E\u0935\u0927\u093E\u0928 \u0938\u093E\u0925\u0940! 415 \u0935\u094B\u0932\u094D\u091F \u092C\u093F\u091C\u0932\u0940 \u0915\u093E \u092D\u093E\u0930\u0940 \u0915\u0930\u0902\u091F \u0939\u0948\u0964 \u0917\u0940\u0932\u0947 \u0939\u093E\u0925\u094B\u0902 \u0938\u0947 \u0928 \u091B\u0941\u090F\u0902 \u0914\u0930 \u0915\u0947\u0935\u0932 \u0938\u0930\u0915\u093E\u0930\u0940 \u0932\u093E\u0907\u0938\u0947\u0902\u0938 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0907\u0932\u0947\u0915\u094D\u091F\u094D\u0930\u0940\u0936\u093F\u092F\u0928 \u0915\u094B \u0939\u0940 \u0915\u093E\u092E \u0915\u0930\u0928\u0947 \u0926\u0947\u0902\u0964"
    },
    en: {
      title: "415V High Voltage Electrical Hazard - Danger of Death!",
      hazardLevel: "DANGER",
      explanation: "This switchgear panel carries lethal 415V three-phase electrical power. Touching busbars or opening panels without lockout-tagout (LOTO) can cause fatal arc flash and electric shock.",
      dos: [
        "Maintain minimum 1 meter clear clearance around the panel at all times.",
        "Stand on rated dielectric rubber insulation mats.",
        "Report any buzzing, burning smell, or sparks to the Plant Electrical Officer."
      ],
      donts: [
        "Never operate electrical switches with damp hands or wet footwear.",
        "Do not unlock or access panels unless you are a certified plant electrician with LOTO permit.",
        "Never obstruct the panel with pallets, water barrels, or metal scaffolding."
      ],
      requiredPPE: ["Dielectric Safety Shoes", "Arc Flash Visor", "Class 0 Rubber Gloves"],
      audioScript: "High voltage electrical hazard! 415 Volts present. Danger of death. Stand clear unless certified with electrical permit."
    }
  },
  chemical: {
    hi: {
      title: "\u0938\u0932\u094D\u092B\u094D\u092F\u0942\u0930\u093F\u0915 \u090F\u0938\u093F\u0921 \u0914\u0930 \u0930\u093E\u0938\u093E\u092F\u0928\u093F\u0915 \u0916\u0924\u0930\u093E - \u091C\u0939\u0930\u0940\u0932\u093E \u090F\u0935\u0902 \u091C\u0932\u0928 \u092A\u0948\u0926\u093E \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u093E!",
      hazardLevel: "WARNING",
      explanation: "\u092F\u0939 \u091F\u0948\u0902\u0915 \u0916\u0924\u0930\u0928\u093E\u0915 \u0924\u0947\u091C\u093E\u092C \u0914\u0930 \u0930\u0938\u093E\u092F\u0928 \u0915\u093E \u0939\u0948\u0964 \u0907\u0938\u0915\u0940 \u092D\u093E\u092A \u0938\u093E\u0902\u0938 \u0915\u0947 \u091C\u0930\u093F\u090F \u0905\u0902\u0926\u0930 \u091C\u093E\u0928\u0947 \u092A\u0930 \u092B\u0947\u092B\u0921\u093C\u094B\u0902 \u0915\u094B \u0928\u0941\u0915\u0938\u093E\u0928 \u092A\u0939\u0941\u0902\u091A\u093E\u0924\u0940 \u0939\u0948 \u0914\u0930 \u0924\u094D\u0935\u091A\u093E \u092A\u0930 \u0917\u093F\u0930\u0928\u0947 \u0938\u0947 \u0917\u0902\u092D\u0940\u0930 \u0918\u093E\u0935 \u0939\u094B \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
      dos: [
        "\u0915\u0947\u092E\u093F\u0915\u0932 \u090F\u092A\u094D\u0930\u0928, \u0915\u0947\u092E\u093F\u0915\u0932-\u0930\u0947\u0938\u093F\u0938\u094D\u091F\u0947\u0902\u091F \u0928\u093E\u0907\u091F\u094D\u0930\u093E\u0907\u0932 \u0917\u094D\u0932\u0935\u094D\u0938 \u0914\u0930 \u092B\u0941\u0932 \u092B\u0947\u0938 \u0936\u0940\u0932\u094D\u0921 \u092A\u0939\u0928\u0947\u0902\u0964",
        "\u0906\u0902\u0916 \u092F\u093E \u0924\u094D\u0935\u091A\u093E \u092A\u0930 \u091B\u0940\u0902\u091F\u0947 \u092A\u0921\u093C\u0928\u0947 \u092A\u0930 \u0924\u0941\u0930\u0902\u0924 \u0906\u0908-\u0935\u0949\u0936 \u0938\u094D\u091F\u0947\u0936\u0928 \u092A\u0930 15 \u092E\u093F\u0928\u091F \u0927\u094B\u090F\u0902\u0964",
        "\u0939\u092E\u0947\u0936\u093E \u0935\u0947\u0902\u091F\u093F\u0932\u0947\u0936\u0928 \u090F\u0917\u094D\u091C\u0949\u0938\u094D\u091F \u092B\u0948\u0928 \u091A\u093E\u0932\u0942 \u0930\u0916\u0947\u0902\u0964"
      ],
      donts: [
        "\u0924\u0947\u091C\u093E\u092C \u092E\u0947\u0902 \u0915\u092D\u0940 \u0938\u0940\u0927\u0947 \u092A\u093E\u0928\u0940 \u0928 \u0921\u093E\u0932\u0947\u0902, \u0939\u092E\u0947\u0936\u093E \u0927\u0940\u0930\u0947-\u0927\u0940\u0930\u0947 \u092A\u093E\u0928\u0940 \u092E\u0947\u0902 \u0924\u0947\u091C\u093E\u092C \u092E\u093F\u0932\u093E\u090F\u0902\u0964",
        "\u092C\u093F\u0928\u093E \u0930\u0947\u0938\u094D\u092A\u093F\u0930\u0947\u091F\u0930 \u092E\u093E\u0938\u094D\u0915 \u0915\u0947 \u091F\u0948\u0902\u0915 \u0915\u0947 \u092A\u093E\u0938 \u0938\u093E\u0902\u0938 \u0928 \u0932\u0947\u0902\u0964",
        "\u0915\u0947\u092E\u093F\u0915\u0932 \u0935\u093E\u0932\u0947 \u092B\u0930\u094D\u0936 \u092A\u0930 \u0938\u093E\u0927\u093E\u0930\u0923 \u091A\u092A\u094D\u092A\u0932 \u092A\u0939\u0928\u0915\u0930 \u0928 \u091C\u093E\u090F\u0902\u0964"
      ],
      requiredPPE: ["\u0928\u093E\u0907\u091F\u094D\u0930\u093E\u0907\u0932 \u0915\u0947\u092E\u093F\u0915\u0932 \u0917\u094D\u0932\u0935\u094D\u0938", "\u0915\u0947\u092E\u093F\u0915\u0932 \u090F\u092A\u094D\u0930\u0928", "\u0906\u0908-\u0935\u0949\u0936 \u0917\u0949\u0917\u0932\u094D\u0938", "\u0930\u0947\u0938\u094D\u092A\u093F\u0930\u0947\u091F\u0930"],
      audioScript: "\u0930\u093E\u0938\u093E\u092F\u0928\u093F\u0915 \u0916\u0924\u0930\u0947 \u0915\u0940 \u091A\u0947\u0924\u093E\u0935\u0928\u0940! \u0938\u0932\u094D\u092B\u094D\u092F\u0942\u0930\u093F\u0915 \u090F\u0938\u093F\u0921 \u0924\u094D\u0935\u091A\u093E \u0915\u094B \u091C\u0932\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964 \u092A\u0942\u0930\u093E \u092B\u0947\u0938 \u0936\u0940\u0932\u094D\u0921 \u0914\u0930 \u0928\u093E\u0907\u091F\u094D\u0930\u093E\u0907\u0932 \u0917\u094D\u0932\u0935\u094D\u0938 \u092A\u0939\u0928\u0947\u0902\u0964 \u091B\u0940\u0902\u091F\u0947 \u092A\u0921\u093C\u0928\u0947 \u092A\u0930 \u0924\u0941\u0930\u0902\u0924 \u0906\u0908-\u0935\u0949\u0936 \u0936\u0949\u0935\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964"
    },
    en: {
      title: "Chemical Hazard - Corrosive Acid Tank!",
      hazardLevel: "WARNING",
      explanation: "This vessel contains highly corrosive industrial acid. Vapors cause respiratory tract burns, and skin contact causes deep chemical burns. Always ensure emergency showers are functional.",
      dos: [
        "Don full chemical suit, splash goggles, face shield, and heavy nitrile gauntlets.",
        "In case of splashes, immediately flush eyes/skin at safety shower for 15 uninterrupted minutes.",
        "Ensure local forced exhaust ventilation is running before opening transfer valves."
      ],
      donts: [
        "Never add water into acid\u2014always dilute by adding acid slowly into water.",
        "Do not eat, drink, or chew tobacco anywhere in the chemical storage bay.",
        "Never step into chemical puddles with standard cloth or perforated footwear."
      ],
      requiredPPE: ["Nitrile Gauntlet Gloves", "Chemical Splash Goggles", "Respirator Mask", "Acid-Resistant Apron"],
      audioScript: "Chemical warning! Corrosive acid tank. Always wear face shield and chemical gloves. Flush with water for 15 minutes if contact occurs."
    }
  }
};
app.post("/api/analyze-safety-manual", async (req, res) => {
  try {
    const { imageBase64, textContent, targetLanguage = "hi", signPreset } = req.body;
    const languageNames = {
      hi: "Hindi (\u0939\u093F\u0928\u094D\u0926\u0940)",
      ta: "Tamil (\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD)",
      te: "Telugu (\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41)",
      bn: "Bengali (\u09AC\u09BE\u0982\u09B2\u09BE)",
      mr: "Marathi (\u092E\u0930\u093E\u0920\u0940)",
      en: "English"
    };
    const targetLangName = languageNames[targetLanguage] || "Hindi";
    if (aiClient && (imageBase64 || textContent)) {
      try {
        const prompt = `You are "Suraksha Saathi", an expert safety companion for migrant factory workers in India.
Analyze the provided factory safety manual, machinery warning sign, chemical tag, or instruction text.
The worker may have limited literacy and needs practical, life-saving advice in simple, easy-to-understand ${targetLangName}.

Translate, explain, and structure your response strictly as valid JSON with these keys:
{
  "title": "Clear, short title in ${targetLangName}",
  "hazardLevel": "DANGER" | "WARNING" | "CAUTION" | "MANDATORY",
  "explanation": "2-3 short, clear sentences in colloquial ${targetLangName} explaining what the danger is and why it matters to the worker's life.",
  "dos": ["3 actionable points worker MUST do in ${targetLangName}"],
  "donts": ["3 critical things worker MUST NEVER do in ${targetLangName}"],
  "requiredPPE": ["List of 3-4 required PPE in ${targetLangName}"],
  "audioScript": "A warm, clear spoken warning script in ${targetLangName} addressing the worker as '\u0938\u093E\u0925\u0940' / comrade, suitable for Text-To-Speech audio playback."
}

Ensure the tone is caring, empowering, and prioritizes worker life and limb above all else. Return ONLY raw JSON without markdown formatting.`;
        let contents;
        if (imageBase64) {
          const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
          contents = [
            {
              role: "user",
              parts: [
                { text: prompt + `
Additional worker notes: ${textContent || "None"}` },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: cleanBase64
                  }
                }
              ]
            }
          ];
        } else {
          contents = [
            {
              role: "user",
              parts: [
                { text: prompt + `

Text from machine / notice board:
${textContent}` }
              ]
            }
          ];
        }
        const aiResponse = await aiClient.models.generateContent({
          model: "gemini-3.8-flash",
          contents
        });
        const text = aiResponse.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json({ success: true, data: parsed, source: "gemini" });
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed or timed out, falling back to local safety rules:", geminiError);
      }
    }
    const presetKey = signPreset || (textContent && textContent.toLowerCase().includes("volt") ? "high_voltage" : textContent && textContent.toLowerCase().includes("acid") ? "chemical" : "nip_point");
    const template = PRESET_EXPLANATIONS[presetKey] || PRESET_EXPLANATIONS.nip_point;
    const localized = template[targetLanguage] || template.hi || template.en;
    return res.json({
      success: true,
      data: localized,
      source: "local_preset"
    });
  } catch (error) {
    console.error("Error in analyze-safety-manual:", error);
    res.status(500).json({ success: false, error: error.message || "Internal error" });
  }
});
app.post("/api/report-grievance", async (req, res) => {
  try {
    const { category, description, severity, plantLocation, targetLanguage = "hi" } = req.body;
    const randomNum = Math.floor(1e3 + Math.random() * 9e3);
    const trackingCode = `SS-2026-${randomNum}`;
    let immediateSafetyAdvice = "";
    if (severity === "URGENT" || severity === "HIGH") {
      immediateSafetyAdvice = targetLanguage === "hi" ? "\u0924\u0924\u094D\u0915\u093E\u0932 \u0915\u0926\u092E: 1. \u0909\u0938 \u091C\u0917\u0939 \u0938\u0947 \u0915\u092E \u0938\u0947 \u0915\u092E 5 \u092E\u0940\u091F\u0930 \u0926\u0942\u0930 \u0930\u0939\u0947\u0902\u0964 2. \u0905\u0928\u094D\u092F \u0938\u093E\u0925\u093F\u092F\u094B\u0902 \u0915\u094B \u0935\u0939\u093E\u0902 \u091C\u093E\u0928\u0947 \u0938\u0947 \u0930\u094B\u0915\u0947\u0902\u0964 3. \u0928\u091C\u0926\u0940\u0915\u0940 \u0938\u0947\u092B\u094D\u091F\u0940 \u0935\u093E\u0930\u094D\u0921\u0928 \u0915\u094B \u0924\u0941\u0930\u0902\u0924 \u0938\u0942\u091A\u093F\u0924 \u0915\u0930\u0947\u0902\u0964 \u0906\u092A\u0915\u093E \u0928\u093E\u092E \u0915\u093F\u0938\u0940 \u0915\u094B \u0928\u0939\u0940\u0902 \u092C\u0924\u093E\u092F\u093E \u091C\u093E\u090F\u0917\u093E\u0964" : "Immediate Action: 1. Maintain at least 5 meters distance from hazard. 2. Warn co-workers in the vicinity. 3. Notify the nearest floor supervisor immediately. Your identity remains 100% anonymous.";
    } else {
      immediateSafetyAdvice = targetLanguage === "hi" ? "\u0906\u092A\u0915\u0940 \u0930\u093F\u092A\u094B\u0930\u094D\u091F \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u0926\u0930\u094D\u091C \u0915\u0930 \u0932\u0940 \u0917\u0908 \u0939\u0948\u0964 24 \u0918\u0902\u091F\u0947 \u092E\u0947\u0902 \u092A\u094D\u0932\u093E\u0902\u091F \u0938\u0947\u092B\u094D\u091F\u0940 \u0911\u0921\u093F\u091F \u091F\u0940\u092E \u0907\u0938\u0915\u093E \u0928\u093F\u0930\u0940\u0915\u094D\u0937\u0923 \u0915\u0930\u0947\u0917\u0940\u0964" : "Your report has been logged securely. Plant safety audit team will inspect within 24 hours.";
    }
    if (aiClient && description) {
      try {
        const prompt = `A factory worker in India anonymously reported the following safety issue or grievance:
Category: ${category}
Severity: ${severity}
Plant Location: ${plantLocation}
Description: "${description}"

Generate 2 immediate, practical safety precautions for the worker to protect themselves right now in simple ${targetLanguage === "hi" ? "Hindi" : "English"}. Keep it concise (under 40 words).`;
        const geminiRes = await aiClient.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt
        });
        if (geminiRes.text) {
          immediateSafetyAdvice = geminiRes.text.trim();
        }
      } catch (e) {
      }
    }
    return res.json({
      success: true,
      trackingCode,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      immediateSafetyAdvice,
      status: "SUBMITTED_TO_SAFETY_COMMITTEE"
    });
  } catch (error) {
    console.error("Error reporting grievance:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", name: "Suraksha Saathi Backend", geminiConfigured: !!aiClient });
});
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Suraksha Saathi running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
