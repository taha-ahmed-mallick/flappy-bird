let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');
let height = window.innerHeight;
let width = window.innerWidth;
let gameSpeed = 5;
let startAnimation = false;

// Background
let y = [43, 0, 0, 100, 120, 0, 130];
let spd = [1, 0, 1, 1, 1, 1, 1, 1];
let bg = [];

for (let i = 0; i < 7; i++) {
      bg.push({ img: new Image() });
      bg[i].img.src = `./resource/bg/0${i}.png`;
      bg[i].img.onload = () => {
            bg[i].nw = bg[i].img.naturalWidth;
            bg[i].nh = bg[i].img.naturalHeight;
            bg[i].y = height - bg[i].nh - y[i];
            bg[i].loaded = true;
            bg[i].class = new Layer(bg[i].img, spd[i], bg[i].y, bg[i].nh, bg[i].nw);
      }
}

document.body.onload = () => {
      height = window.innerHeight;
      width = window.innerWidth;
      canvas.height = height;
      canvas.width = width;
};

document.body.onresize = () => {
      height = window.innerHeight;
      width = window.innerWidth;
      canvas.height = height;
      canvas.width = width;
      for (let i = 0; i < bg.length; i++) {
            bg[i].class.x = [];
            bg[i].class.xupdate();
      }
}

class Layer {
      constructor(img, speedMod, y, h, w) {
            this.x = [];
            this.y = y;
            this.w = w;
            this.h = h;
            this.img = img;
            this.speedMod = speedMod;
            this.speed = gameSpeed * speedMod;
            this.xupdate();
      }
      xupdate() {
            for (let i = 0; i < Math.ceil(width / this.w) + 1; i++) {
                  this.x.push(this.w * i);
            }
      }
      update() {
            this.speed = gameSpeed * this.speedMod;
            // if (this.x <= -this.width) {
            //       this.x = this.width + this.x2 - this.speed;
            // }
            // if (this.x2 <= -this.width) {
            //       this.x2 = this.width + this.x - this.speed;
            // }
            for (let i = 0; i < this.x.length; i++) this.x[i] -= this.speed;
            if (this.x[0] <= -this.w) {
                  this.x.shift();
                  this.x.push(this.w + this.x[this.x.length - 1]);
            };
      }
      draw() {
            for (let i = 0; i < this.x.length; i++) {
                  ctx.drawImage(this.img, this.x[i], this.y, this.w, this.h);
            }
      }
}

// pipes
let pipes = [];

function animate() {
      ctx.clearRect(0, 0, width, height);
      if (startAnimation == false) {
            for (let i = 0; i < bg.length; i++) {
                  if (bg[i].loaded == false || bg[i].loaded == undefined) {
                        startAnimation = false;
                        break;
                  } else if (bg[i].loaded == true) {
                        startAnimation = true;
                  }
            }
      }
      if (startAnimation) {
            for (let i = bg.length - 1; i > -1; i--) {
                  bg[i].class.update();
                  bg[i].class.draw();
            }
      }
      requestAnimationFrame(animate);
}

animate();