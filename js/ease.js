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