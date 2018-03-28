jQuery(document).ready(function ($) {
    jQuery("#click").click(function () {
        if($("#search").val() == ""){
            $("#search").css({"border": "1px solid blue"})
            return false
        }

        if($("#search").val().indexOf(" ") > 0) {
          $("#search").val().split(" ").forEach(function (index) {
                $.post(
                    'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2c1b1d394f52ebc24ad39ace4900ac4d&tags=' + index + '&text=' + index + '&extras=' + index + '&format=json&nojsoncallback=1&per_page=5',
                    function (d_data) {
                        var arr = JSON.parse(d_data);
                        console.log(arr);
                        arr['photos']['photo'].forEach(function (come) {
                            $("#img").append('<img src="http://farm' + come['farm'] + '.static.flickr.com/' + come['server'] + '/' + come['id'] + '_' + come['secret'] + '.jpg" class="img" title="'+index+'" />');
                        });
                        $("#cont").css({"border":"0"}).append("<div class='cont "+index+"'>"+index+"</div>");
                        $("#images").css({"display": "block"});
                        $( ".img" ).draggable({
                            revert: true
                        });
                            $("."+index+"").droppable({
                                drop: function () {
                                    if($(this).text() == $(".ui-draggable-dragging").attr("title")){
                                        $("#images").append($(".ui-draggable-dragging"));
                                        $(".ui-draggable-dragging").addClass("display "+$(this).text()+"Img");
                                        $(".display").css({"display":"none"});
                                    };

                                }
                            });
                        $(".cont").click(function () {
                                $(".display").css({"display":"none"});
                                $("." + $(this).text() + "Img").css({"display": "block"});
                        })
                    },
                    "html"
                );
            });
        }
        else {
            $.post(
                'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2c1b1d394f52ebc24ad39ace4900ac4d&tags='+$("#search").val()+'&text='+$("#search").val()+'&extras='+$("#search").val()+'&format=json&nojsoncallback=1&per_page=5',
                function(d_data) {
                    var arr = JSON.parse(d_data);
                    console.log(arr);
                    arr['photos']['photo'].forEach(function (come) {
                        $("#img").append('<img src="http://farm'+come['farm']+'.static.flickr.com/'+come['server']+'/'+come['id']+'_'+come['secret']+'.jpg" class="img" />');
                    });
                    $("#cont").css({"border":"0"}).append("<div class='cont' style='margin-left: 200px'>"+$("#search").val()+"</div>");
                    $("#images").css({"display": "block"});
                    $(".img").draggable({
                        revert: true
                    });
                            $(".cont").droppable({
                                drop: function () {
                                        $("#images").append($(".ui-draggable-dragging"));
                                        $(".ui-draggable-dragging").addClass("display");
                                        $(".display").css({"display":"none"});
                                }
                            });
                            $(".cont").click(function () {
                                    $(".display").css({"display": "block"})
                            })
                },
                "html"
            )
        };
    });
});