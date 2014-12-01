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
               duration:120
            },
            complete: onComplete
        });
        load();  
    };
    
    var load = function(){
        var pb = $("#loadingPregressBar").data("kendoProgressBar");
        pb.value(0);
        
        var interval = setInterval(function () {
            if (pb.value() < 100) {
                pb.value(pb.value() + 1);
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