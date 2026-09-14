# Anita mot 2:10

Mobilvennleg PWA med treningsplan, matplan, handleliste og lokal Garmin-import fram mot halvmaraton 3. november 2026.

## Mål

- Halvmaraton: 2:10
- Målfart: om lag 6:10 per km
- Utgangspunkt: personleg rekord 2:15 og Garmin-prognose 2:19
- Fire løpeøkter per full treningsveke
- Ei løpsretta styrkeøkt per veke
- Mat for trening, restitusjon og løpsførebuing
- Redigerbare måltid med lokal estimering av kcal og protein frå teksten
- Varer som kan kjøpast hos Coop Extra eller Kiwi

## Personvern og lagring

All avhuking, redigering, treningslogg og Garmin-data blir lagra lokalt på eininga. CSV-filer og måltidstekst blir behandla i nettlesaren og blir ikkje lasta opp til ein server. Ingen Garmin-passord eller OpenAI API-nøklar blir brukt.

## Garmin

Direkte automatisk synk krev tilgang til Garmin Connect Developer Program, OAuth 2.0 og ein eigen backend. Denne versjonen brukar difor:

1. Manuell registrering av Garmin sin halvmaratonprognose og eventuell VO2-maks.
2. Lokal import av aktivitetslista som CSV frå Garmin Connect.
3. Ei samla framdriftsvurdering basert på prognosetrend, gjennomførte løpeøkter, nøkkeløkter, vekekilometer og langtur.

## GitHub Pages

Når filene ligg på main:

1. Opne Settings i GitHub-repoet.
2. Vel Pages.
3. Under Build and deployment vel du Deploy from a branch.
4. Vel main og mappa /(root).
5. Trykk Save.

Nettsida blir då tilgjengeleg på:
https://raymondsolend.github.io/Anita-Halvmaraton/

På iPhone: opne sida i Safari, trykk Del og vel Legg til på Hjem-skjerm.

## Viktig

Planen er eit treningsverktøy og ikkje medisinsk rådgiving. Stopp og vurder helsehjelp ved brystsmerter, uvanleg tung pust, svimmelheit eller andre nye symptom.
