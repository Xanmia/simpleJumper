"use strict";

$.util = {};

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();


$.gameLoad = function () {
  this.data = {};
  this.data.scores = [];
  this.data.user = "default user";
  //this.data.currentStage = 0;
  //this.data.player = null;
  var opt = JSON.parse(localStorage.getItem(location.pathname));
  if (opt == null) {
    localStorage.setItem(location.pathname, JSON.stringify(this.data));
  }
  else {
    this.data.scores = opt.scores;
    this.data.user = opt.user;
  }

  this.saveUser = function (name) {
    this.data.user = name;
    localStorage.setItem(location.pathname, JSON.stringify(this.data));
  }

  this.saveScore = function (level, scores) {
    if (this.data.scores.length <= level) {
      this.data.scores.push([]);
    }
    this.data.scores[level].push({ n: this.data.user, s: Number(scores) });
    this.data.scores[level] = this.data.scores[level].sort(function (a, b) {
      if (a.s > b.s) {
        return 1;
      }
      if (a.s < b.s) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    this.data.scores[level].splice(5,this.data.scores[level].length);  //only store top 5
    //this.data.elapsedTime = timeElapsed;
    //this.data.player = player;
    localStorage.setItem(location.pathname, JSON.stringify(this.data));
  }

};



$.util.randomInRange = function (min, max) {
  return Math.random() * (max - min) + min;
};

$.util.rectInRect = function (r1, r2) {
  return !(r2.x > r1.x + r1.w ||
    r2.x + r2.w < r1.x ||
    r2.y > r1.y + r1.h ||
    r2.y + r2.h < r1.y);
};


$.util.popChat = function (_x, _y, _text,_c) {

  var textEl = document.createElement('div');
  textEl.classList.add('note');
  textEl.classList.add(_c||'ani'); // could add animation option for diff behavior.

  var current = 0;
  setLocation(_text[current].length);
  textEl.innerText = _text[current];
  //textEl.appendChild($.images['log']);
  // textEl.innerText += " more crap";
  // textEl.innerHtml = "<img src='" + $.images['tree'].src + "' />";

  textEl.addEventListener("animationend", AnimationEnded, false);

  document.body.appendChild(textEl);

  function setLocation(textLength) {
    var x = textLength < 20 ? (textLength * 15) / 4 : 100; //100 is max width of box, 10 is text size
    var y = 15 + Math.ceil(textLength * .1) * 7; //100 is max width of box, 10 is text size
    textEl.style.left = (_x - x) + "px";
    textEl.style.top = (_y - y) + "px";
  }

  function AnimationEnded() {
    if (current < _text.length - 1) {
      current++;
      setLocation(_text[current].length);
      textEl.innerText = _text[current];;
      textEl.classList.remove(_c||'ani');
      void textEl.offsetWidth;
      textEl.classList.add(_c||'ani');
    } else {
      document.body.removeChild(textEl);
    }
  }
}

