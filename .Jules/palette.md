## 2026-04-19 - AI Chat UX Patterns
**Learning:** For AI chat interfaces, immediate visual feedback (like a "thinking" state) and auto-scrolling are essential for maintaining user flow and preventing frustration during async operations. Keyboard submission via `<form>` is a high-impact, low-effort accessibility and power-user win.
**Action:** Always wrap chat inputs in a form and implement auto-scroll using `useRef` for a "native" chat feel.
