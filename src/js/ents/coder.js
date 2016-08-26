$.coder = function () {
    var htmlOBJ = document.getElementById("coder");
    var x = 0;
    var y = 0;
    //htmlOBJ.innerText = Object.getOwnPropertyNames($);
    var availOBJS = Object.getOwnPropertyNames($);

    var ttw = 0;
    var textToWrite = "";// $.play.toString();
    var currentIndex = 0;
    getOBJtoWrite();
    function getOBJtoWrite() {
        var i = Math.round(Math.random() * availOBJS.length);
        textToWrite = $[availOBJS[i]].toString();
    }

    this.render = function () {
        ttw+=1;
        if (ttw > 4) {
            htmlOBJ.innerText += textToWrite.charAt(currentIndex);
            currentIndex++;

            if (currentIndex >= textToWrite.length) {
                //y -= htmlOBJ.clientHeight;
                currentIndex = 0;
                htmlOBJ.innerHTML = "";
                y = 0;
                getOBJtoWrite();
            }
            //  htmlOBJ.style.marginLeft = $.offset.x + x + "px";
            // htmlOBJ.style.marginTop = $.offset.y + y + "px";
            if (y + htmlOBJ.clientHeight >= $.H) {
                y -= $.H / 2;
            }

            htmlOBJ.style.top = y + "px";
             ttw = 0;
        }

       
    }

    // y-=.2;


}