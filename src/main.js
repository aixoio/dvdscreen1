import $ from "jquery";
import party from "party-js";

import "./index.scss"

import dvdLogo from "./dvdlogo.png";

const canvasElem = $("#canvas")[0]
const g2d = canvasElem.getContext("2d");

const OGWIDTH = 512;
const OGHEIGHT = 512;

let WIDTH = OGWIDTH;
let HEIGHT = OGHEIGHT;

let fullscreen = false;

if (!fullscreen) $("#exitFullScreenBtn").hide();

class Logo {

  constructor(x, y, dx, dy, image, width, height) {
    
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.image = image;
    this.img = new Image()
    this.img.src = this.image;
    this.width = width;
    this.height = height;

  }

  draw() {

    g2d.drawImage(this.img, this.x, this.y, this.width, this.height);

  }

  update() {

    if ((this.x + this.width) > WIDTH || this.x < 0) {
      this.dx = -this.dx;
    }
    if ((this.y + this.height) > HEIGHT || this.y < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

  }

}

let startx = (Math.random() * WIDTH);
let starty = (Math.random() * HEIGHT);

let ewidth = 128;
let eheight = 128;

while (startx + ewidth >= WIDTH || startx < 0) {

  startx = (Math.random() * WIDTH);

}

while (starty + eheight >= HEIGHT || starty < 0) {

  starty = (Math.random() * HEIGHT);

}

let speed = 2;

$("#speed").val(speed);

let logo = new Logo(startx, starty, speed, speed, dvdLogo, ewidth, eheight);

$("#resetbtn").on("click", () => {

  startx = (Math.random() * WIDTH);
  starty = (Math.random() * HEIGHT);

  while (startx + ewidth >= WIDTH || startx < 0) {

    startx = (Math.random() * WIDTH);

  }

  while (starty + eheight >= HEIGHT || starty < 0) {

    starty = (Math.random() * HEIGHT);

  }

  logo = new Logo(startx, starty, speed, speed, logo.image, ewidth, eheight);

})

$("#uploadBtn").on("click", () => {

  $("#imgFile").trigger("click")

})

$("#imgFile").on("change", () => {

  const inputElem = $("#imgFile")[0];

  logo.image = URL.createObjectURL(inputElem.files[0]);

  logo.img = new Image();

  logo.img.src = logo.image;

})

$("#canvas").on("click", () => {

  party.confetti($("#canvas")[0], {
    count: party.variation.range(20, 40),
    size: 1
  });

  party.sparkles($("#canvas")[0], {
    count: party.variation.range(20, 40),
    size: 1
  });

})

$("#cornerBtn").on("click", () => {

  party.sparkles($("#cornerBtn")[0], {
    count: party.variation.range(20, 40),
    size: 1
  });

  logo.x = 100;
  logo.y = 100;
  logo.dx = speed;
  logo.dy = speed;

})

$("#fullScreenBtn").on("click", () => {

  party.confetti($("body")[0], {
    count: party.variation.range(20, 40),
    size: 1
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  fullscreen = true;

  $("#exitFullScreenBtn").show();
  $("#fullScreenBtn").hide();

  $("#canvasWapper").removeClass("mt-10")
  $("#btnWapper").hide()
  $("#canvas").removeClass("rounded")

  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  ewidth = ewidth * 2;
  eheight = eheight * 2;

  speed = speed * 2;

  startx = (Math.random() * WIDTH);
  starty = (Math.random() * HEIGHT);

  while (startx + ewidth >= WIDTH || startx < 0) {

    startx = (Math.random() * WIDTH);

  }

  while (starty + eheight >= HEIGHT || starty < 0) {

    starty = (Math.random() * HEIGHT);

  }

  logo = new Logo(startx, starty, speed, speed, logo.image, ewidth, eheight);


})

$("#exitFullScreenBtn").on("click", () => {

  party.confetti($("body")[0], {
    count: party.variation.range(20, 40),
    size: 1
  });

  canvas.width = OGWIDTH;
  canvas.height = OGHEIGHT;

  fullscreen = false;

  $("#exitFullScreenBtn").hide();
  $("#fullScreenBtn").show();

  $("#canvasWapper").addClass("mt-10")
  $("#btnWapper").show()
  $("#canvas").addClass("rounded")

  WIDTH = OGWIDTH;
  HEIGHT = OGHEIGHT;

  ewidth = ewidth / 2;
  eheight = eheight / 2;

  speed = speed / 2;

  startx = (Math.random() * WIDTH);
  starty = (Math.random() * HEIGHT);

  while (startx + ewidth >= WIDTH || startx < 0) {

    startx = (Math.random() * WIDTH);

  }

  while (starty + eheight >= HEIGHT || starty < 0) {

    starty = (Math.random() * HEIGHT);

  }

  logo = new Logo(startx, starty, speed, speed, logo.image, ewidth, eheight);


})


function animate() {

  requestAnimationFrame(animate);
  g2d.fillStyle = $("#color").val();
  g2d.fillRect(0, 0, WIDTH, HEIGHT)

  logo.update();
  logo.draw();

}

animate();
