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