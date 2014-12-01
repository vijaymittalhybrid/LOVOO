(function(global){
    var LoadPageModel,
        app = global.app = global.app || {};
    
    LoadPageModel = kendo.data.ObservableObject.extend({
        
        show:function()
        {
        }
    });
    app.loadpage = {
        viewModel:new LoadPageModel()
    };
})(window);