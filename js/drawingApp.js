var started = false;

$( document ).ready(function() {
  // Draw a circle. 
  var c1 = document.getElementById("myCanvas1");
  var ctx = c1.getContext("2d");
  ctx.beginPath();
  ctx.arc(95,50,40,0,2*Math.PI);
  ctx.stroke();

  // Draw a square.
  var c2 = document.getElementById("myCanvas2");
  var ctx = c2.getContext("2d");
  ctx.rect(20, 20, 100, 100);
  ctx.stroke();

  // Draw a line.
  var c3 = document.getElementById("myCanvas3");
  var ctx = c3.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(30, 100);
  ctx.lineTo(170, 100);
  ctx.stroke();

  document.getElementById("myMainCanvas").addEventListener("mousemove", ev_mousemove, false);
});


function ev_mousemove (ev) {
	var x, y;
        var canvas = document.getElementById("myMainCanvas");
        var context = canvas.getContext("2d");
        context = canvas.getContext('2d');
        if (!context) {
          alert('Error: failed to getContext!');
          return;
        }


	// Get the mouse position relative to the <canvas> element
	if (ev.layerX || ev.layerX == 0) { // Firefox
		x = ev.layerX;
		y = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		x = ev.offsetX;
		y = ev.offsetY;
	}

	// The event handler works like a drawing pencil which
	// tracks the mouse movements. We start drawing a path made up of lines
	if (!started) {
		context.beginPath();
		context.moveTo(x, y);
		started = true;
	} else {
		context.lineTo(x, y);
		context.stroke();
	}
}



