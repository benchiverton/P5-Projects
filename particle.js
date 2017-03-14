//Where u = the Universe, and s is a boolean s.t. when true the program updates.
var u;
var s = false;
var fr = 50;

//Initializes the canvas etc, then creates a new universe.
function setup() {
    initialize();
    u = new Universe(80);
}

//Updates the 'particles' (if s is true) and draws them onto the canvas. It also replaces the background with 70%
//opacity to give the 'bluring' effect as the particles move.
function draw() {
    if (s == true) {
        background(0, 0, 0, 70);
        u.update();
    }
    u.render();
}

function Particle() {
    this.pos = createVector(random(5, width - 5), random(5, height - 5));
    this.vel = createVector(0, 0, 0);
    this.r = 7;

    //Random vector used for the colour of the particle.
    this.col = createVector(20 + random() * 235, 20 + random() * 235, 20 + random() * 235);

    //Renders the particle.
    this.render = function () {

        fill(this.col.x, this.col.y, this.col.z);
        ellipse(this.pos.x, this.pos.y, this.r);

    }

    //Calculates the 'updated' velocity then moves the particle.
    this.update = function (focus) {

        var d = focus.dist(this.pos);

        var dir = (focus.copy().sub(this.pos)).div(d);

        if (dir.mag() < 5) {
            dir.setMag(5);
        }

        this.vel.add((dir.mult(2.5)));

        this.vel.limit(400);

        this.move();

    }

    //Moves the particle based on the time-base.
    this.move = function () {

        this.pos.x += this.vel.x / fr;
        this.pos.y += this.vel.y / fr;

        this.bounce();

    }

    //If the particle collides with a wall it will bounce off.
    this.bounce = function () {

        if (this.pos.x > width - 5) {
            this.pos.x = width - 5;
            this.vel.x = this.vel.x * -1;
        }

        if (this.pos.x < 5) {
            this.pos.x = 5;
            this.vel.x = this.vel.x * -1;
        }

        if (this.pos.y > height - 5) {
            this.pos.y = height - 5;
            this.vel.y = this.vel.y * -1;
        }

        if (this.pos.y < 5) {
            this.pos.y = 5;
            this.vel.y = this.vel.y * -1
        }

    }

    //Makes the parcicles 'scatter' away from the focus.
    this.scatter = function (focus) {

        this.vel = this.pos.copy().sub(focus);

        this.vel.setMag(30000 / this.vel.mag());

    }

}

//Where n = amount of particles in the 'universe'.
function Universe(n) {
    this.particles = [];
    this.focus = createVector(width / 2, height / 2);

    //Makes an array of particles.
    for (i = 0; i < n; i++) {
        this.particles.push(new Particle());
    }

    //Updates each particle in the 'universe' and the position of the 'focus'.
    this.update = function () {

        if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height) {
            this.focus.x = mouseX;
            this.focus.y = mouseY;
        }

        for (var p in this.particles) {

            var p_ = this.particles[p];

            p_.update(this.focus);

        }

    }

    //Renders each particle in the 'universe'.
    this.render = function () {

        for (var p in this.particles) {
            var p_ = this.particles[p];
            p_.render();
        }

    }

    //Scatters each particle in the 'unicerse'.
    this.scatter = function () {

        for (var p in this.particles) {
            var p_ = this.particles[p];
            p_.scatter(this.focus);
        }

    }

}

//Sets up the canvas, framerate and 'stroke'.
function initialize() {
    createCanvas(480, 300);
    background(0);
    frameRate(fr);
    strokeWeight(.1);
    stroke(255);
}

//When the mouse is clicked within the window, it scatters the particles.
function mouseClicked() {
    if (s == true && 0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height) {
        u.scatter();
    }
}

//Changes the value of s which will allow/prohibit the universe from updating.
function Start() {
    s = !s;
}

//Generates a new universe.
function Reset() {
    background(0);
    u = new Universe(80)
}
