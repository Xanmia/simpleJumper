$.title = function () {
    var bobHTML = document.getElementById("bob");
    var customContainer = document.getElementById('my-gui-container');

    bobHTML.style.marginLeft = $.W / 2 + "px";
    bobHTML.style.marginTop = $.H / 2  + "px";

    bobHTML.style.transform = "scale(7)";

    var play = document.createElement('div');
    play.innerText = "Play";
    play.classList.add('links');
    play.addEventListener('click', function () { customContainer.innerHTML = "";  bobHTML.style.transform = "scale(1)"; $.state = new $.play(); });
    customContainer.appendChild(play);

    var create = document.createElement('div');
    create.innerText = "Create";
    create.classList.add('links');
    create.addEventListener('click', function () { customContainer.innerHTML = "";  bobHTML.style.transform = "scale(1)"; $.state = new $.create; });
    customContainer.appendChild(create);




    this.update = function () {
         

    }

    this.render = function () {


    }
}