let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');
let height = document.body.clientHeight;
let width = document.body.clientWidth;
let gameSpeed = 1;

// Background
let bg = [];
for (let i = 0; i < 1; i++) {
      bg.push({ img: new Image() });
      bg[i].img.src = `./resource/bg/0${i}.png`;
      bg[i].nw = bg[i].img.naturalWidth;
      bg[i].nh = bg[i].img.naturalHeight;
      bg[i].y = height - bg[i].nh;
}

document.body.onload = () => {
      height = document.body.clientHeight;
      width = document.body.clientWidth;
      canvas.height = height;
      canvas.width = width;
};

document.body.onresize = () => {
      height = document.body.clientHeight;
      width = document.body.clientWidth;
      canvas.height = height;
      canvas.width = width;
      for (let i = 0; i < bgFunc.length; i++) {
            bgFunc[i].x = [];
            bgFunc[i].xupdate();
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
            console.log(this.x);
      }
      xupdate() {
            for (let i = 0; i < Math.ceil(width / this.w); i++) {
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
      }
      draw() {
            for (let i = 0; i < this.x.length; i++) {
                  ctx.drawImage(this.img, this.x[i], this.y, this.w, this.h);
            }
      }
}

let bgFunc = [];

for (let i = 0; i < bg.length; i++) {
      bgFunc.push(new Layer(bg[i].img, 1.5, bg[i].y, bg[i].nh, bg[i].nw));
}

function animate() {
      for (let i = bgFunc.length - 1; i > -1; i--) {
            bgFunc[i].update();
            bgFunc[i].draw();
      }
      requestAnimationFrame(animate);
      // ctx.clearRect(0, 0, width, height);
}

animate();