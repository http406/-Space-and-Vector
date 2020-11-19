alert("🔮🧿Space and Vector..!\n\n💕 In vector calculus and physics, a vector field is an assignment of a vector to each point in a subset of space. For instance, a vector field in the plane can be visualised as a collection of arrows with a given magnitude and direction, each attached to a point in the plane. Vector fields are often used to model, the speed and direction of a moving fluid throughout space, or the strength and direction of some force, such as the magnetic or gravitational force, as it changes from one point to another point.\n\n👉While click on the screen it will accelerate the field and increase noise.  Enjoy...");

//DOM loader

window.addEventListener('load', checkJSLoaded)

function checkJSLoaded() {  

var sound = new Howl({

  src: ['http://dl.dropbox.com/s/4gej8nhazdek75g/Motivational%20Music%20No%20Copyright%20_%20Background%20music%20for%20motivational%20videos%20COPYRIGHT%20FREE%20mfcc%20%28%20256kbps%20cbr%20%29.mp3'],

  autoplay: true,

  loop: true,     //for sound looping 

  volume: .3,

});

// Clear listener after first call.

sound.once('load', function(){

  sound.play();

});

$(function() {

  var body = $('#starshine'),

      template = $('.template.shine'),

      stars =  20,

      sparkle = 10;

  

    

  var size = 'small';

  var createStar = function() {

    template.clone().removeAttr('id').css({

      top: (Math.random() * 200) + '%',

      left: (Math.random() * 200) + '%',

      webkitAnimationDelay: (Math.random() * sparkle) + 's',

      mozAnimationDelay: (Math.random() * sparkle) + 's'

    }).addClass(size).appendTo(body);

  };

 

  for(var i = 0; i < stars; i++) {

    if(i % 2 === 0) {

      size = 'small';

    } else if(i % 3 === 0) {

      size = 'medium';

    } else {

      size = 'large';

    }

    

    createStar();

  }

});

function normalizeVec(vec){

  var d = Math.sqrt( (vec.x * vec.x) + (vec.y * vec.y) );

  var dx = vec.x / d *5;

  var dy = vec.y / d *5;

  return {

    x : dx, 

    y : dy

  }

}

function normalize(floater){

  var d = Math.sqrt( (floater * floater) );

  var dfloater = floater / d;

  return dfloater;

}

function getCoor(a,b,t){

  var x = Math.sin(3.098 * a - (opt.mouse.pos.x*.066) + t * 15 ) ;

  var y = Math.cos(3.098 * b - (opt.mouse.pos.y*.066) + t * 15 ) ;

  return {

    x : x,

    y : y

  }

}

//______________________________________________ Variables

var stage = {

  x : window.innerWidth/2 * window.devicePixelRatio,

  y : window.innerHeight/2 * window.devicePixelRatio

}

var canvas = document.createElement('canvas');

canvas.width = stage.x;

canvas.height = stage.y;

document.body.appendChild(canvas);

var c = canvas.getContext("2d");

    c.fillStyle = '#000';

    c.strokeStyle = 'hsl(' + 5000 * Math.random() + ', 150%, 50%)';

var grid = [];

var opt = {

  index : 10,

  count : 20,

  mouse : {

    start : {

      x : 10,

      y : 20,

    },

    delta : {

      x : 50,

      y : 50

    },

    pos : {

      x : 20,

      y : 30

    },

    down : true

  }

}

for(var x = 0; x < Math.floor(stage.x / opt.count) + .5; x++){

  for(var y = 0; y < Math.floor(stage.y / opt.count) + .5; y++){

    grid.push({

      x : x * opt.count,

      y : y * opt.count,

      vel : {

        x : 0,

        y : 0

      }

    });

  }

}

//______________________________________________ draw

function draw(time){

  var i = 0;

  for(var x = 0;x < Math.floor(stage.x / opt.count) + 1;x++){

    for(var y = 0;y < Math.floor(stage.y / opt.count) + 1;y++){

      var shiftedTime = i  + time;

      var timeFactor = shiftedTime / 20000 % Math.PI * 20;

      var point = getCoor( grid[i].x, grid[i].y , timeFactor);

      var pressureColor =  (Math.abs( point.x ) + Math.abs( point.y ) )* 100;

      

      c.strokeStyle = 'hsl(' + 5000 * Math.random() + ', 150%, 50%)';

      grid[i].vel.x = point.x * 5;

      grid[i].vel.y = point.y * 5;

      c.beginPath();

      c.moveTo(grid[i].x,grid[i].y);

      c.lineTo(grid[i].x,grid[i].y);

      c.lineTo(grid[i].x + grid[i].vel.x  ,grid[i].y + grid[i].vel.y );

      c.stroke();

      c.closePath();

      i++;

    }

  }

}

//______________________________________________ events

document.body.addEventListener("mousedown",function(event){

  opt.mouse.down = true;

  opt.mouse.start.x = event.pageX;

  opt.mouse.start.y = event.pageY;

});

document.body.addEventListener("mousemove",function(event){

  opt.mouse.pos.x = event.pageX;

  opt.mouse.pos.y = event.pageY;

  if(opt.mouse.down){

    opt.mouse.delta.x = opt.mouse.pos.x - opt.mouse.start.x;

    opt.mouse.delta.y = opt.mouse.pos.y - opt.mouse.start.y;

  }

});

document.body.addEventListener("mouseup",function(event){

  opt.mouse.down = false;

  opt.mouse.delta.x = 0;

  opt.mouse.delta.y = 0; 

  

});

//for iOs

function check_update_xyra(event, mouse_xyra) {

  var x, y, r, a;

  var tgtoffleft = 0;

  var tgtofftop = 0;

  var min_r, max_r, width;

  if(event.touches) {

    var touches = event.touches;

    // Bit of code to calculate the actual Left and Top offsets by adding offsets 

    // of each parent back through the hierarchy

    var tgt = event.touches[0].target;

    while (tgt) {

      tgtoffleft = tgtoffleft + tgt.offsetLeft;

      tgtofftop = tgtofftop + tgt.offsetTop;

      tgt = tgt.offsetParent;

    }

    // x = (touches[0].pageX - touches[0].target.offsetLeft) - PIVOT_X;

    // y = PIVOT_Y - (touches[0].pageY - touches[0].target.offsetTop);

    x = (touches[0].pageX - tgtoffleft) - PIVOT_X;

    y = PIVOT_Y - (touches[0].pageY - tgtofftop);

  }

  else {

    x = event.offsetX - PIVOT_X;

    y = PIVOT_Y - event.offsetY;

  }

  /* cartesian to polar coordinate conversion */

  r = Math.sqrt(x * x + y * y);

  a = Math.atan2(y, x);

  mouse_xyra.x = x;

  mouse_xyra.y = y;

  mouse_xyra.r = r;

  mouse_xyra.a = a;

  if((r >= MIN_TOUCH_RADIUS) && (r <= MAX_TOUCH_RADIUS))

    return true;

  else

    return false;

}

//_________________________________$           

            

//*******************************

// current application time, in milliseconds.

var applicationTime = 0;    

// scale applied to time. 

// 1 means no scale, <1 is slower, >1 faster.

var timeSpeed = 1;

// after launchAnimation is called, 

//  draw/handleInput/update will get called on each rAF

function launchAnimation() {

    requestAnimationFrame(_launchAnimation);

}

// ------------- Private methods ----------------

function _launchAnimation(now) {

    _lastTime = now;

    applicationTime = 0

    requestAnimationFrame(_animate);

}

// ----------------------------------------------

// Animation.

//   Use launchAnimate() to start the animation.

//     draw, handleInput, update will be called every frame.

// ----------------------------------------------

function _animate(now) {

    requestAnimationFrame(_animate);

    // _______________________

    var dt = now - _lastTime;

    if (dt < 12) return; // 60 HZ max

    if (dt > 200) dt = 16; // consider 1 frame elapse on tab-out 

    _lastTime = now;

    dt *= timeSpeed;

    applicationTime += dt;

    // _______________________

    handleInput(); // ...

    // update everything with this frame time step.

    update(dt);

    // draw everything    

    draw();

}

var _lastTime = 0;

//*******************************

window.onresize = function() {

  stage.x = window.innerWidth*window.devicePixelRatio;

  stage.y = window.innerHeight*window.devicePixelRatio;

  grid = [];

  for(var x = 0; x < Math.floor(stage.x / opt.count) + 1 * 50; x++){

    for(var y = 0; y < Math.floor(stage.y / opt.count) + 1 * 50; y++){

      grid.push({

        x : x * opt.count,

        y : y * opt.count,

        vel : {

          x : 0,

          y : 0

        }

      });

    }

  }

}

//______touch______

function touchStart(evt) {

  var changedTouches = evt.changedTouches;   

  for (var i = 0; i < changedTouches.length; i++) {

    // remember new touches and its key

    var key = changedTouches[i].target;

    touches.push({ id : changedTouches[i].identifier, key: key });

  }

  updateKeys();

}

function touchEnd(evt) {

  var changedTouches = evt.changedTouches;

  for (var i = 0; i < changedTouches.length; i++) {

    // Remove this touch

    var index = getTouchIndex(changedTouches[i].identifier);

    if (index >= 0) {

        touches.splice(index, 1);

    }  

  }

  updateKeys();

}

//_________touch_____

//___touch2___

function touchMove(evt) {

  var changedTouches = evt.changedTouches;

  for (var i = 0; i < changedTouches.length; i++) {

    var touch = changedTouches[i];

    var index = getTouchIndex(touch.identifier);

    if (index >= 0) {

      // Update stored key to the new key

      var key = document.elementFromPoint(touch.pageX, touch.pageY);

      if (isKey(key))

        touches[index].key = key;

    }      

  }

  updateKeys();

}

//___touch2____

//______________________________________________ render

var render = function (time) { 

  requestAnimationFrame( render );

 c.fillRect(0,0,stage.x,stage.y);

  draw(time);

};

render();};

/*

┈┈┈╲┈┈┈┈╱

 ┈┈╱    ▔╲

┈┈┃┈▇┈┈▇┈┃

╭╮┣━━━━━━┫╭╮

┃┃┃┈┈┈┈┈┈┃┃┃

╰╯┃┈┈┈┈┈┈┃╰╯

┈┈╰┓┏━━┓┏╯

┈┈┈╰╯┈┈╰╯      

😊You r always welcome 😊

The EnD

*/

