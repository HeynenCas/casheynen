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