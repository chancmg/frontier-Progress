let container = null;
let count = 0;

function createDiv(className) {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

function createButton(btn) {
  const element = document.createElement("input");
  element.type = "button";
  element.id = btn.id;
  element.className = btn.className;
  element.value = btn.value;
  return element;
}

function getProgressWrapper() {
  const progressWrapper = createDiv("progress-wrapper");
  return progressWrapper;
}

function getProgressBar() {
  return createDiv("progress-bar");
}

function getProgress() {
  const progress = createDiv("progress");
  progress.id = "progress" + count;
  return progress;
}

function getStartBtn() {
  return createButton({
    id: "start" + count,
    className: "start",
    value: "Start",
  });
}
function getStopBtn() {
  return createButton({
    id: "stop" + count,
    className: "start",
    value: "Stop",
  });
}
function getResetBtn() {
  return createButton({
    id: "reset" + count,
    className: "start",
    value: "Restart",
  });
}
function createProgressBar(duration) {
  count += 1;
  const wrapper = getProgressWrapper();
  const bar = getProgressBar();
  const progress = getProgress();
  const start = getStartBtn();
  const stop = getStopBtn();
  const reset = getResetBtn();
  let st;
  let pause = false;
  let pauseTime = null;
  let delta = 0;
  function step(time) {
    if (pause) {
      return;
    }
    if (pauseTime && delta === 0) {
      delta = time - pauseTime;
    }
    let diff = Math.round(time - st - delta);
    let val = Math.round((diff / duration) * 100);
    val = val > 100 ? 100 : val;
    progress.style.width = val * 2 + "px";
    if (diff < duration) {
      requestAnimationFrame(step);
    } else {
      pauseTime = null;
      delta = 0;
    }
  }

  start.addEventListener("click", function () {
    if (pause) {
      requestAnimationFrame(step);
      pause = !pause;
      delta = 0;
      return;
    } else {
      progress.style.width = "0px";
      st = window.performance.now();
      requestAnimationFrame(step);
    }
  });

  stop.addEventListener("click", function () {
    if (pause) return;
    pause = !pause;
    pauseTime = window.performance.now();
    delta = 0;
  });

  reset.addEventListener("click", function () {
    pause = false;
    delta = 0;
    pauseTime = null;
    progress.style.width = "0px";
    st = window.performance.now();
    requestAnimationFrame(step);
  });

  bar.appendChild(progress);
  wrapper.appendChild(bar);
  wrapper.appendChild(start);
  wrapper.appendChild(stop);
  wrapper.appendChild(reset);
  container.appendChild(wrapper);
}

function getElement(id) {
  return document.getElementById(id);
}
window.onload = function () {
  container = getElement("progress-container");
  createProgressBar(5000);
  getElement("add").addEventListener("click", function () {
    createProgressBar(5000);
  });
};
