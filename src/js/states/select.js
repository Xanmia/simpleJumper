$.select = function (_l) {
    var gameProgress = new $.gameLoad();
    document.getElementById('game').classList.add("blurMe");
    var customContainer = document.getElementById('overlay');
    var levelNum = _l||Math.min(gameProgress.data.scores.length,$.level.length-1);

    var levelName = document.createElement('div');
        levelName.classList.add('bigText');
    levelName.innerText = "Level " + levelNum;
    customContainer.appendChild(levelName);


    var prev = document.createElement('div');
    prev.innerText = "<";
    prev.classList.add('links');
    prev.classList.add('leftArrow');
    prev.addEventListener('click', function () { if (levelNum > 0) { levelNum--; }; changeLevel(); });
    customContainer.appendChild(prev);



    var Scores = document.createElement('div');
    Scores.classList.add('leader');
    Scores.innerText = "";//$.scores[levelNum];//"1 - Xanmia - 19.23";
    customContainer.appendChild(Scores);
    
    var Next = document.createElement('div');
    Next.innerText = ">";
    Next.classList.add('links');
      Next.classList.add('rightArrow');
    Next.addEventListener('click', function () { if (levelNum < $.level.length - 1 && gameProgress.data.scores[levelNum].length> 0) { levelNum++; }; changeLevel(); });
    customContainer.appendChild(Next);

    var Play = document.createElement('div');
    Play.classList.add('bigText');
    Play.innerText = "Play";
    Play.classList.add('links');
    Play.addEventListener('click', function () {$.state.destroy();   document.getElementById('game').classList.remove("blurMe"); customContainer.innerHTML = ""; $.state.buildLevel(levelNum); });
    customContainer.appendChild(Play);

    //Level 1
    //Previous button --- Next button
    //div best times in current level

    var changeLevel = function () {
        levelName.innerText = "Level " + levelNum;
        Scores.innerHTML = "";
         var cScore = gameProgress.data.scores[levelNum]||[];
     /*   var cScore = gameProgress.data.scores[levelNum].sort(function (a, b) {
            if (a.s > b.s) {
                return 1;
            }
            if (a.s < b.s) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        */
        
        for (var i = 0; i < 5; i++) {
            if(cScore[i]){
                Scores.innerHTML +=  "<li><span class='list_num'>" + (i + 1) + "</span><h2>" +  cScore[i].n + "<span class='number'>" + cScore[i].s + "</span></h2></li>";
            }
            else{
                Scores.innerHTML +=  "<li><span class='list_num'>" + (i + 1) + "</span><h2>default user<span class='number'>99999.9</span></h2></li>";
            }
            //Scores.innerHTML += i + 1 + " - " + cScore[i].n + " - " + cScore[i].s + "<br/>";//"1 - Xanmia - 19.23";
        }
    }

    changeLevel();

    this.update = function () {


    }

    this.render = function () {


        //  Scores.innerText = $.scores[levelNum][i].r   ;//"1 - Xanmia - 19.23";
    }
}