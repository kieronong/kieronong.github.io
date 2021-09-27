let earth_texture;
let paper_plane;
let x_rotation = 0;
let y_rotation = 300;
let z_rotation = 0;
let x_offset = 0;
let y_offset = 0;
let z_offset = 0;
let og_mouse_x;
let og_mouse_y;
let slider;
let mouse_triggered = false;
let draw_plane = false;
let drop_dots = false;
let dropped_dots = [];
let drop_dots_start_framecount;

function preload(){
  earth_texture=loadImage('assets/earthtexture.jpg');
  paper_plane = loadImage('assets/paperplane.jpg');
}


function setup() {
  createCanvas(windowWidth, windowHeight - 110, WEBGL);
  slider = createSlider(-1, 1, -1, 1);
  slider.position(10, 110);
  slider.style('width', '200px');
}

function draw() {
  background(0);
  angleMode(DEGREES);

  push()
  // x_rotation += (0.05*x_offset);
  y_rotation += (0.1*slider.value());
  // rotateX(x_rotation);
  rotateY(y_rotation);
  texture(earth_texture);
  sphere(240,25,25);
  pop()

  if (drop_dots) {
    if ((frameCount - drop_dots_start_framecount) % 80 == 0) {
      dropped_dots.push([x_rotation, y_rotation]);
      if (dropped_dots.length > 8) {
        dropped_dots.shift()
      }
    }
    for (let d of dropped_dots) {
      push()
      rotateY(y_rotation);
      rotateY(-d[1]);
      rotateX(d[0]);
      translate(0, 0, 250);
      texture(paper_plane);
      box(5, 5, 0);
      pop()
    }
  }

  if (draw_plane) {
    push()
    x_rotation += (0.1*x_offset);
    rotateX(x_rotation);
    translate(0, 0, 250);
    texture(paper_plane);
    box(20, 20, 0);
    pop()
    
  }

  // N key
  if (keyIsDown(78)) {
    drop_dots_start_framecount = frameCount
    draw_plane = true;
    drop_dots = true;
    x_offset = 1;
  }

  // S key
  if (keyIsDown(83)) {
    drop_dots_start_framecount = frameCount
    draw_plane = true;
    drop_dots = true;
    x_offset = -1;
  }

  // X key
  if (keyIsDown(88)) {
    draw_plane = false;
    drop_dots = false;
    dropped_dots = [];
    x_rotation = 0;
    x_offset = 0
    y_rotation = 300
  }

  orbitControl()
}