var emitter = (function () {

    function startEmit(_total, _x, _y, _dur, _settings, _changes) {
        var objs = []
        var duration = _dur;
        var settings = _settings|| {minX: _x, 
                        maxX:_x+15,
                        minY:_y+20,
                        maxY: _y+20,
                        minW:10,
                        maxW:30,
                        minH:10,
                        maxH:30,
                        minL:1,
                        maxL:5000
                    };
        var changes = _changes || { minX: 0, 
                        maxX: .1,
                        minY: .02,
                        maxY: .1,
                        minW:-.2,
                        maxW:-.1,
                        minH:-.2,
                        maxH:-.1} 
        
        //life min / max
        //x min / max
        //y min / max
        //w min / max
        //h min / max 

        //{ x: _x, y: _y, w: 3, h: 3, l: Math.random() * 10, change: { x: -Math.random() * 30, y: -Math.random() * 30, w: -.1, h: -.2 } }
        requestAnimationFrame(emit);

        function emit() {
            if (duration > 0) {
                var objsToSpawn = _total;
                while (objsToSpawn--) {//create new objects, init with random x,y,w,h changes based on _element, _element needs to be in the obj
                    var newOBJ = {
                        x: Math.random() * ( settings.maxX - settings.minX ) + settings.minX, 
                        y: Math.random() * ( settings.maxY - settings.minY ) + settings.minY, 
                        w: Math.random() * ( settings.maxW - settings.minW ) + settings.minW, 
                        h: Math.random() * ( settings.maxH - settings.minH ) + settings.minH, 
                        l: Math.random() * ( settings.maxL - settings.minL ) + settings.minL,
                        change: { x: Math.random() * ( changes.maxX - changes.minX ) + changes.minX, 
                                  y: Math.random() * ( changes.maxY - changes.minY ) + changes.minY, 
                                  w: Math.random() * ( changes.maxW - changes.minW ) + changes.minW, 
                                  h: Math.random() * ( changes.maxH - changes.minH ) + changes.minH } 
                    }
                   // Math.random() * ( settings.maxX - settings.minX ) + settings.minX;
                   // Math.random() * ( settings.maxY - settings.minY ) + settings.minY;
                    objs.push(newOBJ);
                }
            }


            var i = objs.length;
            while (i--) { //apply _element, and render objects
                for (ob in objs[i].change) {
                    //objs[i][ob] += objs[i].change[ob];
                    if (ob=='w' || ob=='h'){
                        objs[i][ob] = Math.max(0,objs[i][ob] + objs[i].change[ob]);
                    }
                    else{
                        objs[i][ob] += objs[i].change[ob];
                    }

                }
                

                $.mainctx.save();
   //             $.mainctx.globalCompositeOperation = "screen"; //xor
  //              	var grad = $.mainctx.createRadialGradient(objs[i].x, objs[i].y, 0, objs[i].x, objs[i].y, objs[i].h);
//	grad.addColorStop(0, 'rgba(252, 220, 70, 1)');
//	grad.addColorStop(1, 'rgba(252, 0, 0, .2)');
//	$.mainctx.fillStyle = grad;
                $.mainctx.globalAlpha = objs[i].l/100;
                $.mainctx.fillStyle = 'rgb(255,220,20)';
                $.mainctx.fillRect(objs[i].x, objs[i].y, objs[i].w, objs[i].h);
                $.mainctx.restore();
objs[i].l -= 1;
                if (objs[i].l <= 0) { objs.splice(i, 1); }
            }
            duration--;
            //new particle object 


            if (objs.length > 0) { requestAnimationFrame(emit); }

        }
    }

    return {
        start: function (_total, _x, _y, _dur) {
            startEmit(_total, _x, _y, _dur);
        }
    };
})();