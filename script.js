// =========================================================
// KCK GAMING HUB
// JAVASCRIPT
// FULL INTERACTIVE VERSION
// HOMEPAGE LOGO + PARTICLES + REACTOR + MENU
// =========================================================


// =========================================================
// GLOBAL VARIABLES
// =========================================================

let canvas = null;
let ctx = null;

let particles = [];
let rippleForces = [];

let score =
    Number(localStorage.getItem("kckPoints")) || 0;


// =========================================================
// REACTOR COLORS
// 25 FUTURISTIC COLORS
// =========================================================

const reactorColors = [

    {
        main: "#ff2bd6",
        glow: "rgba(255,43,214,.80)",
        name: "NEON PINK"
    },

    {
        main: "#00eaff",
        glow: "rgba(0,234,255,.80)",
        name: "CYBER CYAN"
    },

    {
        main: "#7dff00",
        glow: "rgba(125,255,0,.75)",
        name: "PLASMA GREEN"
    },

    {
        main: "#ff8a00",
        glow: "rgba(255,138,0,.80)",
        name: "SOLAR ORANGE"
    },

    {
        main: "#9b5cff",
        glow: "rgba(155,92,255,.80)",
        name: "QUANTUM VIOLET"
    },

    {
        main: "#00ff9d",
        glow: "rgba(0,255,157,.78)",
        name: "CYBER MINT"
    },

    {
        main: "#ff3b3b",
        glow: "rgba(255,59,59,.80)",
        name: "LASER RED"
    },

    {
        main: "#4169ff",
        glow: "rgba(65,105,255,.80)",
        name: "ELECTRIC BLUE"
    },

    {
        main: "#ff00ff",
        glow: "rgba(255,0,255,.80)",
        name: "FUSION MAGENTA"
    },

    {
        main: "#00ffea",
        glow: "rgba(0,255,234,.80)",
        name: "AQUA PULSE"
    },

    {
        main: "#ffe600",
        glow: "rgba(255,230,0,.78)",
        name: "NOVA YELLOW"
    },

    {
        main: "#ff1493",
        glow: "rgba(255,20,147,.80)",
        name: "HOT PINK"
    },

    {
        main: "#8a2be2",
        glow: "rgba(138,43,226,.80)",
        name: "ULTRA VIOLET"
    },

    {
        main: "#00bfff",
        glow: "rgba(0,191,255,.80)",
        name: "DEEP CYAN"
    },

    {
        main: "#39ff14",
        glow: "rgba(57,255,20,.75)",
        name: "NEON LIME"
    },

    {
        main: "#ff4500",
        glow: "rgba(255,69,0,.80)",
        name: "FLAME ORANGE"
    },

    {
        main: "#c300ff",
        glow: "rgba(195,0,255,.80)",
        name: "PLASMA PURPLE"
    },

    {
        main: "#00ff66",
        glow: "rgba(0,255,102,.75)",
        name: "TOXIC GREEN"
    },

    {
        main: "#ff0055",
        glow: "rgba(255,0,85,.80)",
        name: "CRIMSON NEON"
    },

    {
        main: "#5c7cff",
        glow: "rgba(92,124,255,.80)",
        name: "HOLOGRAPHIC BLUE"
    },

    {
        main: "#00ffd5",
        glow: "rgba(0,255,213,.80)",
        name: "TURQUOISE CORE"
    },

    {
        main: "#ffb000",
        glow: "rgba(255,176,0,.80)",
        name: "GOLDEN PLASMA"
    },

    {
        main: "#d946ff",
        glow: "rgba(217,70,255,.80)",
        name: "COSMIC PURPLE"
    },

    {
        main: "#00ffcc",
        glow: "rgba(0,255,204,.80)",
        name: "CYBER AQUA"
    },

    {
        main: "#ff3366",
        glow: "rgba(255,51,102,.80)",
        name: "NEON CORAL"
    }

];

let reactorColorIndex = 0;


// =========================================================
// START
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        canvas =
            document.getElementById(
                "particleCanvas"
            );


        if (canvas) {

            setupParticles();

            animateParticles();

            setupParticleTouch();

        }


        setupHomeLogo();

        setupReactor();

        setupSignOut();

        restorePlayer();

        updatePoints();

    }
);


// =========================================================
// MENU
// =========================================================

function toggleMenu() {

    const menuButton =
        document.getElementById(
            "menuButton"
        );

    const menuPanel =
        document.getElementById(
            "menuPanel"
        );


    if (!menuButton || !menuPanel) {
        return;
    }


    menuPanel.classList.toggle(
        "show"
    );


    menuButton.classList.toggle(
        "active"
    );

}


// =========================================================
// PAGE SWITCHING
// =========================================================

function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".site-page"
        );


    pages.forEach(
        function (page) {

            page.classList.remove(
                "active-page"
            );

        }
    );


    const selectedPage =
        document.getElementById(
            pageId
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    const menuPanel =
        document.getElementById(
            "menuPanel"
        );


    const menuButton =
        document.getElementById(
            "menuButton"
        );


    if (menuPanel) {

        menuPanel.classList.remove(
            "show"
        );

    }


    if (menuButton) {

        menuButton.classList.remove(
            "active"
        );

    }


    window.scrollTo(
        0,
        0
    );

}


// =========================================================
// LANGUAGE
// =========================================================

function changeLanguage() {

    const language =
        document.getElementById(
            "language"
        );


    if (!language) {
        return;
    }


    localStorage.setItem(
        "kckLanguage",
        language.value
    );

}


// =========================================================
// LOGIN
// =========================================================

function joinTournament() {

    const loginPanel =
        document.getElementById(
            "loginPanel"
        );


    if (!loginPanel) {
        return;
    }


    loginPanel.classList.add(
        "show"
    );


    setTimeout(
        function () {

            const gamerName =
                document.getElementById(
                    "gamerName"
                );


            if (gamerName) {

                gamerName.focus();

            }

        },
        300
    );

}


// =========================================================
// CLOSE LOGIN
// =========================================================

function closeLogin() {

    const loginPanel =
        document.getElementById(
            "loginPanel"
        );


    if (loginPanel) {

        loginPanel.classList.remove(
            "show"
        );

    }

}


// =========================================================
// SUBMIT LOGIN
// =========================================================

function submitLogin() {

    const gamerNameInput =
        document.getElementById(
            "gamerName"
        );

    const emailInput =
        document.getElementById(
            "email"
        );

    const passwordInput =
        document.getElementById(
            "password"
        );


    if (
        !gamerNameInput ||
        !emailInput ||
        !passwordInput
    ) {

        return;

    }


    const gamerName =
        gamerNameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value.trim();


    if (!gamerName) {

        alert(
            "Please enter your gamer name."
        );

        gamerNameInput.focus();

        return;

    }


    if (!email) {

        alert(
            "Please enter your email address."
        );

        emailInput.focus();

        return;

    }


    if (!password) {

        alert(
            "Please enter your password."
        );

        passwordInput.focus();

        return;

    }


    localStorage.setItem(
        "kckGamerName",
        gamerName
    );


    const dashboardName =
        document.getElementById(
            "dashboardGamerName"
        );


    if (dashboardName) {

        dashboardName.textContent =
            gamerName;

    }


    const loginPanel =
        document.getElementById(
            "loginPanel"
        );


    const dashboard =
        document.getElementById(
            "playerDashboard"
        );


    if (loginPanel) {

        loginPanel.classList.remove(
            "show"
        );

    }


    if (dashboard) {

        dashboard.classList.add(
            "show"
        );

        dashboard.style.display =
            "block";

    }


    updatePoints();

}


// =========================================================
// RESTORE PLAYER
// =========================================================

function restorePlayer() {

    const savedName =
        localStorage.getItem(
            "kckGamerName"
        );


    const dashboardName =
        document.getElementById(
            "dashboardGamerName"
        );


    if (
        savedName &&
        dashboardName
    ) {

        dashboardName.textContent =
            savedName;

    }

}


// =========================================================
// SIGN OUT
// =========================================================

function setupSignOut() {

    const buttons =
        document.querySelectorAll(
            ".sign-out-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const dashboard =
                        document.getElementById(
                            "playerDashboard"
                        );


                    if (dashboard) {

                        dashboard.classList.remove(
                            "show"
                        );

                        dashboard.style.display =
                            "none";

                    }


                    showPage("home");

                }
            );

        }
    );

}


// =========================================================
// POINTS
// =========================================================

function updatePoints() {

    const points =
        document.querySelectorAll(
            "#playerPoints"
        );


    points.forEach(
        function (element) {

            element.textContent =
                score;

        }
    );


    const scoreBox =
        document.getElementById(
            "score"
        );


    if (scoreBox) {

        scoreBox.textContent =
            "Score: " + score;

    }

}


// =========================================================
// ADD POINT
// =========================================================

function addPoint() {

    score++;

    localStorage.setItem(
        "kckPoints",
        score
    );

    updatePoints();

}


// =========================================================
// +1 PT FLOATING POPUP
// =========================================================

function createPointPopup(
    x,
    y
) {

    const popup =
        document.createElement(
            "div"
        );


    popup.className =
        "point-popup";


    popup.textContent =
        "+1 PT";


    popup.style.position =
        "fixed";


    popup.style.left =
        x + "px";


    popup.style.top =
        y + "px";


    popup.style.zIndex =
        "10000";


    popup.style.pointerEvents =
        "none";


    popup.style.color =
        "#ffffff";


    popup.style.fontSize =
        "13px";


    popup.style.fontWeight =
        "900";


    popup.style.letterSpacing =
        "1px";


    popup.style.textShadow =
        "0 0 8px #ff2bd6, 0 0 18px #ff2bd6";


    popup.style.transform =
        "translate(-50%, -50%) scale(.7)";


    popup.style.opacity =
        "1";


    popup.style.transition =
        "transform .9s ease, opacity .9s ease";


    document.body.appendChild(
        popup
    );


    requestAnimationFrame(
        function () {

            popup.style.transform =
                "translate(-50%, -85px) scale(1)";

            popup.style.opacity =
                "0";

        }
    );


    setTimeout(
        function () {

            popup.remove();

        },
        950
    );

}

// =========================================================
// HOME LOGO
// FREE DRAG + STRONGER MOMENTUM + EDGE BOUNCE
// + DELAYED RETURN TO TOP-RIGHT
// + +1 PT ON EVERY EDGE HIT
// =========================================================

function setupHomeLogo() {

    const logo =
        document.querySelector(".logo");

    if (!logo) {
        return;
    }


    let dragging = false;

    let x = 0;
    let y = 0;

    let velocityX = 0;
    let velocityY = 0;

    let lastX = 0;
    let lastY = 0;

    let lastTime = 0;

    let animationFrame = null;

    let returnTimer = null;

    let lastEdgeHitTime = 0;


    // -----------------------------------------------------
    // ORIGINAL TOP-RIGHT POSITION
    // -----------------------------------------------------

    const originalPosition = {
        x: 0,
        y: 0
    };


    // -----------------------------------------------------
    // GET TOUCH / MOUSE POINT
    // -----------------------------------------------------

    function getPoint(event) {

        if (
            event.touches &&
            event.touches.length
        ) {

            return event.touches[0];

        }

        return event;
    }


    // -----------------------------------------------------
    // START DRAG
    // -----------------------------------------------------

    function startDrag(event) {

        const point =
            getPoint(event);

        dragging = true;

        clearTimeout(returnTimer);

        cancelAnimationFrame(animationFrame);

        lastX =
            point.clientX;

        lastY =
            point.clientY;

        lastTime =
            performance.now();

        velocityX = 0;
        velocityY = 0;

        logo.style.transition =
            "none";

        logo.classList.add(
            "logo-dragging"
        );


        if (event.cancelable) {

            event.preventDefault();

        }

    }


    // -----------------------------------------------------
    // DRAG
    // -----------------------------------------------------

    function moveDrag(event) {

        if (!dragging) {
            return;
        }

        const point =
            getPoint(event);

        const now =
            performance.now();

        const deltaTime =
            Math.max(
                1,
                now - lastTime
            );


        const dx =
            point.clientX - lastX;

        const dy =
            point.clientY - lastY;


        x += dx;
        y += dy;


        // STRONGER FLICK MOMENTUM

        velocityX =
            (dx / deltaTime) * 20;

        velocityY =
            (dy / deltaTime) * 20;


        lastX =
            point.clientX;

        lastY =
            point.clientY;

        lastTime =
            now;


        applyLogoPosition();


        // Push nearby particles away

        pushParticlesAway(
            point.clientX,
            point.clientY,
            170,
            25
        );


        if (event.cancelable) {

            event.preventDefault();

        }

    }


    // -----------------------------------------------------
    // END DRAG
    // -----------------------------------------------------

    function endDrag() {

        if (!dragging) {
            return;
        }


        dragging = false;

        logo.classList.remove(
            "logo-dragging"
        );


        // Let the logo fly first

        bounceLogo();

    }


    // -----------------------------------------------------
    // APPLY POSITION
    // -----------------------------------------------------

    function applyLogoPosition() {

        logo.style.transform =
            "translate(" +
            x +
            "px, " +
            y +
            "px)";

    }


    // -----------------------------------------------------
// EDGE POINT POPUP
// -----------------------------------------------------

function showEdgePoint() {

    const popup =
        document.createElement("div");

    popup.className =
        "edge-point-popup";

    popup.textContent =
        "+1 PT";

    document.body.appendChild(
        popup
    );


    // Put the popup exactly where
    // the logo touches the edge

    const rect =
        logo.getBoundingClientRect();


    let popupX =
        rect.left +
        rect.width / 2;


    let popupY =
        rect.top +
        rect.height / 2;


    // Keep popup inside the screen

    popupX =
        Math.max(
            45,
            Math.min(
                window.innerWidth - 45,
                popupX
            )
        );


    popupY =
        Math.max(
            45,
            Math.min(
                window.innerHeight - 45,
                popupY
            )
        );


    popup.style.left =
        popupX + "px";

    popup.style.top =
        popupY + "px";


    // Remove after animation

    setTimeout(
        function () {

            popup.remove();

        },
        1500
    );

}


    // -----------------------------------------------------
    // EDGE COLLISION
    // -----------------------------------------------------

    function checkEdges() {

        const rect =
            logo.getBoundingClientRect();


        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        let hitEdge = false;


        // LEFT EDGE

        if (rect.left <= 0) {

            x += -rect.left;

            velocityX =
                Math.abs(velocityX) * 0.9;

            hitEdge = true;

        }


        // RIGHT EDGE

        if (rect.right >= width) {

            x -=
                rect.right - width;

            velocityX =
                -Math.abs(velocityX) * 0.9;

            hitEdge = true;

        }


        // TOP EDGE

        if (rect.top <= 0) {

            y += -rect.top;

            velocityY =
                Math.abs(velocityY) * 0.9;

            hitEdge = true;

        }


        // BOTTOM EDGE

        if (rect.bottom >= height) {

            y -=
                rect.bottom - height;

            velocityY =
                -Math.abs(velocityY) * 0.9;

            hitEdge = true;

        }


        if (hitEdge) {

            const now =
                performance.now();


            // Prevent the same collision from
            // generating hundreds of popups

            if (
                now -
                lastEdgeHitTime >
                180
            ) {

                lastEdgeHitTime =
                    now;


                showEdgePoint();


                // Add 1 point

                score += 1;


                localStorage.setItem(
                    "kckPoints",
                    score
                );


                updatePoints();

            }

        }

    }


    // -----------------------------------------------------
    // BOUNCE + MOMENTUM
    // -----------------------------------------------------

    function bounceLogo() {

        function animate() {

            if (dragging) {
                return;
            }


            // Air resistance

            velocityX *= 0.985;

            velocityY *= 0.985;


            // Movement

            x += velocityX;

            y += velocityY;


            applyLogoPosition();


            // Check every edge

            checkEdges();


            // Push particles away from logo

            const rect =
                logo.getBoundingClientRect();


            pushParticlesAway(
                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2,

                150,
                10
            );


            // Continue moving while momentum remains

            if (
                Math.abs(velocityX) > 0.12 ||
                Math.abs(velocityY) > 0.12
            ) {

                animationFrame =
                    requestAnimationFrame(
                        animate
                    );

            } else {

                // Stop naturally

                velocityX = 0;
                velocityY = 0;


                // WAIT LONGER BEFORE RETURNING

                returnTimer =
                    setTimeout(
                        returnLogoHome,
                        10
                    );

            }

        }


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    // -----------------------------------------------------
    // RETURN TO TOP RIGHT
    // -----------------------------------------------------

    function returnLogoHome() {

        if (dragging) {
            return;
        }


        logo.style.transition =
            "transform 1.4s cubic-bezier(.2,.8,.2,1)";


        x =
            originalPosition.x;

        y =
            originalPosition.y;


        applyLogoPosition();


        setTimeout(
            function () {

                logo.style.transition =
                    "none";

            },
            1400
        );

    }


    // -----------------------------------------------------
    // TOUCH EVENTS
    // -----------------------------------------------------

    logo.addEventListener(
        "touchstart",
        startDrag,
        {
            passive: false
        }
    );


    logo.addEventListener(
        "touchmove",
        moveDrag,
        {
            passive: false
        }
    );


    logo.addEventListener(
        "touchend",
        endDrag,
        {
            passive: false
        }
    );


    // -----------------------------------------------------
    // MOUSE EVENTS
    // -----------------------------------------------------

    logo.addEventListener(
        "mousedown",
        startDrag
    );


    document.addEventListener(
        "mousemove",
        moveDrag
    );


    document.addEventListener(
        "mouseup",
        endDrag
    );

}


// =========================================================
// PARTICLE REPULSION
// =========================================================

function pushParticlesAway(
    x,
    y,
    radius,
    strength
) {

    rippleForces.push({

        x: x,

        y: y,

        radius: radius,

        strength: strength

    });

}


// =========================================================
// REACTOR
// =========================================================

function setupReactor() {

    const reactor =
        document.querySelector(
            ".hologram-core"
        );


    if (!reactor) {
        return;
    }


    reactor.addEventListener(
        "touchstart",
        function (event) {

            event.preventDefault();

            activateReactor();

        },
        {
            passive: false
        }
    );


    reactor.addEventListener(
        "click",
        function () {

            activateReactor();

        }
    );

}


// =========================================================
// ACTIVATE REACTOR
// =========================================================

function activateReactor() {

    const reactor =
        document.querySelector(
            ".hologram-core"
        );


    const dashboard =
        document.getElementById(
            "playerDashboard"
        );


    if (!reactor || !dashboard) {
        return;
    }


    const color =
        reactorColors[
            reactorColorIndex
        ];


    reactorColorIndex =
        (
            reactorColorIndex + 1
        ) %
        reactorColors.length;


    dashboard.style.setProperty(
        "--reactor-main",
        color.main
    );


    dashboard.style.setProperty(
        "--reactor-glow",
        color.glow
    );


    // -----------------------------------------------------
    // REACTOR ACTIVE CLASS
    // -----------------------------------------------------

    reactor.classList.remove(
        "reactor-active"
    );


    void reactor.offsetWidth;


    reactor.classList.add(
        "reactor-active"
    );


    // -----------------------------------------------------
    // BACKGROUND ENERGY
    // -----------------------------------------------------

    createEnergyWave(
        color.main,
        color.glow
    );


    // -----------------------------------------------------
    // FULL BACKGROUND COLOR
    // -----------------------------------------------------

    dashboard.style.background =
        "radial-gradient(" +
        "circle at 50% 40%, " +
        color.main +
        "55 0%, " +
        color.main +
        "25 30%, " +
        "#030c17 75%, " +
        "#000000 100%)";


    dashboard.style.transition =
        "background 3s ease";


    // -----------------------------------------------------
    // REACTOR GLOW
    // -----------------------------------------------------

    reactor.style.filter =
        "drop-shadow(0 0 30px " +
        color.glow +
        ") " +
        "drop-shadow(0 0 90px " +
        color.glow +
        ") " +
        "drop-shadow(0 0 150px " +
        color.glow +
        ")";


    // -----------------------------------------------------
    // KEEP COLOR FOR 20 MINUTES
    // -----------------------------------------------------

    setTimeout(
        function () {

            // Only reset if this is still
            // the current selected color.

            dashboard.style.background =
                "radial-gradient(" +
                "circle at 50% 35%, " +
                "#164c78 0%, " +
                "#0a213b 32%, " +
                "#030c17 70%, " +
                "#000000 100%)";


            reactor.style.filter =
                "";

        },
        20 * 60 * 1000
    );

}


// =========================================================
// FULL DASHBOARD ENERGY WAVE
// =========================================================

function createEnergyWave(
    color,
    glow
) {

    const dashboard =
        document.getElementById(
            "playerDashboard"
        );


    if (!dashboard) {
        return;
    }


    const wave =
        document.createElement(
            "div"
        );


    wave.className =
        "reactor-energy-wave";


    wave.style.setProperty(
        "--wave-color",
        color
    );


    wave.style.setProperty(
        "--wave-glow",
        glow
    );


    dashboard.appendChild(
        wave
    );


    setTimeout(
        function () {

            wave.remove();

        },
        5000
    );

}


// =========================================================
// PARTICLE SYSTEM
// =========================================================

function setupParticles() {

    if (!canvas) {
        return;
    }


    ctx =
        canvas.getContext(
            "2d"
        );


    resizeCanvas();


    particles = [];


    const amount =
        Math.min(
            110,
            Math.floor(
                window.innerWidth / 6
            )
        );


    for (
        let i = 0;
        i < amount;
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
                2 +
                .5,

            speedX:
                (
                    Math.random() -
                    .5
                ) *
                .5,

            speedY:
                (
                    Math.random() -
                    .5
                ) *
                .5,

            alpha:
                Math.random() *
                .8 +
                .2

        });

    }

}


// =========================================================
// RESIZE CANVAS
// =========================================================

function resizeCanvas() {

    if (!canvas) {
        return;
    }


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


window.addEventListener(
    "resize",
    function () {

        resizeCanvas();

    }
);


// =========================================================
// PARTICLE ANIMATION
// =========================================================

function animateParticles() {

    if (!canvas || !ctx) {
        return;
    }


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        function (particle) {

            particle.x +=
                particle.speedX;

            particle.y +=
                particle.speedY;


            if (
                particle.x < 0 ||
                particle.x > canvas.width
            ) {

                particle.speedX *=
                    -1;

            }


            if (
                particle.y < 0 ||
                particle.y > canvas.height
            ) {

                particle.speedY *=
                    -1;

            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(255,43,214," +
                particle.alpha +
                ")";


            ctx.fill();

        }
    );


    // -----------------------------------------------------
    // PARTICLE REPULSION
    // -----------------------------------------------------

    rippleForces.forEach(
        function (force) {

            particles.forEach(
                function (particle) {

                    const dx =
                        particle.x -
                        force.x;


                    const dy =
                        particle.y -
                        force.y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance <
                        force.radius &&
                        distance > 0
                    ) {

                        const power =
                            (
                                1 -
                                distance /
                                force.radius
                            ) *
                            force.strength;


                        particle.x +=
                            (
                                dx /
                                distance
                            ) *
                            power;


                        particle.y +=
                            (
                                dy /
                                distance
                            ) *
                            power;

                    }

                }
            );


            force.radius +=
                5;


            force.strength *=
                .93;

        }
    );


    rippleForces =
        rippleForces.filter(
            function (force) {

                return (
                    force.strength >
                    .15
                );

            }
        );


    requestAnimationFrame(
        animateParticles
    );

}


// =========================================================
// PARTICLE TOUCH
// =========================================================

function setupParticleTouch() {

    if (!canvas) {
        return;
    }


    canvas.addEventListener(
        "touchstart",
        function (event) {

            const point =
                event.touches[0];


            pushParticlesAway(
                point.clientX,
                point.clientY,
                180,
                25
            );


            createRipple(
                point.clientX,
                point.clientY
            );

        },
        {
            passive: true
        }
    );


    canvas.addEventListener(
        "touchmove",
        function (event) {

            const point =
                event.touches[0];


            pushParticlesAway(
                point.clientX,
                point.clientY,
                140,
                12
            );

        },
        {
            passive: true
        }
    );


    canvas.addEventListener(
        "mousedown",
        function (event) {

            pushParticlesAway(
                event.clientX,
                event.clientY,
                180,
                25
            );


            createRipple(
                event.clientX,
                event.clientY
            );

        }
    );

}


// =========================================================
// RIPPLE
// =========================================================

function createRipple(
    x,
    y
) {

    const ripple =
        document.createElement(
            "div"
        );


    ripple.className =
        "tap-ripple";


    ripple.style.left =
        x + "px";


    ripple.style.top =
        y + "px";


    document.body.appendChild(
        ripple
    );


    setTimeout(
        function () {

            ripple.remove();

        },
        700
    );

}


// =========================================================
// ESCAPE KEY
// =========================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeLogin();


            const menuPanel =
                document.getElementById(
                    "menuPanel"
                );


            const menuButton =
                document.getElementById(
                    "menuButton"
                );


            if (menuPanel) {

                menuPanel.classList.remove(
                    "show"
                );

            }


            if (menuButton) {

                menuButton.classList.remove(
                    "active"
                );

            }

        }

    }
);