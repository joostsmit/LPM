# LPM — Lean Portfolio Management

Een lichtgewicht portfolio management tool voor het bijhouden en prioriteren van strategische initiatieven met WSJF-scoring.

## Functionaliteit

- **Tabel- en kaartweergave** van alle initiatieven
- **WSJF-scoring** (Weighted Shortest Job First) op basis van de Fibonacci-reeks
- **Portfoliostroom** — aantallen per fase (Idee → Uitvoering → Afgerond), klikbaar als filter
- **Prioriteitsrangorde** op WSJF met score-balk; bij het scoren zie je live op welke plek een initiatief belandt
- **Actief / Afgerond / Alles** — afgeronde initiatieven staan apart, met afrondingsdatum
- **Direct bewerken** vanuit het overzicht: klik op een rij of kaart, wijzig de status via het statuslabel, of gebruik de snelacties — alles met *ongedaan maken*
- **Zoeken en filteren** op aandachtsgebied, thema en business unit (meerdere waarden tegelijk)
- **Beheer** van aandachtsgebieden, thema's en business units, inclusief hernoemen (werkt door in alle initiatieven); bewerken is beveiligd met een pincode
- **Veilig laden** — als de centrale opslag niet bereikbaar is, wordt bewerken geblokkeerd zodat er nooit data overschreven wordt
- **Sneltoetsen**: `N` nieuw initiatief, `/` zoeken, `⌘S` opslaan, `Esc` sluiten
- **Centrale opslag** via Vercel Blob — alle gebruikers zien altijd dezelfde data

## Statussen

`Idee` → `Beoordeling` → `Analyse` → `Goedgekeurd` → `Uitvoering` → `Klaar`

## WSJF

Score = **(Business Value + Time Criticality + Risk Reduction) / Job Size**

Waarden worden ingevoerd via Fibonacci-knoppen: 1, 2, 3, 5, 8, 13, 21. Hoe hoger de score, hoe hoger de prioriteit.

## Technische opzet

| Onderdeel | Keuze |
|-----------|-------|
| Frontend | Enkele `index.html` (HTML/CSS/JS, geen framework) |
| Fonts | Inter (UI) + DM Mono (scores/code) via Google Fonts |
| Opslag | Vercel Blob via serverless function (`api/portfolio.js`) |
| Hosting | Vercel (automatisch vanuit GitHub `main`) |

## Deployment

De app deployt automatisch via Vercel bij elke push naar `main`.

### Vereiste omgevingsvariabele

| Variabele | Omschrijving |
|-----------|-------------|
| `BLOB_READ_WRITE_TOKEN` | Token van de gekoppelde Vercel Blob store |

Stel deze in via: Vercel dashboard → Project → Settings → Environment Variables.

### Initiële data uploaden

```bash
npm install
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_... node upload-portfolio.mjs
```

## Lokaal draaien

De app is een statisch HTML-bestand. Open `index.html` direct in de browser voor een voorvertoning (zonder Blob-connectie — werkt op demo-data). De API-routes vereisen een Vercel-omgeving.

## Standaard pincode Beheer

De beheer-sectie is beveiligd met pincode `1234`. Wijzig deze na ingebruikname via **Beheer → Beveiliging**.
