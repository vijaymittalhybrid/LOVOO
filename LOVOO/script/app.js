(function(global){
    var app = global.app = global.app || {};
    
    var onDeviceReady = function()
    {
        setTimeout(function(){
           progressBar();
        }, 2000);
    };
    
    var progressBar = function(){
        $("#loadingPregressBar").kendoProgressBar({
            showStatus: false,
            animation:{
               duration:200
            },
            complete: onComplete
        });
        load();  
    };
    
    var load = function(){
        var pb = $("#loadingPregressBar").data("kendoProgressBar");
        pb.value(10);
        
        var interval = setInterval(function () {
            if (pb.value() < 100) {
                pb.value(pb.value() + 5);
            } else {
                clearInterval(interval);
            }
        }, 30);
    };
    
    var onComplete = function(e){
        if(e.value===100)
        {
            apps.navigate("#mainpage");
        }
    };
    
    document.addEventListener("deviceready",onDeviceReady,false);
    
    
    apps = new kendo.mobile.Application(document.body,
                                                        {
                                                            skin:'flat'
                                                        }
    );
})(window);