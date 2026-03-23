const container = document.getElementById("container");

let lastPress = 0;
let intensity = 1;

// random helper
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// create particles
function createParticles(x, y, power = 1) {
  const count = Math.floor(12 * power);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = random(60, 180) * power;

    const dx = Math.cos(angle) * distance + "px";
    const dy = Math.sin(angle) * distance + "px";

    p.style.left = x + "px";
    p.style.top = y + "px";

    p.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;

    p.style.setProperty("--x", dx);
    p.style.setProperty("--y", dy);

    container.appendChild(p);

    setTimeout(() => p.remove(), 700);
  }
}

// screen flash
function flash(power) {
  const value = Math.min(40 + power * 50, 140);
  document.body.style.background = `rgb(${value}, ${value}, ${value})`;

  setTimeout(() => {
    document.body.style.background = "#0a0a0a";
  }, 60);
}

// screen shake
function shake(power) {
  const x = random(-6, 6) * power;
  const y = random(-6, 6) * power;

  document.body.style.transform = `translate(${x}px, ${y}px)`;

  setTimeout(() => {
    document.body.style.transform = "translate(0,0)";
  }, 60);
}

// handle input
function trigger(x, y) {
  const now = Date.now();
  const speed = now - lastPress;

  if (speed < 100) {
    intensity = Math.min(intensity + 0.25, 2.5);
  } else {
    intensity = 1;
  }

  lastPress = now;

  createParticles(x, y, intensity);
  flash(intensity);
  shake(intensity);
}

// keyboard
window.addEventListener("keydown", () => {
  const x = random(0, window.innerWidth);
  const y = random(0, window.innerHeight);
  trigger(x, y);
});

// mouse / touch
window.addEventListener("click", (e) => {
  trigger(e.clientX, e.clientY);
});

window.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  trigger(touch.clientX, touch.clientY);
});
