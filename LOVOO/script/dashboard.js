(function(global){
    var DashboardModel,
        app = global.app = global.app || {};
    
    DashboardModel = kendo.data.ObservableObject.extend({
        show:function(){
            console.log("dashboard");
            
            setTimeout(function() {
                apps.pane.loader.hide();
            }, 3000);
        }
    });
    app.dashboardService ={
        viewModel:new DashboardModel()
    };
})(window);