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