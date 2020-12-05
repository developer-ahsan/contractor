/*
◄------------------------------------------------------------► 
This file includes all cusomized javascript and all plugins libraries options 
◄------------------------------------------------------------►
*/

(function() {
    //-- Enable Use Strict Mode --
    "use strict";

    $('.one-time').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 7000,
        infinite: true,
        fade: true,
        speed: 500,
        cssEase: 'ease-in-out'
    });

    $(document).ready(function() {

        function resize() {
            var top = $('header').height();
            $('#header-area').css({ 'margin-top': top + 'px' });
        }

        $(window).resize(resize);
        resize();
    });

})(); //end of use strict