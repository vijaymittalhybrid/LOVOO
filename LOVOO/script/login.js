(function(global){
    var LoginModel,
        app = global.app = global.app || {};
    
    LoginModel = kendo.data.ObservableObject.extend({
        uname:'',
        pwd:'',
        
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
            apps.navigate("#login");
        },
        
        register:function()
        {
            apps.navigate("#register");
        },
        
        termsAndcondn:function()
        {
            apps.navigate("views/terms.html");
        },
        
        navigateToSignup:function(){
            localStorage.setItem("showStatus","0");
            localStorage.setItem("dob","0");
            apps.navigate("views/signup.html");
        },
        
        loginUser:function(){
            var that = this,
                username = that.get('uname'),
                password = that.get('pwd');
            
            console.log("username"+username);
            console.log("password"+password);
            
            if(username === "")
            {
                navigator.notification.alert("Please enter username",function(){},"Notification","OK");
            }
            else if(password ==="")
            {
               navigator.notification.alert("Please enter password",function(){},"Notification","OK"); 
            }
            else
            {
                alert("ok");
            }
        },
        
    });
    app.loginService = {
        viewModel:new LoginModel()
    };
})(window);