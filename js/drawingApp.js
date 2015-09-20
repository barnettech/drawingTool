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
  ctx.arc(48,50,30,0,2*Math.PI);
  ctx.strokeStyle = '#337AB7';
  ctx.stroke();

  // Draw a square.
  var c2 = document.getElementById("myCanvas2");
  var ctx = c2.getContext("2d");
  ctx.rect(20, 23, 55, 55);
  ctx.strokeStyle = '#337AB7';
  ctx.stroke();

  // Draw a line.
  var c3 = document.getElementById("myCanvas3");
  var ctx = c3.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(20, 45);
  ctx.lineTo(80, 45);
  ctx.strokeStyle = '#337AB7';
  ctx.stroke();

  $(".myCanvas").click(function() {
    drawingType = $(this).attr('id');
    if(drawingType == 'myCanvasTrash') {
      erase();
    }
    if(drawingType == 'myCanvasRepeat') {
      redo();
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
    var line = new Shape;
    line.x = currX;
    line.y = currY;
    line.w = prevX; 
    line.h = prevY;
    line.type = 'lines';
    boxes[currObj] = line;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = theColor;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function Shape() {
  this.x = 0;
  this.y = 0;
  this.w = 1;
  this.h = 1;
  this.type = 'rectangle';
  this.fill = '#444444';
}

function drawSquare() {
  var rect = new Shape;
  rect.x = currX;
  rect.y = currY;
  rect.w = prevX; 
  rect.h = prevY;
  rect.type = 'rectangle';
  ctx.fillStyle = theColor; 
  boxes[currObj] = rect;
  ctx.fillRect(prevX, prevY, currX, currY);
}

function drawCircle() {
  var cir = new Shape;
  cir.x = currX;
  cir.y = currY;
  cir.w = prevX; 
  cir.h = prevY;
  cir.type = 'circle';
  boxes[currObj] = cir;
  
  ctx.beginPath();
  ctx.arc(prevX, prevY, Math.abs(prevY-currY), 5, 44 * Math.PI);
  ctx.fillStyle = theColor; 
  ctx.fill();
  ctx.stroke();
}


function erase() {
    if(boxes[currObj].type == 'rectangle') {
      ctx.clearRect(boxes[currObj].w, boxes[currObj].h, boxes[currObj].x, boxes[currObj].y);
    }
    else if(boxes[currObj].type == 'circle') {
       //ctx.clearRect(boxes[currObj].w-225, boxes[currObj].h-225, boxes[currObj].w*3, boxes[currObj].w*3);
       ctx.beginPath();
       ctx.arc(boxes[currObj].w, boxes[currObj].h, Math.abs(boxes[currObj].h - boxes[currObj].y), 5, 44 * Math.PI);
       ctx.fillStyle = 'white';
       ctx.strokeStyle = 'white';
       ctx.lineWidth = y*12;
       ctx.fill();
       ctx.stroke();
    }
    else if(boxes[currObj].type == 'lines') {
      ctx.beginPath();
      ctx.moveTo(boxes[currObj].w, boxes[currObj].h);
      ctx.lineTo(boxes[currObj].x, boxes[currObj].y);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = y*12;
      ctx.stroke();
      ctx.closePath();
    }

    if(currObj != 1) {
      currObj = currObj - 1;
    }

}

function redo() {
  if(boxes[currObj].type == 'rectangle') {
    ctx.fillRect(boxes[currObj].w,boxes[currObj].h, boxes[currObj].x, boxes[currObj].y);
  }
  else if(boxes[currObj].type == 'circle') {
    ctx.beginPath();
    ctx.arc(boxes[currObj].w, boxes[currObj].h, Math.abs(boxes[currObj].h - boxes[currObj].y), 5, 44 * Math.PI);
    ctx.fillStyle = theColor; 
    ctx.fill();
    ctx.stroke();
  }
  else if(boxes[currObj].type == 'lines') {
    ctx.beginPath();
    ctx.moveTo(boxes[currObj].w, boxes[currObj].h);
    ctx.lineTo(boxes[currObj].x, boxes[currObj].y);
    ctx.strokeStyle = theColor;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
  }
  if(currObj != boxes.length-1) {
      currObj = currObj + 1;
  }
}

/*function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}*/

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
            currObj = currObj + 1;
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

  if(drawingType == 'myCanvas3') {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        currObj = currObj + 1;
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
    if (res == 'up') {
        flag = true;
         if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
    if (res == 'move') {
      flag = false;       
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
