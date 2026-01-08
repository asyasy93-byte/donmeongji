const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

const items = ["꽝", "꽝", "꽝", "꽝", "당첨"];
const colors = ["#ddd", "#ccc", "#bbb", "#aaa", "#ff5252"];
const arc = (2 * Math.PI) / items.length;
let angle = 0;

function drawWheel() {
  items.forEach((item, i) => {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, arc * i + angle, arc * (i + 1) + angle);
    ctx.fill();
  });
}

drawWheel();

spinBtn.onclick = () => {
  spinBtn.disabled = true;

  const isWin = Math.random() < 0.005; // 연출용
  const targetIndex = isWin ? 4 : Math.floor(Math.random() * 4);

  const targetAngle =
    5 * 2 * Math.PI + (items.length - targetIndex) * arc;

  let start = angle;
  let startTime = null;

  function animate(t) {
    if (!startTime) startTime = t;
    let p = Math.min((t - startTime) / 3000, 1);
    angle = start + (targetAngle - start) * p;
    ctx.clearRect(0, 0, 300, 300);
    drawWheel();

    if (p < 1) {
      requestAnimationFrame(animate);
    } else {
      alert(isWin ? "🎉 당첨!" : "😢 꽝");
      spinBtn.disabled = false;
    }
  }

  requestAnimationFrame(animate);
};
