const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width = 0;
let height = 0;
let animationFrame = null;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createParticles();
}

function createParticles() {
  const count = Math.min(95, Math.floor((width * height) / 15000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.7 + 0.35,
    speedX: (Math.random() - 0.5) * 0.18,
    speedY: (Math.random() - 0.5) * 0.18,
    alpha: Math.random() * 0.45 + 0.12
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  for (const particle of particles) {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < -10) particle.x = width + 10;
    if (particle.x > width + 10) particle.x = -10;
    if (particle.y < -10) particle.y = height + 10;
    if (particle.y > height + 10) particle.y = -10;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 48, 79, ${particle.alpha})`;
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255, 48, 79, ${(1 - distance / 130) * 0.13})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  animationFrame = requestAnimationFrame(drawParticles);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.18
});

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();

window.addEventListener("beforeunload", () => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
});
