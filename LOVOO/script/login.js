(function(global){
    var LoginModel,
        app = global.app = global.app || {};
    
    LoginModel = kendo.data.ObservableObject.extend({
        
        show:function()
        {
        },
        
        forgotSubmit:function()
        {
          alert("ok");  
        },
        
        closeModalView:function()
        {
             $("#forgot").kendoMobileModalView("close");
        }
        
    });
    app.loginService = {
        viewModel:new LoginModel()
    };
})(window);