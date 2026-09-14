(function () {
  "use strict";

  var DATA = window.ANITA_DATA;
  if (!DATA) {
    document.body.innerHTML = "<p style='color:white;padding:20px'>Klarte ikkje å lasta programdata.</p>";
    return;
  }

  var DB_NAME = "anita_halvmaraton_210";
  var STORE_NAME = "state";
  var STATE_KEY = "main";
  var DAY_MS = 86400000;
  var toastTimer;

  function copy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function todayISO() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function clampDate(date) {
    if (date < DATA.meta.startDate) return DATA.meta.startDate;
    if (date > DATA.meta.raceDate) return DATA.meta.raceDate;
    return date;
  }

  function initialState() {
    return {
      version: 1,
      selectedDate: clampDate(todayISO()),
      weeks: copy(DATA.weeks),
      meals: copy(DATA.meals),
      raceMeals: copy(DATA.raceMeals),
      shopping: copy(DATA.shopping),
      checks: {},
      results: {},
      shopChecks: {},
      activities: [],
      predictions: [
        { id: "baseline", date: DATA.meta.startDate, minutes: DATA.meta.baselineGarminMinutes, vo2max: "" }
      ],
      lastImport: null
    };
  }

  var state = initialState();

  function mergeState(saved) {
    var fresh = initialState();
    if (!saved || typeof saved !== "object") return fresh;
    Object.keys(fresh).forEach(function (key) {
      if (saved[key] !== undefined && saved[key] !== null) fresh[key] = saved[key];
    });
    if (!Array.isArray(fresh.weeks) || fresh.weeks.length !== DATA.weeks.length) fresh.weeks = copy(DATA.weeks);
    if (!Array.isArray(fresh.meals) || fresh.meals.length !== 7) fresh.meals = copy(DATA.meals);
    if (!fresh.raceMeals || typeof fresh.raceMeals !== "object") fresh.raceMeals = copy(DATA.raceMeals);
    if (!Array.isArray(fresh.shopping)) fresh.shopping = copy(DATA.shopping);
    if (!Array.isArray(fresh.activities)) fresh.activities = [];
    if (!Array.isArray(fresh.predictions) || !fresh.predictions.length) fresh.predictions = initialState().predictions;
    fresh.selectedDate = clampDate(fresh.selectedDate || todayISO());
    return fresh;
  }

  function openDB() {
    return new Promise(function (resolve, reject) {
      var request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = function () {
        if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME);
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
  }

  async function loadSavedState() {
    try {
      var db = await openDB();
      var tx = db.transaction(STORE_NAME, "readonly");
      var request = tx.objectStore(STORE_NAME).get(STATE_KEY);
      var result = await new Promise(function (resolve) {
        request.onsuccess = function () { resolve(request.result || null); };
        request.onerror = function () { resolve(null); };
      });
      if (result) return result;
    } catch (error) {
      console.warn("IndexedDB er ikkje tilgjengeleg", error);
    }

    try {
      var local = localStorage.getItem(DB_NAME);
      return local ? JSON.parse(local) : null;
    } catch (error) {
      return null;
    }
  }

  async function persist() {
    try {
      localStorage.setItem(DB_NAME, JSON.stringify(state));
    } catch (error) {
      console.warn("Kunne ikkje lagra i localStorage", error);
    }

    try {
      var db = await openDB();
      var tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(state, STATE_KEY);
    } catch (error) {
      console.warn("Kunne ikkje lagra i IndexedDB", error);
    }

    var saveStatus = document.getElementById("save-status");
    if (saveStatus) {
      saveStatus.textContent = "✓ Lagra no";
      window.setTimeout(function () { saveStatus.textContent = "✓ Lagra lokalt"; }, 1200);
    }
  }

  function esc(value) {
    var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" };
    return String(value === undefined || value === null ? "" : value).replace(/[&<>"']/g, function (char) {
      return map[char];
    });
  }

  function parseISO(value) {
    return new Date(value + "T12:00:00");
  }

  function addDays(value, days) {
    var d = parseISO(value);
    d.setDate(d.getDate() + days);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function daysBetween(a, b) {
    return Math.round((parseISO(b) - parseISO(a)) / DAY_MS);
  }

  function formatDate(value, includeYear) {
    try {
      return new Intl.DateTimeFormat("nn-NO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: includeYear ? "numeric" : undefined
      }).format(parseISO(value));
    } catch (error) {
      return value;
    }
  }

  function formatShortDate(value) {
    try {
      return new Intl.DateTimeFormat("nn-NO", { day: "numeric", month: "short" }).format(parseISO(value));
    } catch (error) {
      return value;
    }
  }

  function formatMinutes(value) {
    var totalSeconds = Math.round(Number(value || 0) * 60);
    var h = Math.floor(totalSeconds / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    var s = totalSeconds % 60;
    if (s) return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    return h + ":" + String(m).padStart(2, "0");
  }

  function parseTime(value) {
    var text = String(value || "").trim().replace(",", ".");
    if (!text) return 0;
    if (text.indexOf(":") >= 0) {
      var parts = text.split(":").map(Number);
      if (parts.some(function (n) { return !Number.isFinite(n); })) return 0;
      if (parts.length === 3) return parts[0] * 60 + parts[1] + parts[2] / 60;
      if (parts.length === 2) {
        if (parts[0] <= 4) return parts[0] * 60 + parts[1];
        return parts[0] + parts[1] / 60;
      }
    }
    var number = Number(text);
    return Number.isFinite(number) ? number : 0;
  }

  function formatPace(duration, distance) {
    if (!duration || !distance) return "–";
    var pace = duration / distance;
    var min = Math.floor(pace);
    var sec = Math.round((pace - min) * 60);
    if (sec === 60) { min += 1; sec = 0; }
    return min + ":" + String(sec).padStart(2, "0") + "/km";
  }

  function clamp(number, low, high) {
    return Math.min(high, Math.max(low, number));
  }

  function allSessions() {
    var result = [];
    state.weeks.forEach(function (week) {
      week.sessions.forEach(function (session) {
        session.week = week.week;
        result.push(session);
      });
    });
    return result;
  }

  function getSession(id) {
    return allSessions().find(function (session) { return session.id === id; });
  }

  function weekIndexForDate(date) {
    var diff = daysBetween(DATA.meta.startDate, date);
    return clamp(Math.floor(diff / 7), 0, state.weeks.length - 1);
  }

  function currentProgramDate() {
    return clampDate(todayISO());
  }

  function latestPrediction() {
    return state.predictions.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    })[0];
  }

  function notify(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove("show"); }, 2400);
  }

  function showTab(name) {
    document.querySelectorAll(".panel").forEach(function (panel) {
      panel.classList.toggle("active", panel.id === name);
    });
    document.querySelectorAll(".tab").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-tab") === name);
    });
    window.scrollTo(0, 0);
  }

  function renderHero() {
    var now = todayISO();
    var totalDays = Math.max(1, daysBetween(DATA.meta.startDate, DATA.meta.raceDate));
    var elapsed = clamp(daysBetween(DATA.meta.startDate, now), 0, totalDays);
    var daysLeft = daysBetween(now, DATA.meta.raceDate);
    var label;

    if (daysLeft > 1) label = daysLeft + " dagar att";
    else if (daysLeft === 1) label = "1 dag att";
    else if (daysLeft === 0) label = "Løpsdag!";
    else label = "Løpet er gjennomført";

    document.getElementById("countdown-label").textContent = label;
    document.getElementById("countdown-bar").style.width = Math.round(elapsed / totalDays * 100) + "%";
    document.getElementById("hero-garmin").textContent = formatMinutes(latestPrediction().minutes);
  }

  function sessionCheckKey(id) {
    return "session|" + id;
  }

  function mealCheckKey(date, mealId) {
    return "meal|" + date + "|" + mealId;
  }

  function resultSummary(session) {
    var result = state.results[session.id];
    if (!result) return "";
    var bits = [];
    if (result.distance) bits.push(String(result.distance).replace(".", ",") + " km");
    if (result.duration) bits.push(formatMinutes(result.duration));
    if (result.duration && result.distance) bits.push(formatPace(result.duration, result.distance));
    if (result.avgHr) bits.push(result.avgHr + " snittpuls");
    if (result.rpe) bits.push("RPE " + result.rpe);
    if (result.testTime) bits.push("10 km: " + formatMinutes(result.testTime));
    if (!bits.length && !result.note) return "";
    return "<div class='meal-meta'><span class='chip green'>" + esc(bits.join(" · ") || "Resultat lagra") + "</span></div>" +
      (result.note ? "<div class='tiny' style='margin-top:7px'>" + esc(result.note) + "</div>" : "");
  }

  function sessionHTML(session, compact) {
    var checked = !!state.checks[sessionCheckKey(session.id)];
    var result = state.results[session.id] || {};
    var typeClass = session.type === "easy" ? "" : " " + session.type;
    var editorId = "edit-" + session.id;
    var resultId = "result-" + session.id;
    var steps = compact ? "" : "<ul class='steps'>" + session.steps.map(function (step) {
      return "<li>" + esc(step) + "</li>";
    }).join("") + "</ul>";
    var purpose = compact ? "" : "<p class='tiny' style='margin:9px 0 0 42px'><strong>Føremål:</strong> " + esc(session.purpose) + "</p>";

    var testField = session.benchmark
      ? "<label class='field'>Tid på sjølve 10 km-testen<input id='" + resultId + "-test' type='text' inputmode='numeric' placeholder='00:59:30' value='" + esc(result.testTime ? formatMinutes(result.testTime) : "") + "'></label>"
      : "";

    var resultEditor =
      "<div id='" + resultId + "' class='editor'>" +
        "<div class='form-grid three'>" +
          "<label class='field'>Distanse (km)<input id='" + resultId + "-distance' type='number' min='0' step='0.01' value='" + esc(result.distance || "") + "'></label>" +
          "<label class='field'>Total tid<input id='" + resultId + "-duration' type='text' inputmode='numeric' placeholder='01:02:30' value='" + esc(result.duration ? formatMinutes(result.duration) : "") + "'></label>" +
          "<label class='field'>Snittpuls<input id='" + resultId + "-hr' type='number' min='0' max='240' value='" + esc(result.avgHr || "") + "'></label>" +
        "</div>" +
        "<div class='form-grid'>" +
          "<label class='field'>RPE 1–10<input id='" + resultId + "-rpe' type='number' min='1' max='10' value='" + esc(result.rpe || "") + "'></label>" +
          testField +
        "</div>" +
        "<label class='field'>Notat<textarea id='" + resultId + "-note' placeholder='Korleis kjendes økta?'>" + esc(result.note || "") + "</textarea></label>" +
        "<button class='btn green' onclick=\"Anita.saveResult('" + session.id + "')\">Lagre resultat</button> " +
        (state.results[session.id] ? "<button class='btn danger' onclick=\"Anita.clearResult('" + session.id + "')\">Fjern resultat</button>" : "") +
      "</div>";

    var workoutEditor =
      "<div id='" + editorId + "' class='editor'>" +
        "<label class='field'>Namn<input id='" + editorId + "-name' type='text' value='" + esc(session.name) + "'></label>" +
        "<div class='form-grid'>" +
          "<label class='field'>Dato<input id='" + editorId + "-date' type='date' value='" + esc(session.date) + "'></label>" +
          "<label class='field'>Kort samandrag<input id='" + editorId + "-summary' type='text' value='" + esc(session.summary) + "'></label>" +
        "</div>" +
        "<label class='field'>Føremål<input id='" + editorId + "-purpose' type='text' value='" + esc(session.purpose) + "'></label>" +
        "<label class='field'>Eitt punkt per linje<textarea id='" + editorId + "-steps'>" + esc(session.steps.join("\n")) + "</textarea></label>" +
        "<button class='btn green' onclick=\"Anita.saveWorkout('" + session.id + "')\">Lagre økt</button>" +
      "</div>";

    return "<article class='session" + (checked ? " done" : "") + "'>" +
      "<div class='session-main'>" +
        "<input type='checkbox' aria-label='Fullfør økt' " + (checked ? "checked" : "") + " onchange=\"Anita.toggleSession('" + session.id + "',this.checked)\">" +
        "<div>" +
          "<div class='session-topline'><span class='type-badge" + typeClass + "'>" + esc(session.typeLabel) + "</span><span class='tiny'>" + esc(formatShortDate(session.date)) + "</span></div>" +
          "<strong class='session-title'>" + esc(session.day + ": " + session.name) + "</strong>" +
          "<span class='session-summary'>" + esc(session.summary) + "</span>" +
          resultSummary(session) +
        "</div>" +
      "</div>" +
      steps + purpose +
      "<div class='session-actions'>" +
        "<button class='btn small' onclick=\"Anita.toggleEditor('" + resultId + "')\">Logg resultat</button>" +
        "<button class='btn small alt' onclick=\"Anita.toggleEditor('" + editorId + "')\">Rediger økt</button>" +
      "</div>" +
      resultEditor + workoutEditor +
    "</article>";
  }

  function mealPlanForDate(date) {
    if (state.raceMeals[date]) return { kind: "race", key: date, plan: state.raceMeals[date] };
    var day = parseISO(date).getDay();
    var mondayIndex = (day + 6) % 7;
    return { kind: "standard", key: String(mondayIndex), plan: state.meals[mondayIndex] };
  }

  function mealTotals(plan, date) {
    var plannedKcal = 0;
    var plannedProtein = 0;
    var eatenKcal = 0;
    var eatenProtein = 0;

    plan.meals.forEach(function (meal) {
      plannedKcal += Number(meal.kcal) || 0;
      plannedProtein += Number(meal.protein) || 0;
      if (state.checks[mealCheckKey(date, meal.id)]) {
        eatenKcal += Number(meal.kcal) || 0;
        eatenProtein += Number(meal.protein) || 0;
      }
    });

    return {
      plannedKcal: plannedKcal,
      plannedProtein: plannedProtein,
      eatenKcal: eatenKcal,
      eatenProtein: eatenProtein
    };
  }

  function mealBars(plan, date) {
    var totals = mealTotals(plan, date);
    var kcalPercent = totals.plannedKcal ? Math.round(totals.eatenKcal / totals.plannedKcal * 100) : 0;
    var proteinPercent = totals.plannedProtein ? Math.round(totals.eatenProtein / totals.plannedProtein * 100) : 0;

    return "<div class='metric'>" +
      "<div class='metric-line'><strong>" + totals.eatenKcal + " / " + totals.plannedKcal + " kcal</strong><span>" + kcalPercent + "% av menyen</span></div>" +
      "<div class='bar'><div style='width:" + clamp(kcalPercent, 0, 100) + "%'></div></div>" +
      "</div>" +
      "<div class='metric'>" +
      "<div class='metric-line'><strong>" + totals.eatenProtein + " / " + totals.plannedProtein + " g protein</strong><span>" + proteinPercent + "% av menyen</span></div>" +
      "<div class='bar blue'><div style='width:" + clamp(proteinPercent, 0, 100) + "%'></div></div>" +
      "</div>";
  }

  function mealHTML(meal, date, kind, key, index, editable) {
    var checked = !!state.checks[mealCheckKey(date, meal.id)];
    var editorId = "meal-" + kind + "-" + String(key).replace(/[^a-z0-9]/gi, "-") + "-" + index;
    var editor = "";

    if (editable) {
      editor =
        "<div id='" + editorId + "' class='editor' style='margin-left:0'>" +
          "<label class='field'>Måltid<input id='" + editorId + "-text' type='text' value='" + esc(meal.text) + "'></label>" +
          "<div class='form-grid'>" +
            "<label class='field'>Kcal<input id='" + editorId + "-kcal' type='number' min='0' value='" + esc(meal.kcal) + "'></label>" +
            "<label class='field'>Protein (g)<input id='" + editorId + "-protein' type='number' min='0' value='" + esc(meal.protein) + "'></label>" +
          "</div>" +
          "<button class='btn green' onclick=\"Anita.saveMeal('" + kind + "','" + key + "'," + index + ",'" + editorId + "')\">Lagre måltid</button>" +
        "</div>";
    }

    return "<div class='meal'>" +
      "<input type='checkbox' aria-label='Måltid ete' " + (checked ? "checked" : "") + " onchange=\"Anita.toggleMeal('" + date + "','" + meal.id + "',this.checked)\">" +
      "<div>" +
        "<div class='headrow'><strong>" + esc(meal.name) + "</strong>" +
          (editable ? "<button class='btn small alt' onclick=\"Anita.toggleEditor('" + editorId + "')\">Endre</button>" : "") +
        "</div>" +
        "<div class='meal-copy'>" + esc(meal.text) + "</div>" +
        "<div class='meal-meta'><span class='chip'>≈ " + esc(meal.kcal) + " kcal</span><span class='chip blue'>≈ " + esc(meal.protein) + " g protein</span></div>" +
        editor +
      "</div>" +
    "</div>";
  }

  function renderToday() {
    var date = state.selectedDate;
    var weekIndex = weekIndexForDate(date);
    var week = state.weeks[weekIndex];
    var sessions = allSessions().filter(function (session) { return session.date === date; });
    var mealInfo = mealPlanForDate(date);
    var nextSession = allSessions().find(function (session) { return session.date > date; });
    var workoutContent;

    if (sessions.length) {
      workoutContent = sessions.map(function (session) { return sessionHTML(session, false); }).join("");
    } else {
      workoutContent = "<p class='muted'>Ingen planlagd økt denne dagen.</p>";
      if (nextSession) {
        workoutContent += "<div class='notice'>Neste økt er " + esc(formatDate(nextSession.date, false)) + ": <strong>" + esc(nextSession.name) + "</strong>.</div>";
      }
    }

    var meals = mealInfo.plan.meals.map(function (meal, index) {
      return mealHTML(meal, date, mealInfo.kind, mealInfo.key, index, false);
    }).join("");

    document.getElementById("today").innerHTML =
      "<div class='card accent'>" +
        "<span class='week-kicker'>VEKE " + week.week + " · " + esc(week.phase.toUpperCase()) + "</span>" +
        "<div class='day-title'>" + esc(formatDate(date, false)) + "</div>" +
        "<div class='date-control'>" +
          "<button class='btn icon alt' aria-label='Førre dag' onclick='Anita.moveDate(-1)'>‹</button>" +
          "<input type='date' min='" + DATA.meta.startDate + "' max='" + DATA.meta.raceDate + "' value='" + date + "' onchange='Anita.selectDate(this.value)'>" +
          "<button class='btn icon alt' aria-label='Neste dag' onclick='Anita.moveDate(1)'>›</button>" +
        "</div>" +
      "</div>" +
      "<div class='card'><div class='section-head'><div><h2>Dagens økt</h2><p class='tiny'>Huk av eller logg data etter trening.</p></div></div>" + workoutContent + "</div>" +
      "<div class='card'><div class='section-head'><div><h2>Dagens mat</h2><p class='tiny'>" + esc(mealInfo.plan.focus) + "</p></div></div>" +
        mealBars(mealInfo.plan, date) + meals +
      "</div>";
  }

  function renderTraining() {
    var currentIndex = weekIndexForDate(currentProgramDate());
    var zones =
      "<div class='card blue'><div class='section-head'><div><h2>Fartsguide</h2><p class='tiny'>Bruk både fart og kjensle. Bakkar, vind og dagsform kan krevja lågare fart.</p></div></div>" +
      "<table class='pace-table'><thead><tr><th>Type</th><th>Intensitet</th><th>Fart</th></tr></thead><tbody>" +
      DATA.paceZones.map(function (zone) {
        return "<tr><td><strong>" + esc(zone.name) + "</strong></td><td>" + esc(zone.effort) + "</td><td>" + esc(zone.pace) + "</td></tr>";
      }).join("") +
      "</tbody></table></div>";

    var weeks = state.weeks.map(function (week, index) {
      var done = week.sessions.filter(function (session) { return state.checks[sessionCheckKey(session.id)]; }).length;
      var runCount = week.sessions.filter(function (session) { return session.run; }).length;
      return "<details class='week-card' " + (index === currentIndex ? "open" : "") + ">" +
        "<summary><div class='week-head'>" +
          "<div class='week-title'><span class='pill'>" + week.week + "</span><div><h2>" + esc(week.phase) + "</h2><p>" + esc(week.dates) + " · " + runCount + " løpeøkter · ca. " + String(week.plannedKm).replace(".", ",") + " km</p></div></div>" +
          "<span class='pill'>" + done + "/" + week.sessions.length + "</span>" +
        "</div></summary>" +
        "<div class='week-body'>" + week.sessions.map(function (session) { return sessionHTML(session, false); }).join("") + "</div>" +
      "</details>";
    }).join("");

    document.getElementById("training").innerHTML =
      "<div class='card accent'><h2>Plan fram mot 2:10</h2><p class='lead'>Fire løpeøkter i kvar full veke: éi kvalitetsøkt, to rolege turar og éin langtur. Styrken er lagd slik at han støttar løpinga.</p><div class='notice'>Rolige økter skal vera rolege. Det er nøkkelen til å tåla målfartsarbeidet og møta løpet med overskot.</div></div>" +
      zones + weeks;
  }

  function actualDistanceForWeek(week) {
    var first = week.sessions.map(function (session) { return session.date; }).sort()[0];
    var last = week.sessions.map(function (session) { return session.date; }).sort().slice(-1)[0];
    var activities = state.activities.filter(function (activity) {
      return activity.date >= first && activity.date <= last;
    });

    if (activities.length) {
      return activities.reduce(function (sum, activity) { return sum + (Number(activity.distance) || 0); }, 0);
    }

    return week.sessions.reduce(function (sum, session) {
      var result = state.results[session.id];
      return sum + (result && result.distance ? Number(result.distance) : 0);
    }, 0);
  }

  function getBenchmarkPrediction() {
    var result = state.results["w4-sun"];
    if (!result || !result.testTime) return null;
    return result.testTime * Math.pow(21.0975 / 10, 1.06);
  }

  function progressStatus() {
    var progressDate = currentProgramDate();
    var sessions = allSessions();
    var dueRuns = sessions.filter(function (session) { return session.run && session.date <= progressDate; });
    var completedRuns = dueRuns.filter(function (session) { return state.checks[sessionCheckKey(session.id)]; });
    var dueKeys = dueRuns.filter(function (session) { return session.key; });
    var completedKeys = dueKeys.filter(function (session) { return state.checks[sessionCheckKey(session.id)]; });
    var adherence = dueRuns.length ? completedRuns.length / dueRuns.length : 1;
    var keyRate = dueKeys.length ? completedKeys.length / dueKeys.length : 1;

    var totalDays = daysBetween(DATA.meta.startDate, DATA.meta.raceDate);
    var elapsed = clamp(daysBetween(DATA.meta.startDate, progressDate), 0, totalDays);
    var timeline = elapsed / totalDays;
    var expectedPrediction = DATA.meta.baselineGarminMinutes +
      (DATA.meta.targetMinutes - DATA.meta.baselineGarminMinutes) * timeline;
    var latest = latestPrediction();
    var predictorGap = latest.minutes - expectedPrediction;
    var predictorScore = clamp(100 - Math.max(0, predictorGap) * 11, 20, 100);

    var benchmarkPrediction = getBenchmarkPrediction();
    if (benchmarkPrediction) {
      var benchmarkScore = clamp(100 - Math.max(0, benchmarkPrediction - DATA.meta.targetMinutes) * 10, 20, 100);
      predictorScore = predictorScore * 0.6 + benchmarkScore * 0.4;
    }

    var longest = DATA.meta.baselineLongestRunKm;
    state.activities.forEach(function (activity) { longest = Math.max(longest, Number(activity.distance) || 0); });
    Object.keys(state.results).forEach(function (key) {
      longest = Math.max(longest, Number(state.results[key].distance) || 0);
    });
    var longScore = clamp(longest / 20 * 100, 0, 100);
    var score = Math.round(predictorScore * 0.35 + adherence * 100 * 0.30 + keyRate * 100 * 0.20 + longScore * 0.15);
    var label;
    var detail;

    if (dueRuns.length < 2) {
      label = "Startpunkt registrert";
      detail = "Me treng nokre gjennomførte økter og ei ny Garmin-prognose før vurderinga blir presis.";
    } else if (score >= 84) {
      label = "Godt i rute";
      detail = "Treninga og indikatorane peikar i rett retning. Hald dei rolege dagane lette.";
    } else if (score >= 70) {
      label = "På veg mot målet";
      detail = "Målet er realistisk, men nøkkeløktene og utviklinga dei neste vekene blir viktige.";
    } else if (score >= 55) {
      label = "Målet lever";
      detail = "Nokre signal ligg etter planen. Ikkje kompenser med ekstra harde økter; juster etter kontrolltesten.";
    } else {
      label = "Planen bør vurderast";
      detail = "Dataa peikar ikkje tydeleg mot 2:10 enno. Prioriter kontinuitet og vurder tryggare løpsfart.";
    }

    return {
      score: score,
      label: label,
      detail: detail,
      adherence: adherence,
      keyRate: keyRate,
      dueRuns: dueRuns.length,
      completedRuns: completedRuns.length,
      latest: latest,
      expectedPrediction: expectedPrediction,
      longest: longest,
      benchmarkPrediction: benchmarkPrediction
    };
  }

  function renderProgress() {
    var status = progressStatus();
    var weekRows = state.weeks.map(function (week) {
      var actual = actualDistanceForWeek(week);
      var percent = week.plannedKm ? clamp(Math.round(actual / week.plannedKm * 100), 0, 100) : 0;
      return "<div class='week-bar-row'><strong>Veke " + week.week + "</strong><div class='bar blue'><div style='width:" + percent + "%'></div></div><span>" +
        (actual ? actual.toFixed(1).replace(".", ",") : "0") + "/" + String(week.plannedKm).replace(".", ",") + " km</span></div>";
    }).join("");

    var benchmarkText = status.benchmarkPrediction
      ? "<div class='factor'><span>10 km-test gir halvmaratonestimat</span><strong>" + formatMinutes(status.benchmarkPrediction) + "</strong></div>"
      : "<div class='factor'><span>10 km-kontrolltest</span><strong>11. oktober</strong></div>";

    var predictions = state.predictions.slice().sort(function (a, b) { return b.date.localeCompare(a.date); }).map(function (prediction) {
      return "<div class='prediction-item'><div><strong>" + esc(formatShortDate(prediction.date)) + "</strong>" +
        (prediction.vo2max ? "<div class='tiny'>VO2-maks " + esc(prediction.vo2max) + "</div>" : "") +
        "</div><strong>" + formatMinutes(prediction.minutes) + "</strong>" +
        (prediction.id !== "baseline" ? "<button class='btn small danger' onclick=\"Anita.removePrediction('" + prediction.id + "')\">Fjern</button>" : "<span></span>") +
      "</div>";
    }).join("");

    var activities = state.activities.slice().sort(function (a, b) { return b.date.localeCompare(a.date); }).slice(0, 12).map(function (activity) {
      return "<div class='activity-item'><div><div class='activity-name'>" + esc(activity.title || "Løping") + "</div><div class='activity-meta'>" +
        esc(formatShortDate(activity.date)) + " · " + Number(activity.distance).toFixed(2).replace(".", ",") + " km · " +
        (activity.duration ? formatMinutes(activity.duration) + " · " + formatPace(activity.duration, activity.distance) : "tid manglar") +
        (activity.avgHr ? " · " + activity.avgHr + " puls" : "") +
        "</div></div><button class='btn small danger' onclick=\"Anita.removeActivity('" + activity.id + "')\">Fjern</button></div>";
    }).join("");

    if (!activities) activities = "<p class='muted'>Ingen Garmin-aktivitetar er importerte enno.</p>";

    var lastImport = state.lastImport
      ? "<p class='success-note'>Sist importert " + esc(formatShortDate(state.lastImport.date)) + ": " + esc(state.lastImport.count) + " nye løpeøkter.</p>"
      : "";

    document.getElementById("progress").innerHTML =
      "<div class='card accent'><div class='section-head'><div><h2>Ligg ho i rute?</h2><p class='tiny'>Samla vurdering – ikkje ein garanti.</p></div><span class='pill'>" + status.score + "/100</span></div>" +
        "<div class='status-box'><div class='score-ring' style='--score:" + status.score + "%'><strong>" + status.score + "</strong></div><div><h3>" + esc(status.label) + "</h3><p class='tiny' style='margin:5px 0 0'>" + esc(status.detail) + "</p></div></div>" +
        "<div class='factor-list'>" +
          "<div class='factor'><span>Gjennomførte løpeøkter</span><strong>" + status.completedRuns + "/" + status.dueRuns + "</strong></div>" +
          "<div class='factor'><span>Gjennomførte nøkkeløkter</span><strong>" + Math.round(status.keyRate * 100) + "%</strong></div>" +
          "<div class='factor'><span>Nyaste Garmin-prognose</span><strong>" + formatMinutes(status.latest.minutes) + "</strong></div>" +
          "<div class='factor'><span>Forventa prognose no</span><strong>ca. " + formatMinutes(status.expectedPrediction) + "</strong></div>" +
          "<div class='factor'><span>Lengste registrerte tur</span><strong>" + String(status.longest).replace(".", ",") + " km</strong></div>" +
          benchmarkText +
        "</div>" +
      "</div>" +

      "<div class='card'><h2>Vekekilometer</h2><p class='tiny'>Garmin-data blir brukte når dei finst. Elles blir manuelt logga distanse brukt.</p><div class='week-bars' style='margin-top:15px'>" + weekRows + "</div></div>" +

      "<div class='card blue'><h2>Kontrollpunkt for 2:10</h2>" +
        "<div class='factor-list'>" +
          "<div class='factor'><span>Fire jamne løpeøkter per full veke</span><strong>Kontinuitet</strong></div>" +
          "<div class='factor'><span>10 km kontrolløp</span><strong>≈ 59:30</strong></div>" +
          "<div class='factor'><span>20 km med 5 km i målfart</span><strong>Kontrollert</strong></div>" +
          "<div class='factor'><span>6 km i målfart 25. oktober</span><strong>RPE 6–7</strong></div>" +
          "<div class='factor'><span>Garmin-prognose</span><strong>Trend mot 2:10</strong></div>" +
        "</div>" +
      "</div>" +

      "<div class='card'><div class='section-head'><div><h2>Garmin-prognose</h2><p class='tiny'>Legg inn ny prognose når Garmin endrar henne.</p></div></div>" +
        "<div class='form-grid three'>" +
          "<label class='field'>Dato<input id='prediction-date' type='date' value='" + clampDate(todayISO()) + "'></label>" +
          "<label class='field'>Halvmaraton<input id='prediction-time' type='text' inputmode='numeric' placeholder='2:19' value='" + formatMinutes(status.latest.minutes) + "'></label>" +
          "<label class='field'>VO2-maks, valfritt<input id='prediction-vo2' type='number' min='1' max='100' step='0.1' value=''></label>" +
        "</div><button class='btn green' style='margin-top:10px' onclick='Anita.addPrediction()'>Lagre Garmin-tal</button>" +
        "<div style='margin-top:12px'>" + predictions + "</div>" +
      "</div>" +

      "<div class='card'><h2>Importer Garmin-aktivitetar</h2>" +
        "<p class='lead'>Eksporter aktivitetslista som CSV frå Garmin Connect på nett og vel fila her. Alt blir behandla lokalt på telefonen eller PC-en.</p>" +
        "<label class='field'>Garmin CSV<input id='garmin-file' type='file' accept='.csv,text/csv' onchange='Anita.importGarmin(this.files[0])'></label>" +
        lastImport +
        "<p class='tiny'><a href='https://support.garmin.com/en-US/?faq=W1TvTPW8JZ6LfJSfK512Q8' target='_blank' rel='noopener'>Opne Garmin si offisielle eksportrettleiing</a>. Bruk metrisk visning slik at distansen kjem i kilometer.</p>" +
        "<div class='notice'>Appen spør aldri etter Garmin-passord. Automatisk direktesynk krev Garmin sitt bedriftsprogram, OAuth og ein eigen server.</div>" +
      "</div>" +

      "<div class='card'><h2>Legg inn løpeøkt manuelt</h2>" +
        "<div class='form-grid three'>" +
          "<label class='field'>Dato<input id='activity-date' type='date' value='" + clampDate(todayISO()) + "'></label>" +
          "<label class='field'>Distanse km<input id='activity-distance' type='number' min='0' step='0.01'></label>" +
          "<label class='field'>Tid<input id='activity-duration' type='text' inputmode='numeric' placeholder='01:00:00'></label>" +
        "</div>" +
        "<div class='form-grid'>" +
          "<label class='field'>Snittpuls, valfritt<input id='activity-hr' type='number' min='0' max='240'></label>" +
          "<label class='field'>Namn<input id='activity-title' type='text' value='Løping'></label>" +
        "</div>" +
        "<button class='btn green' style='margin-top:10px' onclick='Anita.addActivity()'>Legg til aktivitet</button>" +
        "<div style='margin-top:12px'>" + activities + "</div>" +
      "</div>" +

      "<div class='card'><h2>Løpsstrategi</h2><table class='pace-table'><thead><tr><th>Del</th><th>Fokus</th><th>Fart</th></tr></thead><tbody>" +
        DATA.raceStrategy.map(function (row) {
          return "<tr><td><strong>" + esc(row.section) + "</strong></td><td>" + esc(row.cue) + "</td><td>" + esc(row.pace) + "</td></tr>";
        }).join("") +
      "</tbody></table></div>";
  }

  function dateForMealDay(week, dayIndex) {
    var monday = week.sessions.map(function (session) { return session.date; }).sort()[0];
    return addDays(monday, dayIndex);
  }

  function foodDayCard(plan, date, kind, key, index, open) {
    return "<details class='week-card' " + (open ? "open" : "") + ">" +
      "<summary><div class='week-head'><div class='week-title'><span class='pill'>" + esc(plan.day.slice(0, 3)) + "</span><div><h2>" + esc(plan.day) + "</h2><p>" + esc(plan.focus) + " · " + esc(formatShortDate(date)) + "</p></div></div><span class='pill'>≈ " + mealTotals(plan, date).plannedKcal + " kcal</span></div></summary>" +
      "<div class='week-body'>" + mealBars(plan, date) +
        plan.meals.map(function (meal, mealIndex) {
          return mealHTML(meal, date, kind, key, mealIndex, true);
        }).join("") +
      "</div></details>";
  }

  function renderFood() {
    var selectedWeek = state.weeks[weekIndexForDate(state.selectedDate)];
    var selectedDay = (parseISO(state.selectedDate).getDay() + 6) % 7;
    var normalDays = state.meals.map(function (plan, index) {
      return foodDayCard(plan, dateForMealDay(selectedWeek, index), "standard", String(index), index, index === selectedDay);
    }).join("");

    var raceDays = Object.keys(state.raceMeals).sort().map(function (date) {
      return foodDayCard(state.raceMeals[date], date, "race", date, 0, date === state.selectedDate);
    }).join("");

    document.getElementById("food").innerHTML =
      "<div class='card accent'><h2>Mat for best mogleg framgang</h2><p class='lead'>Menyen prioriterer nok energi, karbohydrat rundt dei krevjande øktene og protein fordelt gjennom dagen. Det er ikkje lagt inn kaloriunderskot eller vektmål.</p>" +
        "<div class='notice'>Kcal og protein er overslag for den planlagde menyen, ikkje eit personleg medisinsk behov. Juster porsjonane etter svolt, energinivå og treningsmengde.</div>" +
      "</div>" +
      "<div class='card blue'><h2>Tre enkle reglar</h2><div class='factor-list'>" +
        "<div class='factor'><span>Før kvalitet og langtur</span><strong>Karbohydrat</strong></div>" +
        "<div class='factor'><span>Etter økt</span><strong>Mat innan 1–2 timar</strong></div>" +
        "<div class='factor'><span>Protein</span><strong>Fordelt på 4–5 måltid</strong></div>" +
        "<div class='factor'><span>Langtur og løp</span><strong>30–60 g karbo/time</strong></div>" +
      "</div></div>" +
      "<div class='card'><h2>Vanleg treningsveke</h2><p class='tiny'>Avhukingane under gjeld veke " + selectedWeek.week + ". Måltidsendringar blir brukte vidare i programmet.</p></div>" +
      normalDays +
      "<div class='card warning'><h2>Siste døgn og løpsdag</h2><p class='tiny'>Bruk berre mat, gel og sportsdrikk som er testa på førehand.</p></div>" +
      raceDays;
  }

  function renderShopping() {
    var categories = [];
    state.shopping.forEach(function (item) {
      if (categories.indexOf(item.category) < 0) categories.push(item.category);
    });

    var groups = categories.map(function (category) {
      var rows = state.shopping.filter(function (item) { return item.category === category; }).map(function (item) {
        return "<label class='shop-row'><input type='checkbox' " + (state.shopChecks[item.id] ? "checked" : "") +
          " onchange=\"Anita.toggleShop('" + item.id + "',this.checked)\"><span class='shop-name'>" + esc(item.name) + "</span><span class='shop-qty'>" +
          esc(item.qty) + (item.custom ? "<br><button type='button' class='btn small danger' onclick=\"event.preventDefault();Anita.removeShopItem('" + item.id + "')\">Fjern</button>" : "") +
          "</span></label>";
      }).join("");
      return "<div class='shop-group'><h3>" + esc(category) + "</h3>" + rows + "</div>";
    }).join("");

    var checkedCount = Object.keys(state.shopChecks).filter(function (key) { return state.shopChecks[key]; }).length;

    document.getElementById("shop").innerHTML =
      "<div class='card accent'><div class='section-head'><div><h2>Handleliste</h2><p class='tiny'>Alt finst normalt hos Coop Extra eller Kiwi.</p></div><span class='pill'>" + checkedCount + "/" + state.shopping.length + "</span></div>" +
        groups +
        "<button class='btn alt' style='margin-top:15px' onclick='Anita.clearShop()'>Fjern alle avhukingar</button>" +
      "</div>" +
      "<div class='card'><h2>Legg til vare</h2><div class='form-grid three'>" +
        "<label class='field'>Vare<input id='shop-name' type='text'></label>" +
        "<label class='field'>Mengde<input id='shop-qty' type='text'></label>" +
        "<label class='field'>Kategori<select id='shop-category'><option>Karbohydrat</option><option>Protein</option><option>Frukt og grønt</option><option>Løpsdrivstoff</option><option>Anna</option></select></label>" +
      "</div><button class='btn green' style='margin-top:10px' onclick='Anita.addShopItem()'>Legg til</button></div>";
  }

  function renderAll() {
    renderHero();
    renderToday();
    renderTraining();
    renderProgress();
    renderFood();
    renderShopping();
  }

  function toggleEditor(id) {
    var element = document.getElementById(id);
    if (element) element.classList.toggle("open");
  }

  function toggleSession(id, checked) {
    state.checks[sessionCheckKey(id)] = checked;
    persist();
    renderAll();
  }

  function toggleMeal(date, mealId, checked) {
    state.checks[mealCheckKey(date, mealId)] = checked;
    persist();
    renderAll();
  }

  function moveDate(amount) {
    state.selectedDate = clampDate(addDays(state.selectedDate, amount));
    persist();
    renderAll();
  }

  function selectDate(date) {
    state.selectedDate = clampDate(date);
    persist();
    renderAll();
  }

  function saveWorkout(id) {
    var session = getSession(id);
    var editorId = "edit-" + id;
    if (!session) return;
    session.name = document.getElementById(editorId + "-name").value.trim() || session.name;
    session.date = document.getElementById(editorId + "-date").value || session.date;
    session.summary = document.getElementById(editorId + "-summary").value.trim() || session.summary;
    session.purpose = document.getElementById(editorId + "-purpose").value.trim() || session.purpose;
    session.steps = document.getElementById(editorId + "-steps").value.split("\n").map(function (line) {
      return line.trim();
    }).filter(Boolean);
    persist();
    renderAll();
    notify("Økta er oppdatert");
  }

  function saveResult(id) {
    var prefix = "result-" + id;
    var distance = Number(document.getElementById(prefix + "-distance").value) || 0;
    var duration = parseTime(document.getElementById(prefix + "-duration").value);
    var avgHr = Number(document.getElementById(prefix + "-hr").value) || 0;
    var rpe = Number(document.getElementById(prefix + "-rpe").value) || 0;
    var note = document.getElementById(prefix + "-note").value.trim();
    var testInput = document.getElementById(prefix + "-test");
    var testTime = testInput ? parseTime(testInput.value) : 0;

    state.results[id] = {
      distance: distance,
      duration: duration,
      avgHr: avgHr,
      rpe: clamp(rpe, 0, 10),
      note: note,
      testTime: testTime
    };
    state.checks[sessionCheckKey(id)] = true;
    persist();
    renderAll();
    notify("Resultatet er lagra");
  }

  function clearResult(id) {
    delete state.results[id];
    persist();
    renderAll();
    notify("Resultatet er fjerna");
  }

  function saveMeal(kind, key, index, editorId) {
    var plan = kind === "race" ? state.raceMeals[key] : state.meals[Number(key)];
    if (!plan || !plan.meals[index]) return;
    var meal = plan.meals[index];
    meal.text = document.getElementById(editorId + "-text").value.trim() || meal.text;
    meal.kcal = Number(document.getElementById(editorId + "-kcal").value) || 0;
    meal.protein = Number(document.getElementById(editorId + "-protein").value) || 0;
    persist();
    renderAll();
    notify("Måltidet er oppdatert");
  }

  function addPrediction() {
    var date = document.getElementById("prediction-date").value;
    var minutes = parseTime(document.getElementById("prediction-time").value);
    var vo2max = document.getElementById("prediction-vo2").value;
    if (!date || minutes < 60 || minutes > 300) {
      notify("Skriv prognosen som til dømes 2:17");
      return;
    }
    state.predictions.push({
      id: "p-" + Date.now(),
      date: date,
      minutes: minutes,
      vo2max: vo2max
    });
    persist();
    renderAll();
    notify("Garmin-prognosen er lagra");
  }

  function removePrediction(id) {
    state.predictions = state.predictions.filter(function (item) { return item.id !== id; });
    persist();
    renderAll();
  }

  function parseLocalizedNumber(value) {
    var text = String(value || "").trim().replace(/\s/g, "").replace(/[^\d,.-]/g, "");
    if (!text) return 0;
    if (text.indexOf(",") >= 0 && text.indexOf(".") >= 0) {
      if (text.lastIndexOf(",") > text.lastIndexOf(".")) text = text.replace(/\./g, "").replace(",", ".");
      else text = text.replace(/,/g, "");
    } else if (text.indexOf(",") >= 0) {
      text = text.replace(",", ".");
    }
    var number = Number(text);
    return Number.isFinite(number) ? number : 0;
  }

  function normalizeHeader(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function detectDelimiter(text) {
    var firstLine = text.split(/\r?\n/)[0] || "";
    var options = [",", ";", "\t"];
    var best = ",";
    var bestCount = -1;
    options.forEach(function (delimiter) {
      var count = 0;
      var quoted = false;
      for (var i = 0; i < firstLine.length; i += 1) {
        if (firstLine[i] === "\"") quoted = !quoted;
        else if (!quoted && firstLine[i] === delimiter) count += 1;
      }
      if (count > bestCount) { bestCount = count; best = delimiter; }
    });
    return best;
  }

  function parseCSV(text) {
    var delimiter = detectDelimiter(text);
    var rows = [];
    var row = [];
    var field = "";
    var quoted = false;

    for (var i = 0; i < text.length; i += 1) {
      var char = text[i];
      var next = text[i + 1];
      if (char === "\"" && quoted && next === "\"") {
        field += "\"";
        i += 1;
      } else if (char === "\"") {
        quoted = !quoted;
      } else if (char === delimiter && !quoted) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") i += 1;
        row.push(field);
        if (row.some(function (cell) { return cell.trim() !== ""; })) rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
    row.push(field);
    if (row.some(function (cell) { return cell.trim() !== ""; })) rows.push(row);
    return rows;
  }

  function findColumn(headers, candidates) {
    for (var i = 0; i < candidates.length; i += 1) {
      var exact = headers.indexOf(candidates[i]);
      if (exact >= 0) return exact;
    }
    for (var j = 0; j < candidates.length; j += 1) {
      var partial = headers.findIndex(function (header) { return header.indexOf(candidates[j]) >= 0; });
      if (partial >= 0) return partial;
    }
    return -1;
  }

  function parseGarminDate(value) {
    var text = String(value || "").trim();
    var match = text.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) return match[1] + "-" + match[2].padStart(2, "0") + "-" + match[3].padStart(2, "0");
    match = text.match(/(\d{1,2})[.\/](\d{1,2})[.\/](\d{4})/);
    if (match) return match[3] + "-" + match[2].padStart(2, "0") + "-" + match[1].padStart(2, "0");
    var parsed = new Date(text);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.getFullYear() + "-" + String(parsed.getMonth() + 1).padStart(2, "0") + "-" + String(parsed.getDate()).padStart(2, "0");
    }
    return "";
  }

  function isRunningType(value) {
    var type = normalizeHeader(value);
    return !type || ["run", "running", "lop", "loping", "jog", "treadmill", "trail"].some(function (word) {
      return type.indexOf(word) >= 0;
    });
  }

  function makeId(seed) {
    var hash = 0;
    for (var i = 0; i < seed.length; i += 1) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
    return "a-" + Math.abs(hash);
  }

  function matchActivityToPlan(activity) {
    var candidates = allSessions().filter(function (session) {
      return session.run && session.date === activity.date;
    });
    if (!candidates.length) return;
    var session = candidates[0];
    state.checks[sessionCheckKey(session.id)] = true;
    if (!state.results[session.id]) {
      state.results[session.id] = {
        distance: activity.distance,
        duration: activity.duration,
        avgHr: activity.avgHr,
        rpe: 0,
        note: "Importert frå Garmin CSV",
        testTime: 0
      };
    }
  }

  async function importGarmin(file) {
    if (!file) return;
    try {
      var text = await file.text();
      var rows = parseCSV(text);
      if (rows.length < 2) throw new Error("Fila har ingen aktivitetar");
      var headers = rows[0].map(normalizeHeader);
      var dateIndex = findColumn(headers, ["date", "dato", "start time", "starttid"]);
      var typeIndex = findColumn(headers, ["activity type", "aktivitetstype", "type"]);
      var titleIndex = findColumn(headers, ["title", "tittel", "activity name", "aktivitetsnamn"]);
      var distanceIndex = findColumn(headers, ["distance", "distanse"]);
      var durationIndex = findColumn(headers, ["time", "tid", "duration", "varighet", "elapsed time"]);
      var hrIndex = findColumn(headers, ["avg hr", "snittpuls", "average heart rate", "gj sn puls", "gjennomsnittspuls"]);

      if (dateIndex < 0 || distanceIndex < 0) throw new Error("Fann ikkje kolonnane Dato og Distanse");

      var existing = {};
      state.activities.forEach(function (activity) { existing[activity.id] = true; });
      var imported = [];

      rows.slice(1).forEach(function (row) {
        if (typeIndex >= 0 && !isRunningType(row[typeIndex])) return;
        var date = parseGarminDate(row[dateIndex]);
        var distance = parseLocalizedNumber(row[distanceIndex]);
        if (!date || !distance) return;
        var duration = durationIndex >= 0 ? parseTime(row[durationIndex]) : 0;
        var avgHr = hrIndex >= 0 ? Math.round(parseLocalizedNumber(row[hrIndex])) : 0;
        var title = titleIndex >= 0 ? row[titleIndex] : "Garmin-løping";
        var id = makeId([date, distance.toFixed(3), duration.toFixed(3), title].join("|"));
        if (existing[id]) return;

        var activity = {
          id: id,
          date: date,
          distance: distance,
          duration: duration,
          avgHr: avgHr,
          title: title || "Garmin-løping",
          source: "Garmin CSV"
        };
        imported.push(activity);
        existing[id] = true;
        matchActivityToPlan(activity);
      });

      state.activities = state.activities.concat(imported);
      state.lastImport = { date: todayISO(), count: imported.length };
      persist();
      renderAll();
      notify(imported.length + " nye Garmin-økter importerte");
    } catch (error) {
      notify("Importen stoppa: " + error.message);
    } finally {
      var input = document.getElementById("garmin-file");
      if (input) input.value = "";
    }
  }

  function addActivity() {
    var date = document.getElementById("activity-date").value;
    var distance = Number(document.getElementById("activity-distance").value) || 0;
    var duration = parseTime(document.getElementById("activity-duration").value);
    var avgHr = Number(document.getElementById("activity-hr").value) || 0;
    var title = document.getElementById("activity-title").value.trim() || "Løping";
    if (!date || distance <= 0) {
      notify("Legg inn dato og distanse");
      return;
    }
    var activity = {
      id: "manual-" + Date.now(),
      date: date,
      distance: distance,
      duration: duration,
      avgHr: avgHr,
      title: title,
      source: "Manuell"
    };
    state.activities.push(activity);
    matchActivityToPlan(activity);
    persist();
    renderAll();
    notify("Løpeøkta er lagra");
  }

  function removeActivity(id) {
    state.activities = state.activities.filter(function (activity) { return activity.id !== id; });
    persist();
    renderAll();
  }

  function toggleShop(id, checked) {
    state.shopChecks[id] = checked;
    persist();
    renderShopping();
  }

  function clearShop() {
    state.shopChecks = {};
    persist();
    renderShopping();
    notify("Handlelista er nullstilt");
  }

  function addShopItem() {
    var name = document.getElementById("shop-name").value.trim();
    var qty = document.getElementById("shop-qty").value.trim();
    var category = document.getElementById("shop-category").value;
    if (!name) {
      notify("Skriv inn ei vare");
      return;
    }
    state.shopping.push({
      id: "custom-" + Date.now(),
      category: category,
      name: name,
      qty: qty || "etter behov",
      custom: true
    });
    persist();
    renderShopping();
    notify("Vara er lagd til");
  }

  function removeShopItem(id) {
    state.shopping = state.shopping.filter(function (item) { return item.id !== id; });
    delete state.shopChecks[id];
    persist();
    renderShopping();
  }

  window.Anita = {
    showTab: showTab,
    toggleEditor: toggleEditor,
    toggleSession: toggleSession,
    toggleMeal: toggleMeal,
    moveDate: moveDate,
    selectDate: selectDate,
    saveWorkout: saveWorkout,
    saveResult: saveResult,
    clearResult: clearResult,
    saveMeal: saveMeal,
    addPrediction: addPrediction,
    removePrediction: removePrediction,
    importGarmin: importGarmin,
    addActivity: addActivity,
    removeActivity: removeActivity,
    toggleShop: toggleShop,
    clearShop: clearShop,
    addShopItem: addShopItem,
    removeShopItem: removeShopItem
  };

  async function init() {
    var saved = await loadSavedState();
    state = mergeState(saved);

    document.querySelectorAll(".tab").forEach(function (button) {
      button.addEventListener("click", function () {
        showTab(button.getAttribute("data-tab"));
      });
    });

    renderAll();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(function (error) {
        console.warn("Service worker kunne ikkje registrerast", error);
      });
    }
  }

  init();
})();
