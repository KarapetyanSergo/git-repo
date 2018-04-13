jQuery(document).ready(function ($) {
    $(document).mousemove(function (event) {
        var head;
        function onSuccess(heading) {
            head = heading.magneticHeading;
            console.log(head);
            $("#arrow").css({"transform": "rotate(" + head + "deg)"})
        }

        function onError(compassError) {
            alert('Compass Error: ' + compassError.code);
        }

        function onDeviceReady() {
            navigator.compass.getCurrentHeading(onSuccess, onError);
        }

        document.addEventListener("deviceready", onDeviceReady, false);

    });
});