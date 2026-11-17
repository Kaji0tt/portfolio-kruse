// Firefox (WebRender) rendert backdrop-filter / filter: blur innerhalb ständig transformierter
// Elemente pro Frame neu – dort nutzen wir günstigere, optisch ähnliche Fallbacks.
export const isFirefox = typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);
