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
        
        loginWithFacebook:function(){
            alert("facebook");
        },
        
        loginWithTwitter:function(){
            alert("twitter");
        },
        
        loginWithGplus:function(){
            alert("Google Plus");
        },
        
        registerWithFacebook:function(){
            alert("Register with facebook");
        },
        
        registerWithTwitter:function(){
            alert("Register with twitter");
        },
        
        registerWithGplus:function(){
            alert("Register with Google Plus");
        },
        
        loginUser:function(){
            var that = this,
                username = that.get('uname'),
                password = that.get('pwd');
            
            if(username === "")
            {
                navigator.notification.alert("Please enter login email id.",function(){},"Notification","OK");
                document.getElementById("uname").focus();
            }
            else if(!app.signupService.viewModel.emailValidation(username))
            {
                navigator.notification.alert("Please enter valid login email id.",function(){},"Notification","OK");
                document.getElementById("uname").focus();
            }
            else if(password ==="")
            {
               navigator.notification.alert("Please enter password",function(){},"Notification","OK"); 
               document.getElementById("pwd").focus();
            }
            else if(!app.signupService.viewModel.passwordValidation(password))
            {
                navigator.notification.alert("Password length must be minimum 6 and maximum 30 character.",function(){},"Notification","OK");
                document.getElementById("pwd").focus();
            }
            else
            {
                app.loginService.viewModel.loginSuccessful(username,password);
            }
        },
        
        loginSuccessful:function(username,password){
            apps.pane.loader.show();
            everlive.Users.login(username, // username
            password, // password
            function (data) {
                setTimeout(function() {
                    apps.pane.loader.hide();
                    apps.navigate("views/dashboard.html");
                }, 2000);
            },
            function(error){
                setTimeout(function() {
                   apps.pane.loader.hide();
                   navigator.notification.alert(error.message,function(){},"Notification","OK");
                }, 2000);
            });
        },
        
        resetLoginValue:function(){
            
        }
        
    });
    app.loginService = {
        viewModel:new LoginModel()
    };
})(window);