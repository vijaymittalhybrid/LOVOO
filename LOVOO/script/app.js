(function(global){
    var app = global.app = global.app || {};
    
    var onDeviceReady = function()
    {
        checkConnection();
        console.log(navigator.camera);
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
    
    var checkConnection = function(){
        
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        
        if(states[networkState] === "No network connection")
        {
           navigator.notification.alert("Internet Connection not available.",function(){},"Notification","OK"); 
        }
        else
        {
           setTimeout(function(){
                progressBar();
            }, 2000);
            //apps.navigate("#mainpage");
        }
      
    }; 
   
    document.addEventListener("deviceready",onDeviceReady,false);
    
    everlive = new Everlive(
                            {
                                apiKey:'kmt9rPQ4qPYDHEH2',
                                scheme:'http'
                            }
    );
    console.log(app);
    
    apps = new kendo.mobile.Application(document.body,
                                                        {
                                                            skin:'flat'
                                                        }
    );
})(window);