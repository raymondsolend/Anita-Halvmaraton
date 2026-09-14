window.ANITA_DATA = {
  meta: {
    startDate: "2026-09-14",
    raceDate: "2026-11-03",
    targetMinutes: 130,
    targetPace: "6:10/km",
    personalBestMinutes: 135,
    baselineGarminMinutes: 139,
    baselineLongestRunKm: 21
  },

  paceZones: [
    { name: "Rolig", pace: "6:50–7:35/km", effort: "RPE 3–4", note: "Snakketempo. Farten kan vere rolegare i bakkar." },
    { name: "Jamn", pace: "6:25–6:40/km", effort: "RPE 5", note: "Kontrollert og stabilt, men ikkje ei hard økt." },
    { name: "Målfart", pace: "6:08–6:12/km", effort: "RPE 6–7", note: "Farten som skal kjennast kontrollert på nøkkeløktene." },
    { name: "Terskel", pace: "5:58–6:08/km", effort: "RPE 7", note: "Kontrollert hardt. Ho skal kunna fullføra alle draga likt." },
    { name: "Korte drag", pace: "5:45–5:58/km", effort: "RPE 8", note: "Berre på korte intervall. Ikkje full spurt." }
  ],

  weeks: [
    {
      week: 1,
      phase: "Finn rytmen",
      dates: "14.–20. september",
      plannedKm: 36.5,
      sessions: [
        {
          id: "w1-mon",
          date: "2026-09-14",
          day: "Måndag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "Rolig tur + stigningsløp",
          summary: "40 min roleg · cirka 5–6 km",
          plannedKm: 5.8,
          purpose: "Byggja mengde utan å skapa trøyttleik før kvalitetsøkta.",
          steps: [
            "35 min i snakketempo, om lag 6:50–7:35/km.",
            "4 × 20 sek stigningsløp med 60–75 sek roleg gange eller jogg.",
            "Avslutt med 3–5 min svært roleg."
          ]
        },
        {
          id: "w1-tue",
          date: "2026-09-15",
          day: "Tysdag",
          type: "strength",
          typeLabel: "Styrke",
          run: false,
          name: "Løpsstyrke + overkropp A",
          summary: "35–40 min · stopp med 2 repetisjonar i reserve",
          plannedKm: 0,
          purpose: "Styrkja legg, sete, bakside lår, rygg og pressmuskulatur utan stølheit.",
          steps: [
            "5–8 min roleg oppvarming på sykkel eller mølle.",
            "Beinpress eller goblet squat 3 × 8.",
            "Rumensk markløft med manualar 3 × 8.",
            "Step-up på låg kasse 2 × 8 per bein.",
            "Tåhev 3 × 12.",
            "Sittande roing 3 × 10 og brystpress 3 × 10.",
            "Pallof press 2 × 10 per side. Ingen sett til utmatting."
          ]
        },
        {
          id: "w1-wed",
          date: "2026-09-16",
          day: "Onsdag",
          type: "quality",
          typeLabel: "Terskel",
          run: true,
          key: true,
          name: "3 × 8 min kontrollert terskel",
          summary: "60 min totalt · 2 min roleg jogg mellom draga",
          plannedKm: 8.5,
          purpose: "Gjere målfarten meir komfortabel utan å springa maksimalt.",
          steps: [
            "12 min roleg oppvarming og 3 korte stigningsløp.",
            "3 × 8 min rundt 6:05–6:15/km, RPE 6–7.",
            "2 min roleg jogg mellom draga.",
            "10 min roleg nedjogg.",
            "Om siste drag blir klart tyngre enn dei første: senk farten."
          ]
        },
        {
          id: "w1-fri",
          date: "2026-09-18",
          day: "Fredag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "Rolig tur + kort overkropp",
          summary: "45 min roleg · cirka 6 km",
          plannedKm: 6.2,
          purpose: "Auka frekvensen og halda kroppen lett før langturen.",
          steps: [
            "45 min i snakketempo.",
            "Etter løpet: nedtrekk 2 × 10, skulderpress 2 × 10 og sideplanke 2 × 30 sek per side.",
            "Dropp styrkedelen dersom beina eller kroppen kjennest uvanleg tung."
          ]
        },
        {
          id: "w1-sun",
          date: "2026-09-20",
          day: "Søndag",
          type: "long",
          typeLabel: "Langtur",
          run: true,
          key: true,
          name: "16 km roleg langtur",
          summary: "16 km · siste 2 km litt raskare",
          plannedKm: 16,
          purpose: "Vedlikehalda distansetoleransen og øva på jamn innsats.",
          steps: [
            "14 km roleg, om lag 6:50–7:30/km.",
            "Siste 2 km rundt 6:20–6:25/km dersom kroppen er god.",
            "Test vatn og 30–45 g karbohydrat per time.",
            "Ingen rask avslutning dersom ho er tung eller har smerte."
          ]
        }
      ]
    },
    {
      week: 2,
      phase: "Bygg kapasitet",
      dates: "21.–27. september",
      plannedKm: 39.2,
      sessions: [
        {
          id: "w2-mon",
          date: "2026-09-21",
          day: "Måndag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "42 min roleg",
          summary: "42 min · cirka 6 km",
          plannedKm: 6.2,
          purpose: "Rolig mengde og restitusjon etter langturen.",
          steps: ["42 min i snakketempo.", "Hald igjen dei første 10 minutta.", "Avslutt utan stigningsløp dersom beina er tunge."]
        },
        {
          id: "w2-tue",
          date: "2026-09-22",
          day: "Tysdag",
          type: "strength",
          typeLabel: "Styrke",
          run: false,
          name: "Løpsstyrke + overkropp A",
          summary: "35–40 min · moderat belastning",
          plannedKm: 0,
          purpose: "Byggja styrke og løpsøkonomi utan å svekka onsdagsøkta.",
          steps: [
            "Beinpress 3 × 8.",
            "Rumensk markløft 3 × 8.",
            "Step-up 3 × 8 per bein.",
            "Tåhev 3 × 12.",
            "Sittande roing 3 × 8–10 og brystpress 3 × 8–10.",
            "Pallof press 2 × 10 per side. To repetisjonar i reserve."
          ]
        },
        {
          id: "w2-wed",
          date: "2026-09-23",
          day: "Onsdag",
          type: "quality",
          typeLabel: "Intervall",
          run: true,
          key: true,
          name: "5 × 1 km",
          summary: "5 × 1 km på 5:55–6:05/km · 2 min jogg",
          plannedKm: 9.5,
          purpose: "Løfta farten over halvmaratonfart med kontroll.",
          steps: [
            "2 km roleg oppvarming og 3 stigningsløp.",
            "5 × 1 km på 5:55–6:05/km.",
            "2 min svært roleg jogg mellom draga.",
            "1,5–2 km roleg nedjogg.",
            "Alle drag skal vera jamne; ikkje jag raskaste mogleg siste drag."
          ]
        },
        {
          id: "w2-fri",
          date: "2026-09-25",
          day: "Fredag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "45 min roleg + 6 stigningar",
          summary: "45 min roleg · 6 × 20 sek",
          plannedKm: 6.5,
          purpose: "Lett mengde og litt spenst i steget.",
          steps: ["40 min roleg.", "6 × 20 sek stigningsløp med full roleg pause.", "5 min roleg nedjogg."]
        },
        {
          id: "w2-sun",
          date: "2026-09-27",
          day: "Søndag",
          type: "long",
          typeLabel: "Langtur",
          run: true,
          key: true,
          name: "17 km progressiv langtur",
          summary: "14 km roleg + 3 km på 6:15–6:20/km",
          plannedKm: 17,
          purpose: "Flytta farten gradvis mot målfart etter roleg løping.",
          steps: [
            "14 km roleg og avslappa.",
            "3 km på 6:15–6:20/km dersom pusten er kontrollert.",
            "Ta gel etter om lag 40 og 80 minutt og drikk litt vatn.",
            "Målet er kontroll, ikkje å tømma seg."
          ]
        }
      ]
    },
    {
      week: 3,
      phase: "Spesifikk målfart",
      dates: "28. september–4. oktober",
      plannedKm: 39.7,
      sessions: [
        {
          id: "w3-mon",
          date: "2026-09-28",
          day: "Måndag",
          type: "easy",
          typeLabel: "Restitusjon",
          run: true,
          name: "40 min svært roleg",
          summary: "40 min · mjukt underlag om mogleg",
          plannedKm: 5.5,
          purpose: "Sirkulasjon og lett mengde etter langturen.",
          steps: ["40 min i RPE 3.", "Farten er uviktig.", "Gå eitt minutt om nødvendig for å halda økta lett."]
        },
        {
          id: "w3-tue",
          date: "2026-09-29",
          day: "Tysdag",
          type: "strength",
          typeLabel: "Styrke",
          run: false,
          name: "Løpsstyrke + overkropp B",
          summary: "35 min · litt tyngre, låg mengde",
          plannedKm: 0,
          purpose: "Styrke med god teknikk og liten total belastning.",
          steps: [
            "Beinpress 3 × 6–8.",
            "Rumensk markløft 3 × 6–8.",
            "Utfall bakover 2 × 8 per bein.",
            "Tåhev 3 × 10.",
            "Nedtrekk 3 × 8–10 og brystpress 3 × 8–10.",
            "Dead bug 2 × 8 per side. Stopp med to repetisjonar i reserve."
          ]
        },
        {
          id: "w3-wed",
          date: "2026-09-30",
          day: "Onsdag",
          type: "quality",
          typeLabel: "Målfart",
          run: true,
          key: true,
          name: "2 × 3 km i halvmaratonfart",
          summary: "2 × 3 km på 6:08–6:12/km · 3 min jogg",
          plannedKm: 10,
          purpose: "Læra kroppen nøyaktig målfart og kontrollert opning.",
          steps: [
            "2 km roleg oppvarming og 3 stigningsløp.",
            "2 × 3 km på 6:08–6:12/km.",
            "3 min roleg jogg mellom blokkene.",
            "1,5–2 km nedjogg.",
            "Registrer RPE. Målet er 6–7 av 10, ikkje høgare."
          ]
        },
        {
          id: "w3-fri",
          date: "2026-10-02",
          day: "Fredag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "45 min roleg",
          summary: "45 min · 6 korte stigningar til slutt",
          plannedKm: 6.2,
          purpose: "Stabil mengde med lett løpskjensle.",
          steps: ["40 min roleg.", "6 × 20 sek kontrollert stigning.", "Full roleg pause mellom kvar."]
        },
        {
          id: "w3-sun",
          date: "2026-10-04",
          day: "Søndag",
          type: "long",
          typeLabel: "Langtur",
          run: true,
          key: true,
          name: "18 km roleg langtur",
          summary: "18 km roleg · full ernæringstest",
          plannedKm: 18,
          purpose: "Byggja uthald og testa same drikke og gel som på løpsdagen.",
          steps: [
            "Heile turen i roleg snakketempo.",
            "Ta 30–45 g karbohydrat per time.",
            "Drikk etter tørste og forhold.",
            "Noter kva magen toler og kva som skal brukast i løpet."
          ]
        }
      ]
    },
    {
      week: 4,
      phase: "Kontrollveke",
      dates: "5.–11. oktober",
      plannedKm: 31,
      sessions: [
        {
          id: "w4-mon",
          date: "2026-10-05",
          day: "Måndag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "35 min roleg",
          summary: "35 min lett",
          plannedKm: 4.8,
          purpose: "Redusera belastninga før kontrolløktene.",
          steps: ["35 min i snakketempo.", "Ingen rask avslutning."]
        },
        {
          id: "w4-tue",
          date: "2026-10-06",
          day: "Tysdag",
          type: "strength",
          typeLabel: "Styrke",
          run: false,
          name: "Vedlikehaldsstyrke",
          summary: "25–30 min · berre 2 sett",
          plannedKm: 0,
          purpose: "Behalda styrken og samtidig redusera totalbelastninga.",
          steps: [
            "Beinpress 2 × 8.",
            "Rumensk markløft 2 × 8.",
            "Step-up 2 × 8 per bein.",
            "Tåhev 2 × 12.",
            "Roing 2 × 10 og brystpress 2 × 10.",
            "Lett belastning og ingen stølheit dagen etter."
          ]
        },
        {
          id: "w4-wed",
          date: "2026-10-07",
          day: "Onsdag",
          type: "quality",
          typeLabel: "Intervall",
          run: true,
          key: true,
          name: "6 × 800 meter",
          summary: "800 m på 5:45–5:58/km · 90 sek jogg",
          plannedKm: 9,
          purpose: "Litt høgare fart utan stor mengde.",
          steps: [
            "2 km roleg oppvarming og 3 stigningar.",
            "6 × 800 m på 5:45–5:58/km.",
            "90 sek roleg jogg mellom draga.",
            "1,5–2 km roleg nedjogg.",
            "Senk farten dersom teknikken fell saman."
          ]
        },
        {
          id: "w4-fri",
          date: "2026-10-09",
          day: "Fredag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "30 min roleg + 4 stigningar",
          summary: "Kort og lett før 10 km-test",
          plannedKm: 4.2,
          purpose: "Møta testen med friske bein.",
          steps: ["30 min roleg.", "4 × 20 sek stigningsløp.", "Ingen styrke denne dagen."]
        },
        {
          id: "w4-sun",
          date: "2026-10-11",
          day: "Søndag",
          type: "quality",
          typeLabel: "Test",
          run: true,
          key: true,
          benchmark: true,
          name: "10 km kontrolløp",
          summary: "2 km oppvarming + 10 km test + 1 km nedjogg",
          plannedKm: 13,
          purpose: "Gi den beste indikasjonen på om 2:10 er realistisk.",
          steps: [
            "2 km roleg oppvarming og 4 stigningar.",
            "10 km jamt hardt. Opna kontrollert dei første 2 km.",
            "Sterk indikator: 59:30 eller raskare.",
            "59:31–61:00: målet lever med god uthald og løpsdag.",
            "Over 61:00: 2:10 er framleis mogleg, men meir ambisiøst.",
            "1 km roleg nedjogg. Registrer sjølve 10 km-tida i resultatet."
          ]
        }
      ]
    },
    {
      week: 5,
      phase: "Toppveke",
      dates: "12.–18. oktober",
      plannedKm: 41.7,
      sessions: [
        {
          id: "w5-mon",
          date: "2026-10-12",
          day: "Måndag",
          type: "easy",
          typeLabel: "Restitusjon",
          run: true,
          name: "40 min svært roleg",
          summary: "40 min lett etter testen",
          plannedKm: 5.5,
          purpose: "Restitusjon. Denne økta kan kortast ned ved tunge bein.",
          steps: ["30–40 min svært roleg.", "Ingen stigningar.", "Avslutt dersom testen framleis sit i kroppen."]
        },
        {
          id: "w5-tue",
          date: "2026-10-13",
          day: "Tysdag",
          type: "strength",
          typeLabel: "Styrke",
          run: false,
          name: "Løpsstyrke + overkropp",
          summary: "30 min · moderat og kontrollert",
          plannedKm: 0,
          purpose: "Siste normale styrkeøkt før nedtrappinga.",
          steps: [
            "Beinpress 2–3 × 6–8.",
            "Rumensk markløft 2 × 8.",
            "Utfall bakover 2 × 8 per bein.",
            "Tåhev 3 × 10.",
            "Roing 3 × 8–10 og brystpress 3 × 8–10.",
            "Ingen sett til utmatting."
          ]
        },
        {
          id: "w5-wed",
          date: "2026-10-14",
          day: "Onsdag",
          type: "quality",
          typeLabel: "Terskel",
          run: true,
          key: true,
          name: "3 × 2 km",
          summary: "2 km-drag på 6:00–6:08/km · 2:30 jogg",
          plannedKm: 10,
          purpose: "Byggja kapasitet like over målfart.",
          steps: [
            "2 km roleg oppvarming.",
            "3 × 2 km på 6:00–6:08/km.",
            "2 min 30 sek roleg jogg mellom draga.",
            "1,5 km roleg nedjogg.",
            "Kontrollert slutt er viktigare enn høg fart."
          ]
        },
        {
          id: "w5-fri",
          date: "2026-10-16",
          day: "Fredag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "45 min roleg + stigningar",
          summary: "45 min · 5 × 20 sek",
          plannedKm: 6.2,
          purpose: "Lett mengde og god rytme før siste lange nøkkeløkt.",
          steps: ["40 min roleg.", "5 × 20 sek stigningsløp.", "Et godt karbohydratrikt måltid seinare på dagen."]
        },
        {
          id: "w5-sun",
          date: "2026-10-18",
          day: "Søndag",
          type: "long",
          typeLabel: "Nøkkeløkt",
          run: true,
          key: true,
          name: "20 km med 5 km i målfart",
          summary: "13 km roleg + 5 km på 6:08–6:12 + 2 km roleg",
          plannedKm: 20,
          purpose: "Den viktigaste løpsspesifikke langturen.",
          steps: [
            "13 km roleg.",
            "5 km på 6:08–6:12/km med kontrollert pust.",
            "2 km roleg nedjogg.",
            "Bruk planlagt løpsfrukost og 30–60 g karbohydrat per time.",
            "Avbryt målfartsdelen dersom smerta aukar eller steget endrar seg."
          ]
        }
      ]
    },
    {
      week: 6,
      phase: "Siste bygging",
      dates: "19.–25. oktober",
      plannedKm: 35.8,
      sessions: [
        {
          id: "w6-mon",
          date: "2026-10-19",
          day: "Måndag",
          type: "easy",
          typeLabel: "Restitusjon",
          run: true,
          name: "35 min roleg",
          summary: "35 min svært lett",
          plannedKm: 4.8,
          purpose: "Ta opp treninga utan å dra med seg trøyttleik.",
          steps: ["35 min i snakketempo.", "Kort ned til 25 min dersom beina er tunge."]
        },
        {
          id: "w6-tue",
          date: "2026-10-20",
          day: "Tysdag",
          type: "strength",
          typeLabel: "Styrke",
          run: false,
          name: "Lett vedlikehaldsstyrke",
          summary: "20–25 min · 2 lette sett",
          plannedKm: 0,
          purpose: "Behalda aktivering utan stølheit.",
          steps: [
            "Beinpress 2 × 6 med lett/moderat belastning.",
            "Rumensk markløft 2 × 6.",
            "Step-up 2 × 6 per bein.",
            "Tåhev 2 × 10.",
            "Roing 2 × 8 og brystpress 2 × 8.",
            "Stopp medan alt framleis kjennest lett."
          ]
        },
        {
          id: "w6-wed",
          date: "2026-10-21",
          day: "Onsdag",
          type: "quality",
          typeLabel: "Intervall",
          run: true,
          key: true,
          name: "4 × 1,5 km",
          summary: "1,5 km på 5:58–6:05/km · 2 min jogg",
          plannedKm: 9.5,
          purpose: "Siste tyngre kvalitetsøkt.",
          steps: [
            "2 km roleg oppvarming og 3 stigningar.",
            "4 × 1,5 km på 5:58–6:05/km.",
            "2 min roleg jogg mellom draga.",
            "1,5 km roleg nedjogg.",
            "Ho skal sitja att med kjensla av at eitt drag til var mogleg."
          ]
        },
        {
          id: "w6-fri",
          date: "2026-10-23",
          day: "Fredag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "40 min roleg",
          summary: "40 min · heilt avslappa",
          plannedKm: 5.5,
          purpose: "Henta seg inn før den siste spesifikke langturen.",
          steps: ["40 min roleg.", "Ingen ekstra styrke.", "Prioriter søvn og vanleg godt matinntak."]
        },
        {
          id: "w6-sun",
          date: "2026-10-25",
          day: "Søndag",
          type: "long",
          typeLabel: "Målfart",
          run: true,
          key: true,
          name: "16 km med 6 km i målfart",
          summary: "6 km roleg + 6 km på 6:08–6:12 + 4 km roleg",
          plannedKm: 16,
          purpose: "Bekrefta målfarten før nedtrappinga.",
          steps: [
            "6 km roleg.",
            "6 km på 6:08–6:12/km.",
            "4 km roleg.",
            "Bruk gel og drikke som planlagt på løpsdagen.",
            "Målfartsblokka bør vera RPE 6–7. Høgare RPE betyr at farten bør justerast."
          ]
        }
      ]
    },
    {
      week: 7,
      phase: "Nedtrapping",
      dates: "26. oktober–1. november",
      plannedKm: 24.5,
      sessions: [
        {
          id: "w7-mon",
          date: "2026-10-26",
          day: "Måndag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "30 min roleg + 4 stigningar",
          summary: "Kort og lett",
          plannedKm: 4.3,
          purpose: "Redusera mengda, men halda steget levande.",
          steps: ["30 min roleg.", "4 × 20 sek stigningsløp med full pause."]
        },
        {
          id: "w7-tue",
          date: "2026-10-27",
          day: "Tysdag",
          type: "strength",
          typeLabel: "Aktivering",
          run: false,
          name: "Lett styrkeaktivering",
          summary: "15–20 min · ingen stølheit",
          plannedKm: 0,
          purpose: "Siste lette styrkesignal før løpet.",
          steps: [
            "Kroppsvektknebøy 2 × 8.",
            "Lett step-up 2 × 6 per bein.",
            "Tåhev 2 × 10.",
            "Sittande roing 2 × 8 og brystpress 2 × 8.",
            "Alt skal kjennast lett. Ingen tung beinstyrke etter denne dagen."
          ]
        },
        {
          id: "w7-wed",
          date: "2026-10-28",
          day: "Onsdag",
          type: "quality",
          typeLabel: "Målfart",
          run: true,
          key: true,
          name: "3 × 2 km i målfart",
          summary: "6:08–6:12/km · 2 min roleg jogg",
          plannedKm: 9,
          purpose: "Siste stadfesting av rytme, ikkje ein test.",
          steps: [
            "1,5–2 km roleg oppvarming.",
            "3 × 2 km på 6:08–6:12/km.",
            "2 min roleg jogg mellom blokkene.",
            "1 km roleg nedjogg.",
            "Avslutt etter to drag dersom kroppen kjennest tung."
          ]
        },
        {
          id: "w7-fri",
          date: "2026-10-30",
          day: "Fredag",
          type: "easy",
          typeLabel: "Rolig",
          run: true,
          name: "30 min roleg + 4 stigningar",
          summary: "Kort og lett",
          plannedKm: 4.2,
          purpose: "Behalda god løpskjensle.",
          steps: ["30 min roleg.", "4 × 20 sek stigningar.", "Stopp medan ho kjenner seg lett."]
        },
        {
          id: "w7-sun",
          date: "2026-11-01",
          day: "Søndag",
          type: "easy",
          typeLabel: "Lett",
          run: true,
          name: "50 min roleg",
          summary: "Om lag 7 km · svært kontrollert",
          plannedKm: 7,
          purpose: "Siste rolege tur før løpsdagen tysdag.",
          steps: ["45–50 min roleg.", "Ingen rask avslutning.", "Test ingenting nytt med sko, klede eller mat."]
        }
      ]
    },
    {
      week: 8,
      phase: "Løpsdag",
      dates: "2.–3. november",
      plannedKm: 24.1,
      sessions: [
        {
          id: "w8-mon",
          date: "2026-11-02",
          day: "Måndag",
          type: "easy",
          typeLabel: "Opnar",
          run: true,
          name: "20 min opningstur",
          summary: "20 min roleg + 4 × 20 sek",
          plannedKm: 3,
          purpose: "Ro i kroppen og litt spenst i steget.",
          steps: [
            "15 min svært roleg.",
            "4 × 20 sek i kontrollert halvmaratonkjensle til litt raskare.",
            "Full pause og 3–5 min roleg etterpå.",
            "Dropp økta dersom ho kjenner seg betre av full kvile."
          ]
        },
        {
          id: "w8-race",
          date: "2026-11-03",
          day: "Tysdag",
          type: "race",
          typeLabel: "Løp",
          run: true,
          key: true,
          name: "Halvmaraton – mål 2:10",
          summary: "21,1 km · snitt om lag 6:10/km",
          plannedKm: 21.1,
          purpose: "Springa jamt, kontrollert og med best mogleg avslutning.",
          steps: [
            "Km 1–3: 6:13–6:17/km. La andre opna for hardt.",
            "Km 4–15: finn rytmen rundt 6:08–6:11/km.",
            "Km 16–20: hald 6:05–6:10/km dersom kroppen er god.",
            "Siste 1,1 km: auk gradvis etter kapasitet.",
            "Gel rundt 30, 65 og 100 minutt, med vatn. Sportsdrikk berre dersom dette er testa.",
            "10 km-passering rundt 1:01:45–1:02:00. 15 km rundt 1:32:30."
          ]
        }
      ]
    }
  ],

  meals: [
    {
      day: "Måndag",
      focus: "Rolig løpedag",
      meals: [
        { id: "mon-1", name: "Frukost", text: "70 g havregryn, 2,5 dl mjølk, banan og bær", kcal: 555, protein: 24 },
        { id: "mon-2", name: "Lunsj", text: "4 grove skiver med egg, kalkunpålegg og ost + grønsaker", kcal: 600, protein: 34 },
        { id: "mon-3", name: "Før/etter økt", text: "Skyr og eit eple", kcal: 230, protein: 17 },
        { id: "mon-4", name: "Middag", text: "160 g laks, 400 g poteter, grønsaker og yoghurtdressing", kcal: 720, protein: 42 },
        { id: "mon-5", name: "Kveldsmat", text: "2 knekkebrød med cottage cheese og bær", kcal: 250, protein: 22 }
      ]
    },
    {
      day: "Tysdag",
      focus: "Styrkedag",
      meals: [
        { id: "tue-1", name: "Frukost", text: "3 egg, 2 grove skiver og ein appelsin", kcal: 500, protein: 27 },
        { id: "tue-2", name: "Mellommåltid", text: "Skyr, banan og litt müsli", kcal: 220, protein: 17 },
        { id: "tue-3", name: "Lunsj", text: "Fullkornswrap med 150 g kylling, ris og grønsaker", kcal: 620, protein: 40 },
        { id: "tue-4", name: "Middag", text: "Pasta med karbonadedeig, tomatsaus og salat", kcal: 720, protein: 44 },
        { id: "tue-5", name: "Kveldsmat", text: "Cottage cheese, bær og 2 knekkebrød", kcal: 260, protein: 24 }
      ]
    },
    {
      day: "Onsdag",
      focus: "Kvalitetsøkt – meir karbohydrat",
      meals: [
        { id: "wed-1", name: "Frukost", text: "Havregraut med mjølk, banan, honning og yoghurt", kcal: 580, protein: 23 },
        { id: "wed-2", name: "Lunsj", text: "Kylling- og risbolle med grønsaker og lett dressing", kcal: 650, protein: 37 },
        { id: "wed-3", name: "1–2 timar før økt", text: "2 lyse/grove skiver med syltetøy og ein banan", kcal: 300, protein: 7 },
        { id: "wed-4", name: "Middag etter økt", text: "Pasta bolognese med karbonadedeig og litt parmesan", kcal: 760, protein: 41 },
        { id: "wed-5", name: "Restitusjon", text: "Sjokolademjølk eller Skyr + frukt", kcal: 250, protein: 18 }
      ]
    },
    {
      day: "Torsdag",
      focus: "Kvile og restitusjon",
      meals: [
        { id: "thu-1", name: "Frukost", text: "Havregryn, mjølk, bær og 2 egg", kcal: 500, protein: 25 },
        { id: "thu-2", name: "Mellommåltid", text: "Yoghurt og ei frukt", kcal: 200, protein: 16 },
        { id: "thu-3", name: "Lunsj", text: "4 grove skiver med makrell i tomat, egg og grønsaker", kcal: 580, protein: 34 },
        { id: "thu-4", name: "Middag", text: "Kyllingwok med ris og rikeleg grønsaker", kcal: 680, protein: 40 },
        { id: "thu-5", name: "Kveldsmat", text: "Cottage cheese, bær og litt nøtter", kcal: 250, protein: 20 }
      ]
    },
    {
      day: "Fredag",
      focus: "Rolig løpedag",
      meals: [
        { id: "fri-1", name: "Frukost", text: "Havregraut med mjølk, banan og bær", kcal: 540, protein: 22 },
        { id: "fri-2", name: "Lunsj", text: "Omelett av 3 egg, 3 grove skiver og grønsaker", kcal: 610, protein: 36 },
        { id: "fri-3", name: "Før/etter økt", text: "Skyr og banan", kcal: 220, protein: 16 },
        { id: "fri-4", name: "Middag", text: "Taco med karbonadedeig, ris/tortilla, ost og grønsaker", kcal: 720, protein: 40 },
        { id: "fri-5", name: "Kveldsmat", text: "2 knekkebrød med cottage cheese", kcal: 250, protein: 21 }
      ]
    },
    {
      day: "Laurdag",
      focus: "Fyll energi før langtur",
      meals: [
        { id: "sat-1", name: "Frukost", text: "Havregraut med banan, mjølk og honning", kcal: 550, protein: 23 },
        { id: "sat-2", name: "Mellommåltid", text: "Skyr og ei frukt", kcal: 200, protein: 17 },
        { id: "sat-3", name: "Lunsj", text: "Kyllingbagett eller wrap + yoghurt", kcal: 650, protein: 34 },
        { id: "sat-4", name: "Middag", text: "Kylling eller laks med rikeleg ris/pasta og kokte grønsaker", kcal: 760, protein: 36 },
        { id: "sat-5", name: "Kveldsmat", text: "2 skiver med syltetøy og eit glas mjølk", kcal: 260, protein: 14 }
      ]
    },
    {
      day: "Søndag",
      focus: "Langtur og restitusjon",
      meals: [
        { id: "sun-1", name: "2–3 timar før tur", text: "Havregraut med banan og honning + 2 skiver med syltetøy", kcal: 620, protein: 22 },
        { id: "sun-2", name: "Under langtur", text: "Gel/sportsdrikk som gir 30–60 g karbohydrat per time + vatn", kcal: 200, protein: 0 },
        { id: "sun-3", name: "Rett etter tur", text: "Sjokolademjølk, Skyr og banan", kcal: 400, protein: 22 },
        { id: "sun-4", name: "Lunsj", text: "4 skiver med egg, kalkunpålegg og ost + frukt", kcal: 620, protein: 34 },
        { id: "sun-5", name: "Middag", text: "Kylling, ris, grønsaker og saus", kcal: 740, protein: 42 },
        { id: "sun-6", name: "Kveldsmat", text: "Yoghurt med bær og litt müsli", kcal: 220, protein: 17 }
      ]
    }
  ],

  raceMeals: {
    "2026-11-02": {
      day: "Måndag 2. november",
      focus: "Dagen før løpet – karbohydrat og roleg mage",
      meals: [
        { id: "pre-1", name: "Frukost", text: "Havregraut med banan, mjølk og honning", kcal: 550, protein: 22 },
        { id: "pre-2", name: "Mellommåltid", text: "Yoghurt, banan og litt müsli", kcal: 250, protein: 14 },
        { id: "pre-3", name: "Lunsj", text: "Kylling og ris med litt kokte grønsaker", kcal: 650, protein: 32 },
        { id: "pre-4", name: "Mellommåltid", text: "2 skiver med syltetøy og sportsdrikk/vatn", kcal: 250, protein: 5 },
        { id: "pre-5", name: "Tidleg middag", text: "Pasta med kylling og mild tomatsaus, lite feitt og passe fiber", kcal: 750, protein: 32 },
        { id: "pre-6", name: "Kveldsmat", text: "Lyst brød med syltetøy og eit glas mjølk", kcal: 220, protein: 10 }
      ]
    },
    "2026-11-03": {
      day: "Tysdag 3. november",
      focus: "Løpsdag",
      meals: [
        { id: "race-1", name: "3 timar før start", text: "Havregraut med banan og honning + 2 lyse skiver med syltetøy", kcal: 620, protein: 18 },
        { id: "race-2", name: "30–45 min før", text: "Liten banan eller ein halv energibar + nokre slurkar vatn", kcal: 180, protein: 2 },
        { id: "race-3", name: "Under løpet", text: "Gel rundt 30, 65 og 100 min + vatn. Sportsdrikk berre om det er testa.", kcal: 320, protein: 0 },
        { id: "race-4", name: "Etter mål", text: "Sjokolademjølk/Skyr, banan og ei brødskive", kcal: 500, protein: 25 },
        { id: "race-5", name: "Middag", text: "Valfri normal middag med ris/potet/pasta, protein og grønsaker", kcal: 750, protein: 40 },
        { id: "race-6", name: "Kveldsmat", text: "Yoghurt eller cottage cheese med bær", kcal: 230, protein: 16 }
      ]
    }
  },

  shopping: [
    { id: "s1", category: "Karbohydrat", name: "Havregryn", qty: "1 pose" },
    { id: "s2", category: "Karbohydrat", name: "Grovbrød", qty: "1–2 stk" },
    { id: "s3", category: "Karbohydrat", name: "Lyst brød til løpsførebuing", qty: "1 stk ved behov" },
    { id: "s4", category: "Karbohydrat", name: "Ris", qty: "1 kg" },
    { id: "s5", category: "Karbohydrat", name: "Pasta", qty: "500 g–1 kg" },
    { id: "s6", category: "Karbohydrat", name: "Poteter", qty: "1,5–2 kg" },
    { id: "s7", category: "Karbohydrat", name: "Fullkornswrap/tortilla", qty: "1 pk" },
    { id: "s8", category: "Karbohydrat", name: "Knekkebrød", qty: "1 pk" },
    { id: "s9", category: "Karbohydrat", name: "Müsli", qty: "1 pk" },
    { id: "s10", category: "Karbohydrat", name: "Syltetøy og honning", qty: "1 av kvar" },

    { id: "s11", category: "Protein", name: "Egg", qty: "18 stk" },
    { id: "s12", category: "Protein", name: "Kyllingfilet", qty: "1,2–1,5 kg" },
    { id: "s13", category: "Protein", name: "Laks", qty: "400–600 g" },
    { id: "s14", category: "Protein", name: "Karbonadedeig", qty: "600–800 g" },
    { id: "s15", category: "Protein", name: "Kalkun-/skinkepålegg", qty: "2 pk" },
    { id: "s16", category: "Protein", name: "Makrell i tomat", qty: "2–3 boksar" },
    { id: "s17", category: "Protein", name: "Skyr/proteinrik yoghurt", qty: "8–10 stk" },
    { id: "s18", category: "Protein", name: "Cottage cheese", qty: "3 beger" },
    { id: "s19", category: "Protein", name: "Ost", qty: "1 pk" },
    { id: "s20", category: "Protein", name: "Mjølk/sjokolademjølk", qty: "4–5 liter totalt" },

    { id: "s21", category: "Frukt og grønt", name: "Bananar", qty: "12–16 stk" },
    { id: "s22", category: "Frukt og grønt", name: "Eple/appelsin/annan frukt", qty: "8–10 stk" },
    { id: "s23", category: "Frukt og grønt", name: "Bær, ferske eller frosne", qty: "2–3 pk" },
    { id: "s24", category: "Frukt og grønt", name: "Brokkoli, gulrot og wokgrønsaker", qty: "rikeleg" },
    { id: "s25", category: "Frukt og grønt", name: "Salat, tomat, agurk og paprika", qty: "etter behov" },

    { id: "s26", category: "Løpsdrivstoff", name: "Gel – same type til trening og løp", qty: "8–10 stk" },
    { id: "s27", category: "Løpsdrivstoff", name: "Sportsdrikk", qty: "1 boks/flaske" },
    { id: "s28", category: "Anna", name: "Tomatsaus, salsa og mild saus", qty: "2–3 glas" },
    { id: "s29", category: "Anna", name: "Nøtter", qty: "1 liten pose" },
    { id: "s30", category: "Anna", name: "Yoghurtdressing/lett dressing", qty: "1 flaske" }
  ],

  raceStrategy: [
    { section: "Km 1–3", pace: "6:13–6:17/km", cue: "Hald igjen" },
    { section: "Km 4–15", pace: "6:08–6:11/km", cue: "Finn rytmen" },
    { section: "Km 16–20", pace: "6:05–6:10/km", cue: "Vurder kroppen" },
    { section: "Siste 1,1 km", pace: "Etter kapasitet", cue: "Auk gradvis" }
  ]
};
