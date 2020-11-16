let container = null;
let count = 0;
/**
 * Creates Div element
 * @param {} className
 */

function createDiv(className) {
  const div = document.createElement("div");
  div.className = className;
  return div;
}
/**
 * Creates a Div for Button
 * @param {*} btn
 */
function createButton(btn) {
  const element = createDiv(btn.className);
  element.type = "button";
  element.id = btn.id;
  element.innerText = btn.value;
  return element;
}
/**
 * Returns Container to hold Progress Bar
 */
function getProgressWrapper() {
  const progressWrapper = createDiv("progress-wrapper");
  return progressWrapper;
}
/**
 * Returns Wrapper of Progress Bar wrapper
 */
function getProgressBar() {
  return createDiv("progress-bar");
}
/**
 * Returns Progress Bar
 */
function getProgress() {
  const progress = createDiv("progress");
  progress.id = "progress" + count;
  return progress;
}
/**
 * Creating CTA's
 */
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
/**
 * Render Progress Bar with CTA;
 * @param {*} duration
 */
function renderProgressBar(duration) {
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
  /**
   * Animating Using RequestAnimationFrame for Better experiencing
   * @param {*} time
   */
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
  /**
   * Attaching Listeners
   */
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
  /**
   * Creating Progress with 5 seconds Interval
   */
  renderProgressBar(5000);

  getElement("add").addEventListener("click", function () {
    const input = getElement("intervalInput");
    if (!input) return;
    const interval = input.value;
    if (!interval || interval === 0) return;
    renderProgressBar(interval * 1000);
  });
};
