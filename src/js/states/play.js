$.play = function (l) {
    var customContainer = document.getElementById('my-gui-container');

    var selecter = new $.select();
    var timer = document.getElementById('timer');
    $.myplayer = new $.player();
    var currentLevel = l || 0;

    $.offset = { x: -($.myplayer.x - ($.W) / 2), y: -($.myplayer.y - ($.H / 2)) };
    var status = false;
    var blocks = [];

    var coderEnemy = new $.coder();
    this.buildLevel = function (_i) {
        var l = _i;
        currentLevel = l;
        var levelInfo = $.level[l].b;
        for (var i = 0; i < levelInfo.length; i++) {
            // blocks.push(new $.block(levelInfo[i].x, levelInfo[i].y, $.blockBehaviors[levelInfo[i].t]));
            blocks.push(new $.block(levelInfo[i]));
        }
        $.myplayer.x = $.level[l].p.x;
        $.myplayer.y = $.level[l].p.y;
        $.elapsed = 0;
        $.myplayer.reset();
        status = true;
        
        customContainer.innerHTML = "";
        var pause = document.createElement('div');
        pause.innerText = "||";
        pause.addEventListener('click', function () { $.myplayer.addAnim();   status=false; customContainer.innerHTML = ""; selecter = new $.select(currentLevel); });
        customContainer.appendChild(pause);
        // document.body.classList.add("blurMe");
        $.util.popChat($.W / 2, $.H / 2 - 40, $.tutorial[l], 'tut');
    }

    this.showSelecter = function(){
         selecter = new $.select(currentLevel);
    }

    //  buildLevel(currentLevel);
    //       $.util.popChat($.W / 2, $.H / 2 - 40, ["Time for a lesson!", "Right arrow and left arrow move me", "Space makes me jump", "Lets jump(Space) to that platform above."]);


    ////remove, just settings 
    /*
    var gui = new dat.GUI({ autoPlace: false });
    gui.add($.myplayer, 'latMovement', 0, 50);
    gui.add($.myplayer, 'maxJumpHeight', -50, 50);
    gui.add($.myplayer, 'gravity', -50, 0);
    gui.add($.myplayer, 'weight', -10, 50);
    gui.add($.myplayer, 'status');
    gui.add($.myplayer, 'jump');
  
  
  var customContainer = document.getElementById('my-gui-container');
  customContainer.appendChild(gui.domElement);
  */
    //////

    this.destroy = function () {
        //new level
        //         $.util.popChat($.W/2,$.H/2-40,["Time for a lesson!","Right arrow and left arrow move me", "Space makes me jump", "Lets jump(Space) to that platform above."]);
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].kill();

        }
        blocks = [];

        // buildLevel(currentLevel);
        //selecter = new $.select(currentLevel);
        // $.myplayer.reset();
        // status = true;



    }

    this.nextLevel = function () {
        status = false;

        var removeNotes = document.getElementsByClassName("note tut");
         i = removeNotes.length; while (i--) { 
                     document.body.removeChild(removeNotes[i]);
            };


        customContainer.innerHTML = "";
        $.gameProgress.saveScore(currentLevel, $.elapsed.toFixed(2));
        currentLevel += 1;
    //    var nextLevel = document.getElementById("level");
    //    nextLevel.className = "";
    //    nextLevel.innerText = "Level " + (currentLevel + 1);
    //    void nextLevel.offsetWidth;
   //     nextLevel.className = "note successNote middle";
    }

    this.update = function () {
        if (status) {
            timer.innerText = $.elapsed.toFixed(2);
            $.myplayer.update(blocks);
            $.offset = { x: -($.myplayer.x - ($.W / 2)), y: -($.myplayer.y - ($.H / 2)) };
        }

        //back.update($.myplayer.x,$.myplayer.y);
    }

    this.render = function () {
        if (status) {
        //    coderEnemy.render();
           // $.mainctx.translate($.offset.x, $.offset.y);

            i = blocks.length; while (i--) { blocks[i].render(); };
            $.myplayer.render();
        }


    }
}