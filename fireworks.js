const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Firework class
class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.radius = 3;
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: -(Math.random() * 5 + 12)
        };
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.particles = [];
        this.exploded = false;
    }

    update() {
        if (!this.exploded) {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            if (this.y < canvas.height * 0.25 + Math.random() * 100) {
                this.explode();
            }
        }

        this.particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            } else {
                particle.update();
            }
        });

        this.alpha -= 0.01;
    }

    explode() {
        this.exploded = true;
        const baseHue = Math.random() * 360;
        const particleCount = 150 + Math.random() * 50;

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2) * (i / particleCount);
            const speed = Math.random() * 5 + 2;

            this.particles.push(new Particle(
                this.x,
                this.y,
                `hsla(${baseHue + (Math.random() * 20 - 10)}, 100%, 70%, 0.8)`,
                {
                    x: Math.cos(angle) * speed + (Math.random() - 0.5),
                    y: Math.sin(angle) * speed + (Math.random() - 0.5)
                }
            ));
        }

        this.particles.push(new Particle(this.x, this.y, 'white', { x: 0, y: 0 }, 8, 0.5));
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.particles.forEach(particle => particle.draw());
    }
}

// Particle class
class Particle {
    constructor(x, y, color, velocity, size = Math.random() * 3 + 1, gravity = 0.1) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
        this.color = color;
        this.alpha = 1;
        this.gravity = gravity;
        this.resistance = 0.98;
        this.fade = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.velocity.x *= this.resistance;
        this.velocity.y *= this.resistance;
        this.velocity.y += this.gravity;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.fade;
        this.size *= 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

// Fireworks array
const fireworks = [];

// Function to launch a firework at random intervals
function launchRandomFirework() {
    fireworks.push(new Firework());
    setTimeout(launchRandomFirework, Math.random() * 1500 + 500);
}

// Start launching fireworks
launchRandomFirework();

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

// Start animation
animate();
