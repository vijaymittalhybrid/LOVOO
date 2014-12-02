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
        },
        
        login:function()
        {
            apps.navigate("login");
        },
        
        register:function()
        {
            apps.navigate("register");
        },
        
        termsAndcondn:function()
        {
            apps.navigate("views/terms.html");
        }
        
    });
    app.loginService = {
        viewModel:new LoginModel()
    };
})(window);