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
