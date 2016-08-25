//$.blockType = { bounce: 0, finish: 1 };
$.behavior = {
    bounce: function () { if ($.myplayer.velocityY <= 0) { $.myplayer.velocityY = 30; $.myplayer.addAnim('bounce'); } },
    slow: function () { $.myplayer.velocityY = $.myplayer.weight; $.myplayer.y = this.y - $.myplayer.h; console.log(collide); }
}

//$.blocks = { bounce: 0, stick: 1, slider: 2, finish: 4, leftwall: 5, rightwall: 6, floor: 7 };
//$.blocks = { 0: 0, 1: 1, 2: 2, 4: 4, 5: 5, 6: 6, 7: 7 };

//$.blockType = { bounce: function(){$.blockBehaviors.bounce();}, finish: $.blockBehaviors.stick };

$.block = function (opt) {
    //var type = opt || $.blockBehaviors[0];
    for (var e in $.blockBehaviors[$.blocks[opt.t].id]) {
        this[e] = $.blockBehaviors[$.blocks[opt.t].id][e];
    }
    for (var e in opt) {  //level defs will over right defaults in block behaviors
        this[e] = opt[e];
    }

    this.add = this.add || function () { };
    this.style = this.style || "cube";
    this.init = this.init || function () { };
    this.x = this.x || 100;
    this.y = this.y || 100;

    this.w = this.w || 160;
    this.h = this.h || 40;
    //var htmlOBJ = document.getElementById("cube");
    var htmlOBJ = document.createElement('div');
    var container = document.getElementById('blockContainer');
    // htmlOBJ.classList.add('note');
    var status = true;
    htmlOBJ.className = this.style;
    //  htmlOBJ.classList.add('cube'); 

    //  htmlOBJ.classList.add('finish');// could add animation option for diff behavior.
    this.init();
    htmlOBJ.style.width = this.w + 'px';
    htmlOBJ.style.height = this.h + 'px';
    //  htmlOBJ.innerText = "bounce";
    container.appendChild(htmlOBJ);

    this.kill = function () {
        container.removeChild(htmlOBJ);

        //       htmlOBJ.classList.add('destroy');
        //   htmlOBJ.style.marginLeft = $.W / 2 + "px";
        //   htmlOBJ.style.marginTop = $.H / 2 + "px";
        //      htmlOBJ.addEventListener("animationend", AnimationEnded, false);
        //     function AnimationEnded() {
        //        container.removeChild(htmlOBJ);
        //   }
        this.follow = false;
    }

    this.update = function () {
        /////create
        if ($.mouse.click && $.util.rectInRect({ x: $.mouse.x, y: $.mouse.y, h: 1, w: 1 }, { x: this.x, y: this.y, h: this.h, w: this.w }) && !this.follow && !$.mouse.dragging) {
            this.follow = { x: $.mouse.x - this.x, y: $.mouse.y - this.y };
            $.state.selected = this;
            $.mouse.dragging = 1;
        }
        else if (!$.mouse.click && this.follow) {
            this.follow = false;
            $.mouse.dragging = 0;
            this.init();
        }
        if (this.follow) {
            this.x = $.mouse.x - this.follow.x;
            this.y = $.mouse.y - this.follow.y;
        }
        ///////
    };
    this.render = function () {
        //    if (status) {
        htmlOBJ.style.marginLeft = $.offset.x + this.x + "px";
        htmlOBJ.style.marginTop = $.offset.y + this.y + "px";
        htmlOBJ.style.width = this.w + 'px';
        htmlOBJ.style.height = this.h + 'px';
        //    }

        // htmlOBJ.style.marginTop = this.y-$.myplayer.y + "px";
        //  $.mainctx.fillStyle = 'rgb(255,0,0)';
        //$.mainctx.fillRect(this.x, this.y, this.w, this.h);
    }
}