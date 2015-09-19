var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    drag = false,
    rect = {},
    drawingType,
    boxes = [],
    currObj = 0,
    theColor = '#337AB7',
    dot_flag = false;


var x = "black",
    y = 2;

$( document ).ready(function() {
  
 
  // Draw a circle. 
  var c1 = document.getElementById("myCanvas1");
  var ctx = c1.getContext("2d");
  ctx.beginPath();
  ctx.arc(70,75,50,0,2*Math.PI);
  ctx.strokeStyle = '#337AB7';
  ctx.stroke();

  // Draw a square.
  var c2 = document.getElementById("myCanvas2");
  var ctx = c2.getContext("2d");
  ctx.rect(25, 30, 100, 100);
  ctx.strokeStyle = '#337AB7';
  ctx.stroke();

  // Draw a line.
  var c3 = document.getElementById("myCanvas3");
  var ctx = c3.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(30, 70);
  ctx.lineTo(120, 70);
  ctx.strokeStyle = '#337AB7';
  ctx.stroke();

  $(".myCanvas").click(function() {
    drawingType = $(this).attr('id');
    if(drawingType == 'myCanvasTrash') {
      erase();
    }
  });
});

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e, drawingType)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e, drawingType)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e, drawingType)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e, drawingType)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            theColor = "green";
            break;
        case "blue":
            theColor = "blue";
            break;
        case "red":
            theColor = "red";
            break;
        case "yellow":
            theColor = "yellow";
            break;
        case "orange":
            theColor = "orange";
            break;
        case "black":
            theColor = "black";
            break;
        case "white":
            theColor = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = theColor;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function Box() {
  this.x = 0;
  this.y = 0;
  this.w = 1; // default width and height?
  this.h = 1;
  this.fill = '#444444';
}

function drawSquare() {
  var rect = new Box;
  rect.x = currX;
  rect.y = currY;
  rect.w = prevX; 
  rect.h = prevY;
  //rect.fill = fill;
  ctx.fillStyle = theColor; 
  boxes[currObj] = rect;
  ctx.fillRect(prevX, prevY, currX, currY);
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(prevX, prevY, Math.abs(prevY-currY), 5, 44 * Math.PI);
  ctx.fillStyle = theColor; 
  ctx.fill();
  ctx.stroke();
}

function drawLine() {

}


function erase() {
    ctx.clearRect(boxes[currObj].w, boxes[currObj].h, boxes[currObj].x, boxes[currObj].y);
    if(currObj !=0) {
      currObj = currObj - 1;
    }

}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e, drawingType) {
  if(drawingType == 'myCanvas4') {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
  }

  if(drawingType == 'myCanvas0') {
    if (res == 'down') {
      drag = true;
    }
    if (res == 'up' || res == "out") {
      drag = false;
    }
    if (res == 'move') {
      if (drag) {
      }
    }
  }

  if(drawingType == 'myCanvas1') {
    if (res == 'down') {
      prevX = e.clientX - canvas.offsetLeft;
      prevY = e.clientY - canvas.offsetTop;
      drag = true;
    }
    if (res == 'up' || res == "out") {
      drag = false;
    }
    if (res == 'move') {
      if (drag) {
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        drawCircle();
      }
    }
  }
  
  if(drawingType == 'myCanvas2') {
    if (res == 'down') {
      prevX = e.clientX - canvas.offsetLeft;
      prevY = e.clientY - canvas.offsetTop;
      currObj = currObj + 1;
      drag = true;
    }
    if (res == 'up' || res == "out") {
      drag = false;
    }
    if (res == 'move') {
      if (drag) {
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        drawSquare();
      }
    }
  }
}

function findxyShape(res, e) {
    if (res == 'down') {
      prevX = e.clientX - canvas.offsetLeft;
      prevY = e.clientY - canvas.offsetTop;
      drag = true;
    }
    if (res == 'up' || res == "out") {
      drag = false;
    }
    if (res == 'move') {
      if (drag) {
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        drawSquare();
      }
    }
}
