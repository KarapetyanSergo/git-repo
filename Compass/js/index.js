jQuery(document).ready(function ($) {

$(document).mousemove(function (event) {
    event = window.event;
    var kord = event.pageX;
    $("#arrow").css({"transform": "rotate("+kord+"deg)"})
});
});