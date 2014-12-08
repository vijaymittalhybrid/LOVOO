(function(global){
    var DashboardModel,
        app = global.app = global.app || {};
    
    DashboardModel = kendo.data.ObservableObject.extend({
        show:function(){
            setTimeout(function() {
                apps.pane.loader.hide();
                app.signupService.viewModel.resetRegisteraionValue();
            }, 4000);
        },
        hello:function(){
            apps.navigate("#mainpage");
        }
    });
    app.dashboardService ={
        viewModel:new DashboardModel()
    };
})(window);