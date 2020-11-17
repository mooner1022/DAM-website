"use strict";
var currentPath = "";
jQuery(function () {
    console.log('ready');
    showLogo();
    $(".button_menu").on('mouseover',()=> {
        console.log('hover');
    });
    $('#profile').on('click',()=> {
        location.href = '/html/mem_profile.html';
    });
    $('#logo').on("click",()=> {
        location.href = '/html/index.html';
    });
    $("#btn_owners").on('click', ()=> {
        switchContent('DAMcreatorsintro.html');
    });
});
function switchContent(filename) {
    if (filename == currentPath)
        return;
    var container = $('#main-container');
    var duration = 200;
    currentPath = filename;
    container.fadeOut(duration, function () {
        container.load('/html/' + filename, function () {
            container.fadeIn(duration);
        });
    });
}
function showLogo() {
    $('#logo').css("animation", "logodown 1s");
    $('#logodiv').css("animation", "divdown 1s");
    $('#logodiv').css("height", "100px");
    $('#logo').css("width", "100px");
    $('#logo').css("height", "100px");
    $('#logo').css("margin-left", "0%");
    $('#logo').css("left", "0px"); //DREAM ASSET MANAGEMENT
    $("#homespan_1").css("animation", "fadeout .5s");
    $("#homespan_1").css("opacity", "100%");
    $("#loginbox").css("animation", "fadeout 1s");
    $("#loginbox").css("animation-delay", "1s");
    setTimeout(function () {
        $('#loginbox').css('opacity', '1');
    }, 1000);
}
