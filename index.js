var start = null;
var progress = 0;
var st;
var ele;
function step(time) {
  var diff = Math.round(time - st),
    val = Math.round((diff / duration) * 100);
  val = val > 100 ? 100 : val;
  ele.style.width = val * 2 + "px";
  if (diff < duration) {
    requestAnimationFrame(step);
  }
}
window.onload = function () {
  ele = document.getElementById("progress");
  document.getElementById("run").addEventListener(
    "click",
    function () {
      ele.style.width = "0px";
      duration = 3000;
      st = window.performance.now();
      requestAnimationFrame(step);
    },
    false
  );
};
