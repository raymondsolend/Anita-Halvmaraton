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

  console.log("PWA smoke test passed");
}, 50);
