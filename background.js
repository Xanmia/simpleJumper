$.background = function (c) {

    // this.camera = $.camera1;
    var w = 5600;
    this.canvas = c||null;
    // this.h = 10;
    // this.behavior = t||$.blockBehaviors.bounce;

    var adjX = 0;
    var adjY = 0;

    this.update = function (x,y) {
        adjX = x;
        adjY = y;
    };
    var mountains = [];
    var mountains2 = [];
    var mountains3 = [];




    create();
    function create(){

       // mountains.push({x:0,y:900});

        var nextX = 0;//, nextY = 0
        while (nextX<w) {
            nextX += Math.random()*100;
            mountains.push({x:nextX,y:-50-Math.random()*100});
            mountains2.push({x:nextX,y:-200-Math.random()*100});
            mountains3.push({x:nextX,y:-280-Math.random()*100});
        }

        mountains.push({x:w,y:900});
        mountains.push({x:0,y:900});
        mountains2.push({x:w,y:900});
        mountains2.push({x:0,y:900});
        mountains3.push({x:w,y:900});
        mountains3.push({x:0,y:900});

    }

    this.render = function () {
        this.canvas.fillStyle = 'rgb(55,0,0)';
        this.canvas.beginPath();
        this.canvas.moveTo(-700, 900);//start 

        for(var pass = 0; pass<mountains3.length; pass++){
           
             this.canvas.lineTo( mountains3[pass].x+(adjX*.45),  mountains3[pass].y+(adjY*.45));
        }
        this.canvas.fill();
        this.canvas.fillStyle = 'rgb(230,230,0)';
        this.canvas.beginPath();
        this.canvas.moveTo(-900, 900);//start 

        for(var pass = 0; pass<mountains2.length; pass++){
             this.canvas.lineTo( mountains2[pass].x+(adjX*.3),  mountains2[pass].y+(adjY*.3));
        }
        this.canvas.fill();
        this.canvas.fillStyle = 'rgb(55,0,0)';
        this.canvas.beginPath();
        this.canvas.moveTo(-1500, 900);//start 

        for(var pass = 0; pass<mountains.length; pass++){
           
             this.canvas.lineTo( mountains[pass].x+(adjX*.15),  mountains[pass].y+(adjY*.15));
        }
        this.canvas.fill();

    }
}