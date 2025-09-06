// src/utils/uuid.js
export default function uuid() {
  // 1) Use global crypto.randomUUID if available (modern browsers / Node v18+)
  if (typeof globalThis !== "undefined" && globalThis.crypto && globalThis.crypto.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  // 2) Use crypto.getRandomValues if available (browser)
  if (typeof globalThis !== "undefined" && globalThis.crypto && globalThis.crypto.getRandomValues) {
    const buf = new Uint8Array(16);
    globalThis.crypto.getRandomValues(buf);

    // Per RFC 4122 v4
    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;

    const hex = Array.from(buf).map(b => b.toString(16).padStart(2, "0")).join("");
    return `${hex.substr(0,8)}-${hex.substr(8,4)}-${hex.substr(12,4)}-${hex.substr(16,4)}-${hex.substr(20,12)}`;
  }

  // 3) Last-resort fallback using Math.random
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
