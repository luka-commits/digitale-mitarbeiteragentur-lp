# DMA UTM-Convention — Source-Tagging Reference

**Ziel:** jeder Outreach-Kanal nutzt verbindliche UTM-Tags, sodass GA4 zuverlässig zeigt, **welcher Channel konvertiert**.

## Convention

Alle Links zur LP, die NICHT direkt durch organisches Verhalten kommen (Bookmark, manuelle URL), brauchen UTM-Tags. Format:

```
https://dma-agentur.de/?utm_source=<source>&utm_medium=<medium>&utm_campaign=<campaign>
```

Optional zusätzlich:
- `utm_content=<variant>` — A/B-Variante oder Position im Mailing
- `utm_term=<keyword>` — bei Paid Search (Google Ads etc.)

## Channel-Tabelle (verbindlich)

| Channel | `utm_source` | `utm_medium` | `utm_campaign` | Beispiel |
|---------|--------------|--------------|----------------|----------|
| Job-Ad Bewerbung Indeed.de | `jobad-indeed` | `bewerbung` | `<persona>-<yymm>` | `?utm_source=jobad-indeed&utm_medium=bewerbung&utm_campaign=paula-2604` |
| Job-Ad Bewerbung Stepstone | `jobad-stepstone` | `bewerbung` | `<persona>-<yymm>` | `?utm_source=jobad-stepstone&utm_medium=bewerbung&utm_campaign=martin-2604` |
| Job-Ad Bewerbung LinkedIn | `jobad-linkedin` | `bewerbung` | `<persona>-<yymm>` | `?utm_source=jobad-linkedin&utm_medium=bewerbung&utm_campaign=jonas-2604` |
| LinkedIn Outbound (organisch + DM) | `linkedin` | `outbound` | `<initiative>` | `?utm_source=linkedin&utm_medium=outbound&utm_campaign=cenit-warm` |
| LinkedIn Posts (organisch von Felipes Profil) | `linkedin` | `social` | `<post-thema>` | `?utm_source=linkedin&utm_medium=social&utm_campaign=automation-mythos` |
| Cold-Email (Instantly/Heyreach) | `cold-email` | `email` | `<sequence-name>` | `?utm_source=cold-email&utm_medium=email&utm_campaign=mittelstand-cfo-q2` |
| Referral-Partner (Cenit, Bechtle, Arano) | `referral` | `partner` | `<partner-slug>` | `?utm_source=referral&utm_medium=partner&utm_campaign=cenit-ag` |
| Newsletter (eigenes) | `newsletter` | `email` | `<issue-yymm>` | `?utm_source=newsletter&utm_medium=email&utm_campaign=2604` |
| Google Ads (V2) | `google` | `cpc` | `<adgroup>` | _(später)_ |
| Meta Ads (V2) | `facebook` \| `instagram` | `paid-social` | `<adset>` | _(später)_ |

## Naming-Regeln

- **Lowercase, kebab-case.** Keine Leerzeichen, keine Großbuchstaben, keine Sonderzeichen außer `-`.
- **`<persona>`** = `paula` | `martin` | `jonas` (kleingeschrieben).
- **`<yymm>`** = 4-stellig, Jahr+Monat (z. B. `2604` = April 2026). Nicht ISO `yyyy-mm`, weil URL-Länge.
- **`<initiative>`** für LinkedIn-Outbound = sprechender Name (`cenit-warm`, `bechtle-intro`, `arano-whitelabel`).
- **`<sequence-name>`** für Cold-Email = Instantly-Sequenz-Name 1:1 (z. B. `mittelstand-cfo-q2`).

## Wo werden UTMs gesetzt

| Tool / Stelle | Wer setzt | Wann |
|---------------|-----------|------|
| **Job-Ad-Outreach Skill** (Anschreiben-Email-Body) | V2 — noch nicht im V1-Skill, kommt später | _siehe `skills/job-ad-outreach/` SKILL.md V2-Backlog_ |
| **LinkedIn-DM-Templates** (Heyreach) | Felipe / Luka beim Sequenz-Aufbau | manuell pro Template, einmalig |
| **Cold-Email-Templates** (Instantly) | Felipe / Luka beim Sequenz-Aufbau | manuell pro Template, einmalig |
| **LinkedIn-Posts** | Felipe beim Posten | jeder Post mit URL |
| **Newsletter-Mails** | Luka bei Versand | pro Issue |
| **Referral-Anfragen** an Cenit etc. | Felipe | pro Outreach |

## Verification in GA4

Nach 24h Daten-Akkumulation:
1. GA4 → **Acquisition** → **Traffic acquisition** → Spalten `Session source`, `Session medium`, `Session campaign`
2. Filter auf `Session medium = bewerbung` → siehst alle Job-Ad-Bewerbungen
3. Sekundäre Dimension `Session campaign` → Persona-Performance (Paula vs. Martin vs. Jonas)
4. Conversions-Spalte `form_submit_lead` zeigt: welcher Channel konvertiert tatsächlich zum Erstgespräch?

## Anti-Pattern (nicht so)

- ❌ `utm_source=Linkedin` → Großschreibung bricht Channel-Gruppierung in GA4
- ❌ `utm_source=linkedin&utm_medium=cpc` für organische DMs → `cpc` gehört zu Paid
- ❌ `utm_source=indeed-stepstone` → Mehrere Sources kombinieren bricht Attribution
- ❌ Keine UTM bei Cold-Email → wird in GA4 als "Direct" oder "Referral" verbucht, Attribution kaputt
