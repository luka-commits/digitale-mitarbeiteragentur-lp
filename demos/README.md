# DMA Demo-UIs — Aufnahme-Vorlagen

Standalone-HTML-Demos im DMA-Branding, gebaut **nur für Loom-/Video-Aufnahmen**. Nicht produktiv gehostet, nicht spielbar für Leads. Nach Aufnahme landet das Video als Iframe-Embed in der jeweiligen Leistungsseite (`lp/leistungen/<slug>/index.html` `#demo`).

## Aufbau

```
demos/
  _shared/
    demo.css   ← Tokens-Snapshot + Components (State-Container, Reasoning, KPI, …)
    demo.js    ← State-Machine, Autoplay, Manual-Mode, Helper-Bibliothek
  paula/index.html    ← Phase 1 · Service / Tickets
  martin/index.html   ← Phase 2 · Buchhaltung / Belege  (todo)
  jonas/index.html    ← Phase 3 · Vertrieb / Anfragen  (todo)
```

Jede `<persona>/index.html` ist self-contained: Story, Mock-Daten, State-Layout. Per-State-Lifecycle-Hooks (Animation, Typewriter, Counter) laufen über `window.DemoConfig.onState[i]`.

## Aufnehmen

1. Demo lokal öffnen: `open demos/paula/index.html`
2. Browser-Window auf 1280×800 (Loom-Standard) setzen.
3. Loom starten, Aufnahme `Tab`.
4. Erstes Drittel der Aufnahme: Demo läuft autoplay durch (~74 Sek total für Paula).
5. Voiceover live oder im Schnitt drauflegen.

**Re-Take eines einzelnen States:** Manual-Mode aufrufen → `?manual=1` an URL anhängen. Stepper unten in der Mitte, oder Pfeiltasten ←/→ , Zifferntasten `1–5`, Spacebar = Pause, `R` = Neustart.

**Voll-Bild für Aufnahme:** Browser `Cmd+Shift+F` oder `View → Enter Full Screen`. Cockpit füllt den Frame.

## State-Skelett (alle Personas gleich)

| State | Hook | Animation |
|-------|------|-----------|
| 1 · Inbox | — | Ticket fade-in + Border-Pulse |
| 2 · Working | `animateReasoningSteps`, `revealToolCalls` | Steps pulsieren aktiv → done; Tool-Calls fade-in |
| 3 · Output | `typewrite`, Confidence-Bar | Text wird Wort-für-Wort getippt |
| 4 · Approval | — | Burst-Ring, Receipt-Card |
| 5 · Impact | `countUp` | KPIs zählen hoch, Vorher/Nachher-Vergleich |

## Mock-Daten anpassen

Werte sind direkt im HTML hartcodiert:
- **Story-Texte:** `<section data-state="...">` Inhalte
- **Reasoning-Steps:** `[data-reasoning]` Liste
- **Tool-Calls:** `[data-tool-calls]` Liste
- **Antwort-Text:** `DemoConfig.onState[2]` Multi-Line-String
- **KPIs:** `data-kpi="…"` Attribute auf `.kpi-num` Tiles
- **Durations:** `DemoConfig.durations` (in ms)

## Phase 4 — Loom in Leistungsseite einbauen

Nach Aufnahme den auskommentierten Iframe in der zugehörigen Leistungsseite einkommentieren und Loom-ID einsetzen:

```html
<!-- lp/leistungen/ki-kundenservice/index.html ~Zeile 307 -->
<iframe src="https://www.loom.com/embed/<LOOM_ID_PAULA>" allowfullscreen></iframe>
```

Den `<div class="demo-loom-placeholder">…</div>` Block darunter entfernen.

## Token-Snapshot

`_shared/demo.css` ist ein **Snapshot** der Tokens aus `lp/colors_and_type.css` (2026-04-27). Wenn das LP-Branding sich ändert, muss der Snapshot manuell aktualisiert werden — gewollt, damit alte Aufnahmen reproduzierbar bleiben.
