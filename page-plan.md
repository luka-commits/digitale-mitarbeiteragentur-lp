# Digitale Mitarbeiteragentur — Landing Page Plan

**LP · DE-default + EN-Toggle · Arbeitsname "Digitale Mitarbeiteragentur"**

Source of truth for structure: `index.html`. Dieses Dokument hält Positioning und Section-Zweck fest — nicht die Copy selbst (die lebt im HTML).

---

## Positioning

"Wir ersetzen eure offenen Mitarbeiter-Rollen durch digitale Mitarbeiter."

Funktionsbezogen statt AI-Buzzword. Fünf Rollen, in der Sprache, in der Mittelstands-Unternehmer denken:

- **Ops-Mitarbeiter** — Koordination, Terminplanung, Reporting
- **Marketing-Mitarbeiter** — Content, Ads, Reporting
- **Backend-Mitarbeiter** — Daten, Integrations, interne Tools
- **Support-Mitarbeiter** — Inbound, Tickets, FAQ
- **Sales-Mitarbeiter** — Outbound, Discovery, CRM

**Framing-Regel (kritisch):** Nie "AI Agent", "KI-System", "Automation". Immer "digitaler Mitarbeiter" — trainiert auf eure Prozesse, integriert in eure Tools, DSGVO-konform.

**Ton:** Direkt, konkret, greifbar. Keine Übersetzungs-Arbeit für den Leser.

**Zielgruppe:** Deutscher Mittelstand. Unternehmer mit offenen Stellen, die keine Bewerber finden — oder die Admin/Support/Ops-Last spüren, aber keine weiteren Köpfe einstellen wollen.

---

## Page Architecture

```
1.  Nav (sticky, Language-Toggle)
2.  Hero                        → Headline + Einstieg
3.  Problem                     → Stelle offen, keiner bewirbt sich
4.  Build (Rollen-Tabs)         → 5 Rollen, je Tab: Aufgaben + "Klassischer Ersatz"
5.  USP                         → Was jeder digitale Mitarbeiter mitbringt
6.  Demos                       → Rolle-geframt (Ops/HR/Sales/Marketing/Support)
7.  Assessment                  → Formular: "Welche Rolle zuerst?"
8.  Process (4 Phasen)          → Rolle finden → Job-Beschreibung → Onboarding → Einarbeitung
9.  Team                        → Felipe (Single-Founder-Card, DACH-Credibility)
10. FAQ                         → DACH-Fragen (Betriebsrat, DSGVO, Preis)
11. Final CTA                   → "30 Min. Welche Rolle zuerst?"
12. Footer                      → Wordmark, Standort DE, Impressum/Datenschutz/AGB
```

---

## Section-Intent

Ein-Satz-Zweck pro Section. Copy-Details → `index.html` (`data-i18n`-Keys).

| # | Section | Intent | Key-Präfix |
|---|---------|--------|------------|
| 1 | Nav | Navigation + Sprach-Toggle + CTA in Header | `nav.*` |
| 2 | Hero | Positioning in einem Satz, sofort greifbar | `hero.*` |
| 3 | Problem | Pain anerkennen: "Rolle offen, keiner kommt" | `problem.*` |
| 4 | Build | 5 Rollen als Tab-Interface (voice/auto/rag/int/prem) | `build.*` |
| 5 | USP | Vertrauenssignale pro Rolle (Integration, DSGVO, lernt weiter) | `usp.*` |
| 6 | Demos | Live-Proof pro Rolle, Filter (All/Ops/HR/Sales/Marketing/Support) | `demos.*` |
| 7 | Assessment | Lead-Capture über konkrete Rollen-Frage | `assess.*` |
| 8 | Process | "Wie läuft ein Engagement" in 4 Phasen | `process.*` |
| 9 | Team | Felipe + DACH-Positionierung | `team.*` |
| 10 | FAQ | Skepsis auffangen (Betriebsrat, DSGVO, Preis, Tools) | `faq.*` |
| 11 | Final CTA | Letzter Push, direkt mit Felipe | `final.*` |
| 12 | Footer | Navigation + Legal-Links (Impressum/Datenschutz/AGB) | `foot.*` |

---

## Copy-Prinzipien

1. **Rollen-Sprache** — immer "Mitarbeiter" statt "Agent" / "System" / "Tool"
2. **Konkret statt abstrakt** — "nimmt Anrufe ab 24/7" > "intelligente Kommunikation"
3. **Klassischer Ersatz** explizit benennen — "statt Werkstudent", "statt zweiter Assistenz" — der Leser versteht sofort, was er spart
4. **DSGVO + Deutschland** als Vertrauenssignal, nicht als Pflichtfußnote — in Hosting/FAQ/Footer sichtbar
5. **Keine Zahlen ohne Beleg** — Case-Study-Zahlen erst, wenn Pilot-Kunde geliefert hat
6. **Kein Marketing-Slang** — kein "revolutionieren", "smart", "next-gen"

---

## TODOs für Felipe (vor Go-Live)

Quelle-of-Truth: `~/Desktop/LifeOS/projects/felipe/felipe.md` unter "Open Decisions".

- Brand-Name + Domain (aktuell Arbeitsname "Digitale Mitarbeiteragentur")
- Logo (Platzhalter: Wordmark)
- Email auf eigener Domain (Platzhalter: `TODO-felipe@domain.tld`)
- Form-Endpoint: aktuell auf FormSubmit (`felipe.holandagroup@gmail.com`) → Felipe muss FormSubmit-Confirm-Mail bestätigen, dann läuft's. Für Volume später ggf. Formspree/n8n.
- Demo-App-URL (Platzhalter: `TODO-felipe-demo-url` — aktuell verweist auf Pocket-CEO-Demo)
- Founder-Foto + LinkedIn-URL in Team-Section
- Impressum, Datenschutz, AGB (DSGVO)
- Erste Rolle, die priorisiert wird (entscheidet Hero-Fokus + erste Demo)
- Case-Study-Zahlen nach erstem Pilot-Kunde

Bis alle `TODO-*`-Platzhalter ersetzt sind: **nicht deployen**.

---

## Referenzen

- `index.html` — die echte Copy (DE + EN via `I18N`-JSON)
- `design-system.md` — Farben, Typo, Komponenten
- `~/Desktop/LifeOS/projects/felipe/landing-page-brief.md` — ausführliches Positioning-Dokument (Rollen-Taxonomie, Messaging-Pillars)
- `~/Desktop/LifeOS/projects/felipe/felipe.md` — Dashboard, Status, Open Decisions
