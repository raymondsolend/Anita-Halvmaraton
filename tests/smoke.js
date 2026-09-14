"use strict";

var elements = {};
function fakeElement() {
  return {
    innerHTML: "",
    textContent: "",
    value: "",
    style: {},
    classList: {
      add: function () {},
      remove: function () {},
      toggle: function () {}
    },
    addEventListener: function () {}
  };
}

global.window = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  scrollTo: function () {}
};
Object.defineProperty(globalThis, "navigator", { value: {}, configurable: true });
global.localStorage = {
  getItem: function () { return null; },
  setItem: function () {}
};
global.document = {
  body: fakeElement(),
  getElementById: function (id) {
    if (!elements[id]) elements[id] = fakeElement();
    return elements[id];
  },
  querySelectorAll: function () { return []; }
};

require("../data.js");
require("../app.js");

setTimeout(function () {
  ["today", "training", "progress", "food", "shop"].forEach(function (id) {
    if (!elements[id] || !elements[id].innerHTML) {
      throw new Error("Panelet " + id + " vart ikkje rendra");
    }
  });

  if (elements.today.innerHTML.indexOf("Dagens økt") < 0) {
    throw new Error("Dagens økt manglar");
  }
  if (elements.progress.innerHTML.indexOf("Garmin") < 0) {
    throw new Error("Garmin-delen manglar");
  }
  if (elements.food.innerHTML.indexOf("Mat for best mogleg framgang") < 0) {
    throw new Error("Matplanen manglar");
  }
  if (elements.food.innerHTML.indexOf("Estimer frå tekst") < 0) {
    throw new Error("Måltidsestimatoren manglar");
  }

  var breakfast = window.Anita.estimateFoodText("70 g havregryn + 2,5 dl mjølk + 1 banan");
  if (!breakfast || breakfast.kcal !== 479 || breakfast.protein !== 19 || breakfast.hits !== 3) {
    throw new Error("Måltidsestimatoren gav feil resultat for mengder");
  }

  var countedMeal = window.Anita.estimateFoodText("3 egg + 2 grove skiver");
  if (!countedMeal || countedMeal.kcal !== 414 || countedMeal.protein !== 28 || countedMeal.hits !== 2) {
    throw new Error("Måltidsestimatoren gav feil resultat for stykk og skiver");
  }

  document.getElementById("estimate-test-text").value = "70 g havregryn + 2,5 dl mjølk + 1 banan";
  window.Anita.estimateMeal("estimate-test");
  if (document.getElementById("estimate-test-kcal").value !== 479 || document.getElementById("estimate-test-protein").value !== 19) {
    throw new Error("Estimatet vart ikkje fylt inn i måltidsredigeringa");
  }

  if (window.Anita.estimateFoodText("noko heilt ukjent") !== null) {
    throw new Error("Ukjend mat skal ikkje få eit vilkårleg estimat");
  }

  window.ANITA_DATA.meals.forEach(function (day) {
    day.meals.forEach(function (meal) {
      if (!window.Anita.estimateFoodText(meal.text)) throw new Error("Ingen estimat for standardmåltid: " + meal.text);
    });
  });
  Object.keys(window.ANITA_DATA.raceMeals).forEach(function (date) {
    window.ANITA_DATA.raceMeals[date].meals.forEach(function (meal) {
      if (!window.Anita.estimateFoodText(meal.text)) throw new Error("Ingen estimat for løpsmåltid: " + meal.text);
    });
  });

  console.log("PWA smoke test passed");
}, 50);
