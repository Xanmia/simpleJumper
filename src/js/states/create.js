$.create = function () {
    var container = document.getElementById('blockContainer');
    document.body.style.overflow = "auto";

    $.offset = { x: 0, y: 0 };
    this.selected = undefined;
    this.blockType = 0;
    var blocks = [];
    // blocks.push(new $.block({ x: 100, y: 500, w: 200, init: function () { tween.to(this, { x: this.x + 200 }, 90, 1000); }, t: 0 }));
    // blocks.push(new $.block({ x: 300, y: 100, w: 200, init: function () { tween.to(this, { x: this.x + 200 }, 90, 1000); }, t: 0 }));

    //  buildLevel(currentLevel);
    //       $.util.popChat($.W / 2, $.H / 2 - 40, ["Time for a lesson!", "Right arrow and left arrow move me", "Space makes me jump", "Lets jump(Space) to that platform above."]);
    var customContainer = document.getElementById('my-gui-container');

    var add = document.createElement('div');
    add.innerText = "+";
    add.addEventListener('mouseup', function () { $.state.addNew(); });
    customContainer.appendChild(add);

    var typeB = document.createElement('div');
    typeB.innerText = this.blockType;
    typeB.addEventListener('mouseup', function () { $.state.changeType(); });
    customContainer.appendChild(typeB);

    var remove = document.createElement('div');
    remove.innerText = "X";
    remove.addEventListener('mouseup', function () { $.state.selected.kill(); blocks.splice(blocks.indexOf($.state.selected), 1); });
    customContainer.appendChild(remove);

    var test = document.createElement('div');
    test.innerText = "Test";
    test.addEventListener('mouseup', function () { if (!$.myplayer) { $.myplayer = new $.player(); document.body.style.overflow = "hidden"; } else { document.body.style.overflow = "auto"; $.myplayer = undefined; $.offset = { x: 0, y: 0 }; } });
    customContainer.appendChild(test);



    var save = document.createElement('div');
    save.innerText = "Save";
    save.addEventListener('mouseup', function () { open('data:text/json;,' + JSON.stringify(blocks)); });
    customContainer.appendChild(save);

    var heightIncrease = document.createElement('div');
    heightIncrease.innerText = "+";
      heightIncrease.classList.add("createButtons");
    heightIncrease.addEventListener('click', function () { $.state.selected.h *=2;});
    document.body.appendChild(heightIncrease);

    var widthIncrease = document.createElement('div');
    widthIncrease.innerText ="+";
    widthIncrease.classList.add("createButtons");
    widthIncrease.addEventListener('click', function () { $.state.selected.w *=2; });
    document.body.appendChild(widthIncrease);

    var heightD = document.createElement('div');
    heightD.innerText = "-";
      heightD.classList.add("createButtons");
    heightD.addEventListener('click', function () { $.state.selected.h /=2;});
    document.body.appendChild(heightD);

    var widthD = document.createElement('div');
    widthD.innerText ="-";
    widthD.classList.add("createButtons");
    widthD.addEventListener('click', function () { $.state.selected.w /=2; });
    document.body.appendChild(widthD);

    this.buildLevel = function (levelInfo) {
      //  var levelInfo = _l;
        for (var i = 0; i < levelInfo.length; i++) {
            blocks.push(new $.block(levelInfo[i]));
        }

    }

    // customContainer.innerText = "+";
    // customContainer.addEventListener('mouseup', function(){$.state.addNew();});

    this.addNew = function () {
        blocks.push(new $.block({ x: 100, y: 500, t: Object.keys($.blocks)[this.blockType] }));
    }

    this.changeType = function () {
        this.blockType = this.blockType >= Object.keys($.blocks).length - 1 ? 0 : this.blockType += 1;
    }

    this.update = function () {

        typeB.innerText = $.blocks[Object.keys($.blocks)[this.blockType]].name;
        i = blocks.length; while (i--) { blocks[i].update(); };

        if ($.myplayer) {
            $.myplayer.update(blocks);
            $.offset = { x: -($.myplayer.x - ($.W / 2)), y: -($.myplayer.y - ($.H / 2)) };
        }


        //  if($.mouse.click){
        //      blocks.push(new $.block({x:100,y:500,w:200,init: function () { tween.to(this, { x: this.x + 200 }, 90, 1000); },t:0}));
        // $.mouse.click = 0;
        //  }

        // timer.innerText = $.elapsed.toFixed(2);
        // $.myplayer.update(blocks);
        // $.offset = { x: -($.myplayer.x - ($.W / 2)), y: -($.myplayer.y - ($.H / 2)) };
        //back.update($.myplayer.x,$.myplayer.y);
    }

    this.render = function () {
        if(this.selected){
            widthIncrease.style.left = (this.selected.x + this.selected.w) + 'px';
            widthIncrease.style.top = this.selected.y + (this.selected.h/3) + 'px'; 
            
            heightIncrease.style.left = (this.selected.x + (this.selected.w/2)) + 'px';
            heightIncrease.style.top = this.selected.y - 50 + 'px'; 

            widthD.style.left = (this.selected.x-20) + 'px';
            widthD.style.top = this.selected.y + (this.selected.h/3) + 'px'; 
            
            heightD.style.left = (this.selected.x + (this.selected.w/2)) + 'px';
            heightD.style.top = this.selected.y + this.selected.h + 'px'; 
        }

      //  $.mainctx.translate($.offset.x, $.offset.y);

        i = blocks.length; while (i--) { blocks[i].render(); };
        if ($.myplayer) {
            $.myplayer.render();
        }

    }
}