/**
 * Created by Тима on 30.10.2017.
 */


var xhr = new XMLHttpRequest();
var fieldParams;
var linksPicture = ['https://kde.link/test/1.png',
                    'https://kde.link/test/2.png',
                    'https://kde.link/test/9.png',
                    'https://kde.link/test/7.png',
                    'https://kde.link/test/6.png',
                    'https://kde.link/test/3.png',
                    'https://kde.link/test/4.png',
                    'https://kde.link/test/0.png',
                    'https://kde.link/test/5.png',
                    'https://kde.link/test/8.png'];

xhr.open('GET', 'https://kde.link/test/get_field_size.php', true);

xhr.send();

xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState !== 4) return;

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);

    } else {
        fieldParams = JSON.parse(xhr.response);
        creatingGame(fieldParams);
    }

};

function creatingGame(fieldPar) {
    var imagesAmount =  fieldPar.width * fieldPar.height;
    var count = 1;
    var mainBlock = document.querySelector('.main-block');
    var ul = document.createElement('ul');
    for (var i = 0; i<fieldPar.height; i++) {
        for (var j = 0; j<fieldPar.width; j++) {
            var img = document.createElement('img');
            var li = document.createElement('li');
            img.setAttribute('class', 'img' + count);
            if (i > 0 && j === 0) {
                var br = document.createElement('br');
                ul.appendChild(br);
            }
            li.appendChild(img);
            ul.appendChild(li);
            count++;
        }
    }
    mainBlock.appendChild(ul);
    function getRandom(random2) {
        var random = Math.floor(Math.random() * (imagesAmount - 1 + 1)) + 1;
        img = document.querySelector('.img' + random);
        if (img.getAttribute('src') !== null) getRandom(random2);
        else if (img.getAttribute('src') === null) img.setAttribute('src', linksPicture[random2-1]);
    }
    for (i = 0; i<imagesAmount / 2; i++) {
        var random2 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        getRandom(random2);
        getRandom(random2);
        if (i === imagesAmount/2 - 1) setHandler();
    }
}
function setHandler() {
    var allLi = document.querySelectorAll('li');
    var clickedImages = [];
    for (i = 0; i<allLi.length; i++) {
        allLi[i].onclick = function clickHandler() {
            if (clickedImages.length === 2) {
                clickedImages[0].setAttribute('style', 'display: none');
                clickedImages[1].setAttribute('style', 'display: none');
                clickedImages = [];
            }
            this.firstChild.setAttribute('style', 'display: inline-block');
            clickedImages.push(this.firstChild);
            if (clickedImages.length === 2) {
                isRightChoice();
            }
        };
    }
    function isRightChoice() {
        var img1 = clickedImages[0].getAttribute('src');
        var img2 = clickedImages[1].getAttribute('src');
        if (img1 === img2) {
            setTimeout(function () {
                clickedImages[0].parentElement.onclick = null;
                clickedImages[0].setAttribute('style', 'display: none');
                clickedImages[0].parentElement.setAttribute('style', 'background: #fff');
                clickedImages[1].parentElement.onclick = null;
                clickedImages[1].setAttribute('style', 'display: none');
                clickedImages[1].parentElement.setAttribute('style', 'background: #fff');
            }, 500);
        }
    }
}


