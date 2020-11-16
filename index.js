function start() {
  var duration = 5000;
  console.log("duration: ", duration);
  var st = window.performance.now();
  window.requestAnimationFrame(function step(time) {
    console.log("time: ", time);
    var diff = Math.round(time - st),
      val = Math.round((diff / duration) * 100);
    val = val > 100 ? 100 : val;
    const progress = document.getElementById("progress");
    progress.style.width = val + "px";
    progress.style.textContent = val + "%";
    if (diff < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

window.onload = () => {
  console.log("Reached");
  start();
};
