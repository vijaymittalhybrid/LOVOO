(function(global){
    var LoginModel,
        app = global.app = global.app || {};
    
    LoginModel = kendo.data.ObservableObject.extend({
        uname:'',
        pwd:'',
        
        show:function()
        {
        },
        
        contentData:function(){
            
            
                /*var user = {
                "Username": "jsmith",
                "Password": "111111",
                "DisplayName": "John Smith",
                "Email": "john.smith@telerik.com"
                }

                $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/kmt9rPQ4qPYDHEH2/Users',
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function(data){
                alert(JSON.stringify(data));
                    console.log(data);
                },
                error: function(error){
                alert(JSON.stringify(error));
                    console.log(error);
                }
                });*/
            
                /*var object = { "name" : "Hello mr vijay" };

                $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/kmt9rPQ4qPYDHEH2/vijay',
                contentType: "application/json",
                data: JSON.stringify(object),
                success: function(data) {
                alert(JSON.stringify(data));
                    console.log(data);
                },
                error: function(error) {
                alert(JSON.stringify(error));
                    console.log(error);
                }
                })*/
            
            
            
            
            /*var el = new Everlive('kmt9rPQ4qPYDHEH2');
            var data = el.data('test');
            data.create({ 'name' : 'AJ' ,'age':45,'city':'Mumbai'},
            function(data){
                aa = data['result']['Id'];
            alert(JSON.stringify(data));
                console.log("create data");
                console.log(data);
                app.loginService.viewModel.getValueF(aa);
            },
            function(error){
            alert(JSON.stringify(error));
            });*/
            
            /*var multiple = [{ 'name': 'Sample Text' }, { 'name': 'Second Sample Text' }];
            
                data.create(multiple,
                function(data){
                alert(JSON.stringify(data));
                },
                function(error){
                alert(JSON.stringify(error));
                });*/
            
            /*data.create({ 'name' : 'Vijay Mittal' ,'age':25,'city':'Aligarh'},
            function(data){
            alert(JSON.stringify(data));
            },
            function(error){
            alert(JSON.stringify(error));
            });*/
            
           
            /*data.getById(aa)
            .then(function(data){
            alert(JSON.stringify(data));
            },
            function(error){
            alert(JSON.stringify(error));
            });*/
            
            
                /*var data = el.data('test');
                data.get()
                .then(function(data){
                alert(JSON.stringify(data));
                    console.log(data);
                },
                function(error){
                alert(JSON.stringify(error));
                });*/
            
                /*var user = {
                "Username": "jsmith",
                "Password": "111111",
                "DisplayName": "John Smith"
                }

                $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/kmt9rPQ4qPYDHEH2/Users',
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function(data){
                alert(JSON.stringify(data));
                },
                error: function(error){
                alert(JSON.stringify(error));
                }
                });*/
            
            
        },
        
        /*getValueF:function(aa){
            var el = new Everlive('kmt9rPQ4qPYDHEH2');
            var data = el.data('test');
            console.log("get value");
            data.getById(aa)
            .then(function(data){
            alert(JSON.stringify(data));
                console.log("read data");
                console.log(data);
            },
            function(error){
            alert(JSON.stringify(error));
            });
        },*/
        
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