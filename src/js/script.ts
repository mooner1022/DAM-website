let currentPath:string="";

jQuery(function() {
    console.log('ready');
    showLogo();
    $(".button_menu").on ( 'mouseover', function() {
        console.log('hover');
    });
    $('#profile').on('click', function () {
        location.href = '/html/mem_profile.html';
    });
    $('#logo').on("click",function (){
        location.href= '/html/index.html';
    })
    $("#btn_owners").on('click', function() {
        switchContent('DAMcreatorsintro.html')
    });
    $("#btn_board_free").on('click', function() {
        //switchContent('free_board.html')
        location.href= '/freeboard';
    });
});

function switchContent(filename:string) {
    if(filename==currentPath) return;
    let container = $('#main-container');
    let duration:number = 200;
    currentPath = filename;
    container.fadeOut(duration,function() {
        container.load('/html/'+filename,function() {
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
    $('#logo').css("left", "0px");//DREAM ASSET MANAGEMENT
    $("#homespan_1").css("animation", "fadeout .5s");
    $("#homespan_1").css("opacity", "100%");
    $("#loginbox").css("animation", "fadeout 1s");
    $("#loginbox").css("animation-delay", "1s");
    setTimeout( function(){
        $('#loginbox').css('opacity','1');
    },1000);
}