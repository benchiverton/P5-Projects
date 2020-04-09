var p;
var s;
var fr = 50;

function setup() {
    createCanvas(480, 300);
    frameRate(fr);
    strokeWeight(.8);
    p = new SqArray(50);
    s = false;
}

function draw() {
    if (s == true) {
        p.update();
    }
    p.render();
}

function RandSq() {
    this.center = generateCenter();
    this.angle = 2 * Math.PI * random();
    this.rotSpeed = 0.005 * random();
    this.opac = 20;
    this.col = createVector(255 * random(), 255 * random(), 255 * random());

    this.increaseRot = function (x) {
        this.angle += x;
    }

    this.renderSq = function () {

        fill(this.col.x, this.col.y, this.col.z, this.opac);

        translate(this.center.x, this.center.y);
        rotate(this.angle);
        rect(0, 0, 4 * width, 4 * width);

        resetMatrix();

    }

    this.renderBox = function () {

        fill(0, 0, 0, 0);

        translate(this.center.x, this.center.y);
        rotate(this.angle);
        rect(0, 0, 4 * width, 4 * width);

        resetMatrix();

    }

    this.randCol = function () {
        this.col = createVector(255 * random(), 255 * random(), 255 * random());
    }

    this.update = function () {
        this.increaseRot(this.rotSpeed);
    }

}

function SqArray(n) {
    this.arr = [];
    this.t = 0;

    for (i = 0; i < n; i++) {

        this.arr.push(new RandSq());

    }

    this.update = function () {

        this.t++;

        if (this.t % 50 == 0) {

            this.randCol();
            this.t = 0;

        } else {
            for (var s in this.arr) {

                var s_ = this.arr[s];
                s_.update();

            }
        }
    }

    this.randCol = function () {

        for (var s in this.arr) {

            var s_ = this.arr[s];
            s_.randCol();

        }
    }

    this.render = function () {

        for (var s in this.arr) {

            var s_ = this.arr[s];
            s_.renderSq();

        }

        for (var s in this.arr) {

            var s_ = this.arr[s];
            s_.renderBox();

        }
    }
}

function generateCenter() {

    x = createVector(3 * width * random() - width, 3 * height * random() - height);

    if (x.x > 0 && x.x < width) {
        if (x.y > 0 && x.y < height) {

            x = this.generateCenter();

        }
    }
    return x;
}

function Start() {
    s = !s;
}

function Reset() {
    p = new SqArray(50);
}