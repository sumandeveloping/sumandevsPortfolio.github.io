
$(function () {
    var topbarHeight = $('#navbar').outerHeight();

    $(document).scroll(function () {
        var scrollTop = $(this).scrollTop();
        console.log(scrollTop);
        $('#navbar').toggleClass('scrolled', scrollTop > topbarHeight);
        $('.skills__percent').toggleClass('animation', scrollTop > 400);
    });

    $('.nav-link').click(function (e) {
        var linkHref = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(linkHref).offset().top - topbarHeight
        }, 800);
    });

})
