// =========================================
// KCK GAMING HUB
// JAVASCRIPT
// =========================================


// =========================================
// SIGN IN
// =========================================

function joinTournament() {

    const loginPanel =
        document.getElementById("loginPanel");

    if (loginPanel) {

        loginPanel.classList.add("show");

    }

}
// =========================================
// CLOSE SIGN IN PANEL
// =========================================

function closeLogin() {

    const loginPanel =
        document.getElementById("loginPanel");

    if (loginPanel) {

        loginPanel.classList.remove("show");

    }
}
// =========================================
// LOAD SAVED PLAYER
// =========================================

window.addEventListener("load", function () {

    let player =
        localStorage.getItem("playerName");

    if (player) {

        console.log(
            "Welcome back " + player
        );
    }

});


// =========================================
// LANGUAGE SELECTOR
// =========================================

function changeLanguage() {

    const language =
        document.getElementById("language").value;

    alert(
        "Language changed to " + language
    );
}


// =========================================
// DARK / LIGHT MODE
// =========================================

function toggleMode() {

    document.body.classList.toggle(
        "light-mode"
    );
}


// =========================================
// PLAYER SCORE
// =========================================

let score = 0;

function addScore() {

    score++;

    let scoreBox =
        document.getElementById("score");

    if (scoreBox) {

        scoreBox.innerHTML =
            "Score: " + score;
    }
}


// =========================================
// NAVIGATION MENU
// =========================================

function toggleMenu() {

    const button =
        document.getElementById("menuButton");

    const panel =
        document.getElementById("menuPanel");

    button.classList.toggle("active");

    panel.classList.toggle("show");
}


// =========================================
// LIVE PARTICLE BACKGROUND
// =========================================

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");

let particles = [];

let rippleForces = [];


// =========================================
// RESIZE CANVAS
// =========================================

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


// =========================================
// CREATE PARTICLES
// =========================================

function createParticles() {

    particles = [];

    const particleCount =
        Math.min(
            130,
            Math.floor(
                window.innerWidth *
                window.innerHeight /
                8000
            )
        );

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() *
                2 + 0.7,

            speedX:
                (Math.random() - 0.5) *
                0.4,

            speedY:
                (Math.random() - 0.5) *
                0.4,

            opacity:
                Math.random() *
                0.6 + 0.25,

            pulse:
                Math.random() *
                Math.PI * 2
        });
    }
}

createParticles();

window.addEventListener(
    "resize",
    createParticles
);


// =========================================
// DRAW PARTICLES
// =========================================

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(function (particle) {

        // Normal movement
        particle.x += particle.speedX;

        particle.y += particle.speedY;


        // Natural glowing pulse
        particle.pulse += 0.025;

        let glow =
            particle.opacity +
            Math.sin(particle.pulse) * 0.15;


        // =================================
        // RIPPLE FORCE
        // =================================

        rippleForces.forEach(function (ripple) {

            const dx =
                particle.x - ripple.x;

            const dy =
                particle.y - ripple.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < ripple.radius &&
                distance > 1
            ) {

                const strength =
                    (1 - distance / ripple.radius)
                    * ripple.force;


                particle.x +=
                    (dx / distance) *
                    strength;

                particle.y +=
                    (dy / distance) *
                    strength;
            }

        });


        // =================================
        // SCREEN WRAPPING
        // =================================

        if (particle.x < -5) {

            particle.x =
                canvas.width + 5;
        }

        if (particle.x > canvas.width + 5) {

            particle.x = -5;
        }

        if (particle.y < -5) {

            particle.y =
                canvas.height + 5;
        }

        if (particle.y > canvas.height + 5) {

            particle.y = -5;
        }


        // =================================
        // DRAW PARTICLE
        // =================================

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255, 43, 214, " +
            Math.max(0.05, glow) +
            ")";

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            "#ff2bd6";

        ctx.fill();

        ctx.shadowBlur = 0;

    });


    // =================================
    // UPDATE RIPPLE FORCES
    // =================================

    rippleForces.forEach(function (ripple) {

        ripple.radius += 8;

        ripple.force *= 0.92;

    });


    // Remove finished ripple forces

    rippleForces =
        rippleForces.filter(function (ripple) {

            return ripple.force > 0.15;

        });


    requestAnimationFrame(
        drawParticles
    );
}


// Start animation
drawParticles();


// =========================================
// TAP / CLICK RIPPLE
// =========================================

document.addEventListener(
    "pointerdown",
    function (event) {

        createRipple(
            event.clientX,
            event.clientY
        );

    }
);


// =========================================
// CREATE RIPPLE
// =========================================

function createRipple(x, y) {

    // Visual ripple
    const ripple =
        document.createElement("div");

    ripple.className =
        "tap-ripple";

    ripple.style.left =
        x + "px";

    ripple.style.top =
        y + "px";

    document.body.appendChild(
        ripple
    );


    // Push nearby particles
    rippleForces.push({

        x: x,

        y: y,

        radius: 10,

        force: 8

    });


    // Remove visual ripple
    setTimeout(
        function () {

            ripple.remove();

        },
        700
    );
}
// =========================================
// SUBMIT LOGIN
// =========================================

function submitLogin() {

    const gamerName =
        document.getElementById("gamerName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();


    // Check Gamer Name
    if (!gamerName) {

        alert("Please enter your gamer name.");

        return;
    }


    // Check Email
    if (!email) {

        alert("Please enter your email address.");

        return;
    }


    // Check Password
    if (!password) {

        alert("Please enter your password.");

        return;
    }


    // Save gamer name
    localStorage.setItem(
        "playerName",
        gamerName
    );


    // Close login panel
    closeLogin();


    // Welcome message
    alert(
        "Welcome to KCK Gaming Hub, " +
        gamerName + "!"
    );
}