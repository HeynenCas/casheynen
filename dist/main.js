function updateAge() {
    const birthDate = new Date(2002, 1, 19);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today < birthdayThisYear) {
        age--;
    }

    document.getElementById("age").textContent = age;
}

if (document.getElementById("age")) {
    updateAge();
}
const cursorDot = document.querySelector(".cursor-dot"); // Instant dot
const cursorTrail = document.querySelector(".cursor-trail"); // Smooth dot

let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
    // Move the small dot instantly
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;

    // Update mouse position for the trailing effect
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smoothly move the trailing dot
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;

    cursorTrail.style.left = `${posX}px`;
    cursorTrail.style.top = `${posY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add click effect ONLY on the trailing dot
document.addEventListener("mousedown", () => {
    cursorTrail.style.transform = "translate(-50%, -50%) scale(0)"; // Enlarge
    cursorDot.style.transform = "translate(-50%, -50%) scale(1.2)"; // Enlarge
});

document.addEventListener("mouseup", () => {
    cursorTrail.style.transform = "translate(-50%, -50%) scale(1)"; // Reset
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)"; // Reset
});

// Hide cursor when leaving the screen
document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorTrail.style.opacity = "0";
});

// Show cursor when re-entering the screen
document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorTrail.style.opacity = "1";
});

const links = document.querySelectorAll("a");

links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        cursorTrail.style.transform = "translate(-50%, -50%) scale(1.25)";
        cursorTrail.style.border = "1px solid rgba(222,221,220,0.35)";
        cursorTrail.style.boxShadow = "0 0 1rem rgba(222,221,220,0.15)";
    });

    link.addEventListener("mouseleave", () => {
        cursorTrail.style.transform = "translate(-50%, -50%) scale(1)";
        cursorTrail.style.border = "1px solid rgba(222,221,220,0.3)";
        cursorTrail.style.boxShadow = "0 0 1rem rgba(222,221,220,0.1)";
    });
});
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("h1, h2").forEach((el) => {
    gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el, // Each h1 and h2 triggers itself
            start: "top 90%", // Animates when 80% of the element is visible
            toggleActions: "play none none none", // Play once when entering
        }
    });
});

/*gsap.registerPlugin(ScrollTrigger, SplitText);

let splits = [];

function splitAndAnimateHeadings() {
    splits.forEach(split => split.revert());
    splits = [];

    document.querySelectorAll("h1, h2").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        splits.push(split);

        gsap.from(split.words, {
            y: -100,
            opacity: 0,
            rotation: () => gsap.utils.random(-15, 15),
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });
}

splitAndAnimateHeadings();
window.addEventListener("resize", splitAndAnimateHeadings);*/
gsap.to('.line', {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
        trigger: ".header",
        start: "center center",
        end: "bottom center",
        scrub: 1.5
    }
})
gsap.to('.line-right', {
    yPercent: -6,
    ease: "none",
    scrollTrigger: {
        trigger: ".about",
        start: "center center",
        end: "bottom center",
        scrub: 1.5
    }
})
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const loadingScreen = document.getElementById('loading-screen');

let progress = 0;

document.body.classList.add('no-scroll');

// Total loading time in ms (random between 2-5 seconds)
const totalTime = 1000 + Math.random() * 3000;
const startTime = Date.now();

function updateProgress() {
    const elapsed = Date.now() - startTime;
    progress = Math.min(100, Math.floor((elapsed / totalTime) * 100));

    progressBar.style.width = progress + '%';
    progressText.textContent = progress + '%';

    if (progress < 100) {
        requestAnimationFrame(updateProgress);
    } else {
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
            loadingScreen.style.display = 'none';

            document.body.classList.remove('no-scroll');
        }, 600)
    }
}

requestAnimationFrame(updateProgress);
$(document).ready(function() {
    $(".burger").click(function() {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(".nav-mobile").removeClass("opened");

            $("body").removeClass("no-scroll");
        } else {
            $(this).addClass("open");
            $(".nav-mobile").addClass("opened");

            $("body").addClass("no-scroll");
        }
    });
});
/*import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

// WaterTexture class (from texture.js)
const easeOutSine = (t, b, c, d) => {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

const easeOutQuad = (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
};

class WaterTexture {
    constructor(options) {
        this.size = 64;
        this.points = [];
        this.radius = this.size * 0.05;
        this.width = this.height = this.size;
        this.maxAge = 80;
        this.last = null;

        if (options.debug) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.radius = this.width * 0.1;
        }

        this.initTexture();
        if (options.debug) document.body.append(this.canvas);
    }

    initTexture() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "WaterTexture";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.texture = new THREE.Texture(this.canvas);
        this.clear();
    }

    clear() {
        //this.ctx.fillStyle = "black";
        //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addPoint(point) {
        let force = 0;
        let vx = 0;
        let vy = 0;
        const last = this.last;
        if (last) {
            const relativeX = point.x - last.x;
            const relativeY = point.y - last.y;
            const distanceSquared = relativeX * relativeX + relativeY * relativeY;
            const distance = Math.sqrt(distanceSquared);
            vx = relativeX / distance;
            vy = relativeY / distance;
            force = Math.min(distanceSquared * 10000, 1);
        }

        this.last = { x: point.x, y: point.y };
        this.points.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
    }

    update() {
        this.clear();
        let agePart = 1 / this.maxAge;
        this.points.forEach((point, i) => {
            let slowAsOlder = 1 - point.age / this.maxAge;
            let force = point.force * agePart * slowAsOlder;
            point.x += point.vx * force;
            point.y += point.vy * force;
            point.age += 1;
            if (point.age > this.maxAge) {
                this.points.splice(i, 1);
            }
        });

        this.points.forEach(point => {
            this.drawPoint(point);
        });
        this.texture.needsUpdate = true;
    }

    /*drawPoint(point) {
        let pos = { x: point.x * this.width, y: point.y * this.height };
        const radius = this.radius;
        const ctx = this.ctx;

        let intensity = 1;
        if (point.age < this.maxAge * 0.3) {
            intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
        } else {
            intensity = easeOutQuad(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
        }
        intensity *= point.force;

        let red = ((point.vx + 1) / 2) * 255;
        let green = ((point.vy + 1) / 2) * 255;
        let blue = intensity * 255;
        let color = `${red}, ${green}, ${blue}`;

        let offset = this.width * 5;
        ctx.shadowOffsetX = offset;
        ctx.shadowOffsetY = offset;
        ctx.shadowBlur = radius * 1;
        ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255,255,255,1)";
        this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }*/

    /*drawPoint(point) {
        let pos = { x: point.x * this.width, y: point.y * this.height };
        const radius = this.radius;
        const ctx = this.ctx;

        // Intensity calculation as before (based on age)
        let intensity = 1;
        if (point.age < this.maxAge * 0.3) {
            intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
        } else {
            intensity = easeOutQuad(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
        }
        intensity *= point.force;

        // Calculate opacity based on direction (vx and vy)
        // The closer the direction is to (0,0), the more opaque it will be
        let opacity = Math.min(1, Math.abs(point.vx) + Math.abs(point.vy)); // Higher vx or vy makes ripple more opaque

        // Set the color to white with variable opacity
        let color = `rgba(255, 255, 255, ${opacity * intensity})`;

        // Shadow effects (optional)
        let offset = this.width * 5;
        ctx.shadowOffsetX = offset;
        ctx.shadowOffsetY = offset;
        ctx.shadowBlur = radius * 1;
        ctx.shadowColor = `rgba(255, 255, 255, ${0.2 * intensity})`; // Shadow also gets an opacity

        // Draw the point (ripple)
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// App class (from ripple.js)
class App {
    constructor() {
        this.waterTexture = new WaterTexture({ debug: true });

        this.tick = this.tick.bind(this);
        this.init();
    }

    init() {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.tick();
    }

    onMouseMove(ev) {
        const point = {
            x: ev.clientX / window.innerWidth,
            y: ev.clientY / window.innerHeight
        };

        this.waterTexture.addPoint(point);
    }

    tick() {
        this.waterTexture.update();
        requestAnimationFrame(this.tick);
    }
}

const myApp = new App();*/

// WORKS

/*import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

// WaterTexture class (from texture.js)
const easeOutSine = (t, b, c, d) => {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

const easeOutQuad = (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
};

// Function to calculate brightness based on RGB values
function calculateBrightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

class WaterTexture {
    constructor(options) {
        this.size = 64;
        this.points = [];
        this.radius = this.size * 0.05;
        this.width = this.height = this.size;
        this.maxAge = 80;
        this.last = null;

        if (options.debug) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.radius = this.width * 0.1;
        }

        this.initTexture();
        if (options.debug) document.body.append(this.canvas);
    }

    initTexture() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "WaterTexture";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.texture = new THREE.Texture(this.canvas);
        this.clear();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addPoint(point) {
        let force = 0;
        let vx = 0;
        let vy = 0;
        const last = this.last;
        if (last) {
            const relativeX = point.x - last.x;
            const relativeY = point.y - last.y;
            const distanceSquared = relativeX * relativeX + relativeY * relativeY;
            const distance = Math.sqrt(distanceSquared);
            vx = relativeX / distance;
            vy = relativeY / distance;
            force = Math.min(distanceSquared * 10000, 1);
        }

        this.last = { x: point.x, y: point.y };
        this.points.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
    }

    update() {
        this.clear();
        let agePart = 1 / this.maxAge;
        this.points.forEach((point, i) => {
            let slowAsOlder = 1 - point.age / this.maxAge;
            let force = point.force * agePart * slowAsOlder;
            point.x += point.vx * force;
            point.y += point.vy * force;
            point.age += 1;
            if (point.age > this.maxAge) {
                this.points.splice(i, 1);
            }
        });

        this.points.forEach(point => {
            this.drawPoint(point);
        });
        this.texture.needsUpdate = true;
    }

    drawPoint(point) {
        let pos = { x: point.x * this.width, y: point.y * this.height };
        const radius = this.radius;
        const ctx = this.ctx;

        // Intensity calculation as before (based on age)
        let intensity = 1;
        if (point.age < this.maxAge * 0.3) {
            intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
        } else {
            intensity = easeOutQuad(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
        }
        intensity *= point.force;

        // Get the background color of the body
        const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
        const rgb = backgroundColor.match(/\d+/g); // Extract RGB values
        const [r, g, b] = rgb.map(Number);

        // Calculate the brightness of the background
        const brightness = calculateBrightness(r, g, b);

        // Set ripple color based on brightness: Inverse effect
        let color = `rgba(255, 255, 255, ${intensity})`; // Default white ripple

        // If the background is dark, use white, otherwise use black
        if (brightness > 128) {
            color = `rgba(0, 0, 0, ${intensity})`; // Use black for light background
        }

        // Shadow effects (optional)
        let offset = this.width * 5;
        ctx.shadowOffsetX = offset;
        ctx.shadowOffsetY = offset;
        ctx.shadowBlur = radius * 1;
        ctx.shadowColor = `rgba(255, 60, 0, ${0.2 * intensity})`; // Shadow also gets an opacity

        // Draw the point (ripple)
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// App class (from ripple.js)
class App {
    constructor() {
        this.waterTexture = new WaterTexture({ debug: true });

        this.tick = this.tick.bind(this);
        this.init();
    }

    init() {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.tick();
    }

    onMouseMove(ev) {
        const point = {
            x: ev.clientX / window.innerWidth,
            y: ev.clientY / window.innerHeight
        };

        this.waterTexture.addPoint(point);
    }

    tick() {
        this.waterTexture.update();
        requestAnimationFrame(this.tick);
    }
}

const myApp = new App();*/

/*import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

// Easing functions
const easeOutSine = (t, b, c, d) => {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

const easeOutQuad = (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
};

// Function to calculate brightness based on RGB values
function calculateBrightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

class WaterTexture {
    constructor(options) {
        this.size = 64;
        this.points = [];
        this.radius = this.size * 0.05;
        this.width = this.height = this.size;
        this.maxAge = 80;
        this.last = null;

        if (options.debug) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.radius = this.width * 0.1;
        }

        this.initTexture();
        if (options.debug) document.body.append(this.canvas);
    }

    initTexture() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "WaterTexture";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.texture = new THREE.Texture(this.canvas);
        this.clear();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addPoint(point) {
        let force = 0;
        let vx = 0;
        let vy = 0;
        const last = this.last;
        if (last) {
            const relativeX = point.x - last.x;
            const relativeY = point.y - last.y;
            const distanceSquared = relativeX * relativeX + relativeY * relativeY;
            const distance = Math.sqrt(distanceSquared);
            vx = relativeX / distance;
            vy = relativeY / distance;
            force = Math.min(distanceSquared * 10000, 1);
        }

        this.last = { x: point.x, y: point.y };
        this.points.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
    }

    update() {
        this.clear();
        let agePart = 1 / this.maxAge;
        this.points.forEach((point, i) => {
            let slowAsOlder = 1 - point.age / this.maxAge;
            let force = point.force * agePart * slowAsOlder;
            point.x += point.vx * force;
            point.y += point.vy * force;
            point.age += 1;
            if (point.age > this.maxAge) {
                this.points.splice(i, 1);
            }
        });

        this.points.forEach(point => {
            this.drawPoint(point);
        });
        this.texture.needsUpdate = true;
    }

    drawPoint(point) {
        let pos = { x: point.x * this.width, y: point.y * this.height };
        const radius = this.radius;
        const ctx = this.ctx;

        // Intensity calculation based on age
        let intensity = 1;
        if (point.age < this.maxAge * 0.3) {
            intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
        } else {
            intensity = easeOutQuad(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
        }
        intensity *= point.force;

        // Define base and direction-based colors
        let baseColor = [102, 0, 255]; // White
        let directionColor = [255, 68, 0]; // Orange-red

        // Normalize direction to [0, 1]
        let mixFactor = (Math.abs(point.vx) + Math.abs(point.vy)) / 2;

        // Interpolate between baseColor and directionColor
        let r = Math.round(baseColor[0] * (1 - mixFactor) + directionColor[0] * mixFactor);
        let g = Math.round(baseColor[1] * (1 - mixFactor) + directionColor[1] * mixFactor);
        let b = Math.round(baseColor[2] * (1 - mixFactor) + directionColor[2] * mixFactor);

        // Assign final color with intensity-based opacity
        let color = `rgba(${r}, ${g}, ${b}, ${intensity})`;

        // Shadow effects (optional)
        let offset = this.width * 5;
        ctx.shadowOffsetX = offset;
        ctx.shadowOffsetY = offset;
        ctx.shadowBlur = radius * 1;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.2 * intensity})`; // Shadow with opacity

        // Draw the point (ripple)
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// App class (from ripple.js)
class App {
    constructor() {
        this.waterTexture = new WaterTexture({ debug: true });

        this.tick = this.tick.bind(this);
        this.init();
    }

    init() {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.tick();
    }

    onMouseMove(ev) {
        const point = {
            x: ev.clientX / window.innerWidth,
            y: ev.clientY / window.innerHeight
        };

        this.waterTexture.addPoint(point);
    }

    tick() {
        this.waterTexture.update();
        requestAnimationFrame(this.tick);
    }
}

const myApp = new App();*/


import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

// Easing functions
const easeOutSine = (t, b, c, d) => {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

const easeOutQuad = (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
};

// Brightness helper
function calculateBrightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

class WaterTexture {
    constructor(options) {
        this.size = 64;
        this.points = [];
        this.radius = this.size * 0.05;
        this.width = this.height = this.size;
        this.maxAge = 80;
        this.last = null;

        // ✅ NEW: Add speedMultiplier with default value of 1
        this.speedMultiplier = options.speedMultiplier || 1;

        if (options.debug) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.radius = this.width * 0.1;
        }

        this.initTexture();
        if (options.debug) document.body.append(this.canvas);
    }

    initTexture() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "WaterTexture";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.texture = new THREE.Texture(this.canvas);
        this.clear();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addPoint(point) {
        let force = 0;
        let vx = 0;
        let vy = 0;
        const last = this.last;
        if (last) {
            const relativeX = point.x - last.x;
            const relativeY = point.y - last.y;
            const distanceSquared = relativeX * relativeX + relativeY * relativeY;
            const distance = Math.sqrt(distanceSquared);
            vx = relativeX / distance;
            vy = relativeY / distance;
            force = Math.min(distanceSquared * 10000, 1);
        }

        this.last = { x: point.x, y: point.y };
        this.points.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
    }

    update() {
        this.clear();
        let agePart = 1 / this.maxAge;
        this.points.forEach((point, i) => {
            let slowAsOlder = 1 - point.age / this.maxAge;
            let force = point.force * agePart * slowAsOlder;

            // ✅ NEW: Apply speedMultiplier
            point.x += point.vx * force * this.speedMultiplier;
            point.y += point.vy * force * this.speedMultiplier;
            point.age += 1;
            if (point.age > this.maxAge) {
                this.points.splice(i, 1);
            }
        });

        this.points.forEach(point => {
            this.drawPoint(point);
        });
        this.texture.needsUpdate = true;
    }

    drawPoint(point) {
        let pos = { x: point.x * this.width, y: point.y * this.height };
        const radius = this.radius;
        const ctx = this.ctx;

        let intensity = 1;
        if (point.age < this.maxAge * 0.3) {
            intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
        } else {
            intensity = easeOutQuad(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
        }
        intensity *= point.force;

        const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
        const rgb = backgroundColor.match(/\d+/g);
        const [r, g, b] = rgb.map(Number);
        const brightness = calculateBrightness(r, g, b);

        let color = `rgba(255, 255, 255, ${intensity})`;
        if (brightness > 128) {
            color = `rgba(0, 0, 0, ${intensity})`;
        }

        let offset = this.width * 5;
        ctx.shadowOffsetX = offset;
        ctx.shadowOffsetY = offset;
        ctx.shadowBlur = radius * 1;
        ctx.shadowColor = `rgba(255, 60, 0, ${0.2 * intensity})`;

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

class App {
    constructor() {
        // ✅ Set your desired speedMultiplier here (e.g., 0.5 = slower, 2 = faster)
        this.waterTexture = new WaterTexture({ debug: true, speedMultiplier: 0.7 });

        this.tick = this.tick.bind(this);
        this.init();
    }

    init() {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.tick();
    }

    onMouseMove(ev) {
        const point = {
            x: ev.clientX / window.innerWidth,
            y: ev.clientY / window.innerHeight
        };

        this.waterTexture.addPoint(point);
    }

    tick() {
        this.waterTexture.update();
        requestAnimationFrame(this.tick);
    }
}

const myApp = new App();
