/**
 * Created by Ji-Hye Park on 2017-03-02.
 */

/*로그인 modal 시작*/
'use strict';

var Modal = (function() {

    var defaults, property, modalOverlay, modalContainer, modalContent, modalCloseBtn, bodyWidth, modalWidth, marginLeft;
    var $body = document.body;

    function bindEvent(elem, eventType, listener, option) {
        if (elem.addEventListener) {
            elem.addEventListener(eventType, listener, option);
        } else if (elem.attachEvent)  {
            elem.attachEvent(eventType, listener);
        } else {
            elem[eventType] = listener;
        }
    }

    function Modal() {
        defaults = {
            className: 'js-modal',
            closeButton: true,
            content: '',
            size: 'modalMedium',
            overlay: true,
            animation: 'drop',
            center: true
        };

        this.options = defaults;

        if (arguments[0] && typeof arguments[0] === 'object') {
            for (property in arguments[0]) {
                if (this.options.hasOwnProperty(property)) {
                    this.options[property] = arguments[0][property];
                }
            }
        } else {
            console.log("Error: your first argument should be an object");
        }
    }

    Modal.prototype.open = function() {

        if (typeof this.options.content === 'string') {
            modalContent = this.options.content;
        } else {
            modalContent = this.options.innerHTML;
        }

        $body.classList.add('modal-opened');
        modalContainer = document.createElement('div');
        modalContainer.className = 'modalContainer '
            + this.options.className + ' '
            + this.options.animation + ' '
            + this.options.size;
        modalContainer.innerHTML = modalContent;

        if (this.options.closeButton === true) {
            modalCloseBtn = document.createElement('button');
            modalCloseBtn.className = 'modalClose';
            modalCloseBtn.innerHTML = '&#9587;';
            modalContainer.appendChild(modalCloseBtn);
            bindEvent(modalCloseBtn, 'click', this.close.bind(this));
        }

        if (this.options.overlay === true) {
            modalOverlay = document.createElement("div");
            modalOverlay.className = "modalOverlay";
            modalOverlay.appendChild(modalContainer);
            $body.appendChild(modalOverlay);
            bindEvent(modalOverlay, 'click', this.close.bind(this));
            this.overlay = modalOverlay;
        } else {
            $body.appendChild(modalContainer);
            modalContainer.classList.add('no-overlay');
            bindEvent($body, 'click', this.close.bind(this));
        }

        if (this.options.center === true) {
            bindEvent(window, 'load', this.centerModal.bind(this));
            bindEvent(window, 'resize', this.centerModal.bind(this));
        }

        setTimeout(function() {
            if (this.options.overlay === true) {
                modalOverlay.classList.add('active');
            }
            modalContainer.classList.add('opened');
        }.bind(this), 100);

        this.modalContainer = modalContainer;
        this.modalCloseBtn = modalCloseBtn;

    };

    Modal.prototype.centerModal = function() {

        bodyWidth = window.getComputedStyle(document.body).width;
        modalWidth = window.getComputedStyle(this.modalContainer).width;
        marginLeft = (parseInt(bodyWidth) - parseInt(modalWidth)) / 2;

        if (bodyWidth > '10px') {
            this.modalContainer.style.marginLeft = marginLeft + 'px';
        }

    };

    Modal.prototype.close = function(e) {

        e.preventDefault();
        e.stopPropagation();

        $body.classList.remove('modal-opened');

        if (this.overlay !== undefined && e.target === this.overlay) {
            $body.removeChild(this.overlay);
        } else if (this.overlay !== undefined && e.target === this.modalCloseBtn) {
            $body.removeChild(this.overlay);
        } else if ((!this.overlay || e.target === modalCloseBtn))  {
            $body.removeChild(this.modalContainer);
        }
        document.getElementById("loginBtnDiv").innerHTML="<div>로그인</div><div></div><div><a href=\"\" class=\"modalBtn\">로그인</a></div>";
    };
    return Modal;
}());


var myModal = new Modal({
    content: document.querySelector('.modalContent').innerHTML,
    overlay: true,
    center: true
});

document.getElementsByClassName('modalBtn')[0].onclick = function(e) {
    e.preventDefault();
    myModal.open();
    myModal.centerModal();
};
/*로그인 modal 끝*/

/*로그인 버튼 클릭 시 버튼 숨기기 시작*/
function hideLoginBtnDiv() {
    document.getElementById("loginBtnDiv").innerHTML="<div>로그인</div><div></div><div><a>로그인</a></div>";
}
/*로그인 버튼 클릭 시 버튼 숨기기 끝*/

/*화살표 mouseover 시작*/
function hoverLeftImg(x) {
    x.src="image/hoverLeft.png";
}
function normalLeftImg(x) {
    x.src="image/left.png";
}

function hoverRightImg(x) {
    x.src="image/hoverRight.png";
}
function normalRightImg(x) {
    x.src="image/right.png";
}
/*화살표 mouseover 끝*/

var slideIndex = 1;
showSlides1(slideIndex);
showSlides2(slideIndex);
showSlides3(slideIndex);

/*이미지 슬라이드 시작 (1)*/
function plusSlides1(n) {
    showSlides1(slideIndex += n);
}
function currentSlide1(n) {
    showSlides1(slideIndex = n);
}
function showSlides1(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides1");      /*mySlides번호 주의*/
    var dots = document.getElementsByClassName("dot1");             /*dot번호 주의*/

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display="block";
    dots[slideIndex-1].className += " active";
}
/*이미지 슬라이드 끝 (1)*/

/*이미지 슬라이드 시작 (2)*/
function plusSlides2(n) {
    showSlides2(slideIndex += n);
}
function currentSlide2(n) {
    showSlides2(slideIndex = n);
}
function showSlides2(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides2");      /*mySlides번호 주의*/
    var dots = document.getElementsByClassName("dot2");             /*dot번호 주의*/
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
/*이미지 슬라이드 끝 (2)*/

/*이미지 슬라이드 시작 (3)*/
function plusSlides3(n) {
    showSlides3(slideIndex += n);
}
function currentSlide3(n) {
    showSlides3(slideIndex = n);
}
function showSlides3(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides3");      /*mySlides번호 주의*/
    var dots = document.getElementsByClassName("dot3");             /*dot번호 주의*/
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
/*이미지 슬라이드 끝 (3)*/

/*이미지 마우스오버/아웃 시 설명 띄움 시작*/
function onPic(picId) {
    document.getElementById(picId).style.opacity=0.3;
    document.getElementById(picId).style.color="white";

    if(picId !="logoImg" && picId !="link001" && picId !="link002" && picId !="link003"){
        var spanId=picId+"span";
        var hiddenId=picId+"spanHidden";
        document.getElementById(spanId).innerText=document.getElementById(hiddenId).innerText;
    }
}
function outPic(picId) {
    document.getElementById(picId).style.opacity="";
    document.getElementById(picId).style.color="";

    if(picId !="logoImg" && picId !="link001" && picId !="link002" && picId !="link003"){
        var spanId=picId+"span";
        document.getElementById(spanId).innerText="";
    }
}
/*이미지 마우스오버/아웃 시 설명 띄움 끝*/
