

$.mouse = {
    click: 0,
    x: 0,
    y: 0,
    draging: 0
}

$.key = {
    left: 0,
    right: 0,
    up: 0,
    space: 0
}

$.offset = {
    x: 0,
    y: 0
}

$.dt = 0;
$.lt = 0;
$.elapsed = 0;

//$.entities = [];
$.state = '';

$.pause = false;

$.W = window.innerWidth;
$.H = window.innerHeight;

$.setup = function () {
   // $.main = document.getElementById('main');
//    $.mainctx = $.main.getContext('2d');

    $.gameProgress = new $.gameLoad();

  //  $.main.width = $.W;
   // $.main.height = $.H;

    window.addEventListener('mousedown', $.mousedown);
    window.addEventListener('mousemove', $.mousemove);
    window.addEventListener('mouseup', $.mouseup);
    window.addEventListener('keydown', $.keydown, false);
    window.addEventListener('keyup', $.keyup,false);
    window.addEventListener('touchstart',$.touchstart);
	window.addEventListener('touchmove',$.touchMove );
	window.addEventListener('touchend',$.touchend );

    document.getElementById("username").value = $.gameProgress.data.user;
    $.state = new $.title();
    $.loop();
}

$.mousedown = function (e) {
    if($.state instanceof $.play) {e.preventDefault()};
    $.mouse.click = 1;
    $.mouse.x = e.pageX;
    $.mouse.y = e.pageY;
}

$.mousemove = function (e) {
    $.mouse.x = e.pageX;
    $.mouse.y = e.pageY;
}

$.mouseup = function (e) {
    $.mouse.click = 0;
    $.mouse.x = 0;
    $.mouse.y = 0;
}

$.touchstart = function (e) {
    //e.preventDefault();
	//$.Player.moveTimer = 7;
	e = e.touches ? e.touches[e.touches.length - 1] : e;
	if(e.clientX < $.W/4){$.key.left = 1;}
	if(e.clientX > $.W-($.W/4)){$.key.right = 1;}
	if(e.clientY < $.H/4){$.key.up = 1;}
	if(e.clientY > $.H - ($.H/4)){$.key.space = 1;}
	
};

$.touchmove = function (e) {
   // e.preventDefault();
};

$.touchend = function (e) {
   //if($.state instanceof $.play) {e.preventDefault()};
	$.key.left = 0;
	$.key.right = 0;
	$.key.up = 0;
	$.key.space = 0;
};


$.keydown = function (e) {
   if($.state instanceof $.play) {e.preventDefault()};
    if (e.keyCode === 37) { $.key.left = 1; };
    if (e.keyCode === 39) { $.key.right = 1; };
    if (e.keyCode === 32) { $.key.space = 1; };//32
    if (e.keyCode === 38) { $.key.up = 1; };
}

$.keyup = function (e) {

    if (e.keyCode === 37) { $.key.left = 0; };
    if (e.keyCode === 39) { $.key.right = 0; };
    if (e.keyCode === 32) { $.key.space = 0; };
    if (e.keyCode === 38) { $.key.up = 0; };
}


$.updateDelta = function () {
    var now = Date.now();
    $.dt = (now - $.lt) / (1000 / 60);
  //  $.dt = ($.dt < 0) ? 0.001 : $.dt;
  //  $.dt = ($.dt > 10) ? 10 : $.dt;
    $.lt = now;
    $.elapsed += $.dt / 60;
}


$.loop = function () {
    window.requestAnimFrame($.loop);
    if (!$.pause) {
        $.update();
        $.render();
    }

}

$.update = function () {
    $.updateDelta();
    $.state.update();
}

$.render = function () {
 //   $.mainctx.restore();
 //   $.mainctx.save();
    //$.fxctx.clearRect(0, 0, window.innerWidth,window.innerHeight);
 //   $.mainctx.clearRect(0, 0, $.W, $.H);
    $.state.render();
  //  for (var i = 0; i < $.entities.length; i++) {
  //      $.entities[i].render();
 //   }
}

window.addEventListener('load', function () {
    $.setup();
});