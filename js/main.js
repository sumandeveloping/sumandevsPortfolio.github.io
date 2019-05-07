

$(function () {
    var topbarHeight = $('#navbar').outerHeight();

    $(document).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var yPosOfAboutSection = $("#about").offset().top;
        var yPosOfProjectSection = $("#projects").offset().top;
        var yPosOfServicesSection = $("#services").offset().top;
        var yPosOfPortfolioSection = $("#portfolio").offset().top;

        //Console.log
        console.log("ScrollTop : " + scrollTop);
        console.log(yPosOfAboutSection);
        console.log(yPosOfProjectSection);
        console.log($(window).height());


        $('#navbar').toggleClass('scrolled', scrollTop > topbarHeight);
        $('.skills__percent').toggleClass('animation', scrollTop > ($('#skills').offset().top - $(window).height() / 2));

        //ABOUT SECTION ANIMATION...
        //if conndition for fade in of about section
        if (scrollTop > yPosOfAboutSection - $(window).height() / 2) {
            $(".aboutUs").addClass("animated fadeInLeftBig isShowing");
            $(".about-profile").addClass("animated fadeInRight isShowing");
        }


        // Project section Animation...
        if (scrollTop > yPosOfProjectSection - $(window).height() / 2) {

            $('.projects').each(function (i) {

                setTimeout(function () {
                    $('.projects').eq(i).css({
                        'opacity': '1',
                        'transform': 'translateX(0rem)'
                    });
                }, 150 * (i + 1));

            });
        }

        //SERVICES SECTION ANIMATION...
        if (scrollTop > yPosOfServicesSection - $(window).height() / 2) {

            $(".services").addClass("animated slideInUp isShowing");

        }

        //PORTFOLIO SECTION ANIMATION...
        if (scrollTop > yPosOfPortfolioSection - $(window).height() / 2) {

            $('.portfolio-box').each(function (i) {
                setTimeout(function () {
                    $('.portfolio-box').eq(i).addClass("isShowing");

                }, 100 * (i + 1));
            })

        }




    }); //end document.scroll func...


    //SCROLLING TO A PARTICULAR SECTION..
    //home menu
    $('.nav-link').click(function (e) {
        var linkHref = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(linkHref).offset().top - topbarHeight
        }, 800);
    });

    //SCROLLING TO A PARTICULAR SECTION..
    //footer menu
    $('.footer__nav-link').click(function (e) {
        var linkHref = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(linkHref).offset().top - topbarHeight
        }, 800);
    });


    //parallax function
    $(window).scroll(function () {
        parallax();
    });

    //parallax function
    function parallax() {
        var wScroll = $(window).scrollTop();
        $('.parallax--bg').css('background-position', 'center ' + (wScroll * .85) + 'px');
    }



});


//TYPEWRITE EFFECT IN HEADER SECTION...
class Typewriter {
    constructor(textElement, words, wait = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.txt = "";
        this.wordIndex = 0;
        this.type();
        this.isDeleting = false;
    }

    type() {
        //current index of words 
        const current = this.wordIndex % this.words.length;
        //get full text
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        //Insert text into textElement
        this.textElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

        let typeSpeed = 300;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        //condition when txt get its full letter
        if (!this.isDeleting && this.txt === fullTxt) {
            //make pause at the end
            typeSpeed = this.wait;
            //make isDeleting True
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            //if first word is deleted then go the next word
            this.wordIndex++;
            //again make isDeleting false
            this.isDeleting = false;
            //make a very little pause when deleting of a word is done..
            //pause before start typing again!..
            typeSpeed = 500;

        }


        setTimeout(() => this.type(), typeSpeed);


    }
}

document.addEventListener('DOMContentLoaded', init);

//function init
function init() {
    const textElement = document.querySelector('.txt-type');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');

    new Typewriter(textElement, words, wait);
}