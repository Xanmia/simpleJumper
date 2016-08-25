
$.player = function () {
    this.htmlOBJ = document.getElementById("bob");
    this.blockcontainer = document.getElementById('blockContainer');
    this.x = 600;
    this.y = 710;
    this.weight = 1;

    this.velocityY = 0;
    this.velocityX = 0;

    this.latMovement = 1;//5;

    this.maxJumpHeight = 30;
    this.w = 30;
    this.h = 30;
    this.gravity = -15;

    this.lastJump =0;
    this.currjump = 0;

    this.status = true;
}

$.player.prototype.slowmo = function() {
    this.weight *= .1;
    this.latMovement *= .1;
    this.velocityX  *= .1;
    this.velocityY *= .1;
    $.key.up = 0;
}

$.player.prototype.reset = function () {
    this.weight = 1;
    
    this.velocityY = 0;
    this.velocityX = 0;
    // this.x = 600;
    // this.y =710;
    this.status = true;
}

$.player.prototype.jump = function () {
    this.velocityY = this.maxJumpHeight;
   // $.key.space = 0;
   // $.util.popChat($.W / 2, $.H / 2 - 40, ["Boing"]);
}

$.player.prototype.moveLeft = function () {
    if(this.velocityX> -5){
     this.velocityX -= this.latMovement;
    }

}


$.player.prototype.moveRight = function () {
    if(this.velocityX<5){
        this.velocityX += this.latMovement;
    }

}

$.player.prototype.checkCollision = function (objs) {
    var _objs = [];
    var i = objs.length; while (i--) {
        if ($.util.rectInRect(this, objs[i])) {
            _objs.push( { hit: true, e: objs[i] } );
            //return { hit: true, e: objs[i] };
        }
    }
    return _objs; //{ hit: false, e: null };
}

$.player.prototype.addAnim = function (type) {
    this.htmlOBJ.className = "";
    void this.htmlOBJ.offsetWidth;
    //this.htmlOBJ.class = type;
    if(type){this.htmlOBJ.classList.add(type)};

}

$.player.prototype.success = function () {
    this.status = false;
    this.addAnim('success');
    $.state.nextLevel();
    $.util.popChat($.W / 2, $.H / 2 - 40, ["BOOOOOYAH!!!!"]);



    this.htmlOBJ.addEventListener("animationend", AnimationEnded, false);
    function AnimationEnded(e) {
        $.state.destroy();
        $.state.showSelecter();
        e.currentTarget.removeEventListener("animationend", AnimationEnded, false);
    }
}

$.player.prototype.update = function (objs) {
    if (!this.status) { return };

    this.lastJump = this.currjump;
    this.currjump = $.key.space;
    var doJump = (this.lastJump === 0 & this.currjump === 1) ? true : false;

    if ($.key.left) {
        this.moveLeft();
    }
    else if ($.key.right) {
        this.moveRight();
    }


    var collide = this.checkCollision(objs);

    var i = collide.length; while (i--) {
        if (collide[i].hit) {
            // this.addAnim('bounce')

            collide[i].e.ontouch();
            if (doJump) {

                    


                this.addAnim('bounce');
                this.jump();
                collide[i].e.add();
            }


        }
    }

    if (this.velocityY > this.gravity) {//-15 is limit of drop speed  && !collide.hit
        this.velocityY -= this.weight;
    }

    this.y -= this.velocityY;
    this.x += this.velocityX;

 //   this.contain();
  //  this.checkFailure();
    // emitter.start(1, $.myplayer.x, $.myplayer.y, 1);
}

$.player.prototype.contain = function () {
    if (this.x < 0) {
        this.x = 0;
        this.velocityX = 0;
    }
    else if (this.x + this.w >= this.blockcontainer.clientWidth) {//2000 is board length
        this.x = this.blockcontainer.clientWidth - this.w;
        this.velocityX = 0;
    }

    if (this.y > (this.blockcontainer.clientHeight + (this.blockcontainer.clientHeight / 2)) - this.h) {

     //           this.y = ((this.blockcontainer.clientHeight + (this.blockcontainer.clientHeight/ 2)) - this.h);
       //        this.velocityX = 0;
        //   emitter.start(40,this.x,this.y,10);
        //    $.pause = true;
    }
}

$.player.prototype.checkFailure = function () {
    if (this.y > $.H) {
        // this.status = false;
    }

}

$.player.prototype.render = function () {
    //this.htmlOBJ.innerText = $.elapsed;
    this.htmlOBJ.style.marginLeft = $.W / 2 + "px";
    this.htmlOBJ.style.marginTop = $.H / 2 - 5 + "px";

    //  this.htmlOBJ.style.marginLeft = this.x + "px";
    //  this.htmlOBJ.style.marginTop = this.y + "px";
    //  $.mainctx.save();
    //  $.mainctx.fillStyle = 'rgb(0,255,255)';
    //  $.mainctx.fillRect(this.x, this.y, this.w, this.h);
    //  $.mainctx.restore();
}