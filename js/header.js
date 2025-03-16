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