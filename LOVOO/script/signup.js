(function(global){
    var SignupModel,
        app = global.app = global.app || {};
    
    SignupModel = kendo.data.ObservableObject.extend({
        
        email:'',
        name:'',
        gender:'',
        interest:'',
        choice:'',
        
        show:function(){
        },
        
        check:function(){
            apps.navigate("#signupForm2");
        },
        
        navigateToTerms:function()
        {
            apps.navigate("views/terms.html");
        },
        
        ProcessToNavigate1:function()
        {
            var that = this,
                userEmail = that.get('email');
            
            if(userEmail === "")
            {
                navigator.notification.alert("Please enter User email id.",function(){},"Notification","OK");
                document.getElementById("email").focus();
            }
            else if(!app.signupService.viewModel.emailValidation(userEmail))
            {
                navigator.notification.alert("Please enter valid email id.",function(){},"Notification","OK");
                document.getElementById("email").focus();
            }
            else
            {
                apps.pane.loader.show();
                setTimeout(function() {
                    apps.pane.loader.hide();
                    if(localStorage.getItem("showStatus") === 0 || localStorage.getItem("showStatus") === '0')
                    {
                        app.signupService.viewModel.calanderCreate();
                        localStorage.setItem("showStatus","1");
                    }
                    apps.navigate("#signupForm2");
                }, 3000);
            }
        },
        
        calanderCreate:function(){
            var d = new Date();
            var maxYear = d.getYear()-18,
                maxMonth = d.getMonth(),
                maxDay = d.getDay(),
                minYear = maxYear-60,
                minMonth = maxMonth,
                minDay = maxDay+1;
            
            $("#calendar").kendoCalendar({
                format: "yyyy/MM/dd",
                min:new Date(minYear,minMonth,minDay),
                max:new Date(maxYear,maxMonth,maxDay),
                change:function(e){
                    var value = this.value();
                    localStorage.setItem("dob",value);
                }
            });
        },
        
        emailValidation:function(uemail){
            
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return expr.test(uemail);
        },
        
        ProcessToNavigate2:function(){
         
            var that= this,
                uname = that.get('name'),
                dob = localStorage.getItem('dob');
            
            if(uname ==="")
            {
                navigator.notification.alert("Please enter your name.",function(){},"Notification","OK");
                document.getElementById("name").focus();
            }
            else if(!app.signupService.viewModel.usernameValidation(uname))
            {
                navigator.notification.alert("Please enter valid name.",function(){},"Notification","OK");
                document.getElementById("name").focus();
            }
            else if(dob === "0" || dob === 0)
            {
                navigator.notification.alert("Please Select your D.O.B",function(){},"Notification","OK");
            }
            else
            {
                apps.pane.loader.show();
                setTimeout(function() {
                    apps.pane.loader.hide();
                    apps.navigate("#signupForm3");
                }, 3000);
                
            }
        },
        
        usernameValidation:function(uname){
            var letters = /^[A-Za-z]+$/; 
            return letters.test(uname);
        },
        
        ProcessToNavigate3:function(){
            
            var that = this,
                genderSelect = that.get('gender'),
                likeSelect = that.get('interest');
            
            if(genderSelect === "")
            {
                navigator.notification.alert("Please select your Gender.",function(){},"Notification","OK");
            }
            else if(likeSelect === "")
            {
                navigator.notification.alert("Please select, What do you like?",function(){},"Notification","OK");
            }
            else
            {
                console.log(genderSelect);
                console.log(likeSelect);
                apps.pane.loader.show();
                setTimeout(function() {
                    apps.pane.loader.hide();
                    apps.navigate("#signupForm4");
                }, 3000);
            }
        },
        
        signupFormRegister:function(){
            
             var that = this,
                choiceSelect = that.get('choice');
            
            if(choiceSelect === "")
            {
                navigator.notification.alert("Please select your Choice.",function(){},"Notification","OK");
            }
            else
            {
                console.log(choiceSelect);
                apps.pane.loader.show();
                setTimeout(function() {
                    apps.pane.loader.hide();
                    apps.navigate("views/dashboard.html");
                }, 3000);
            }
        },
        
        takeCapturePhoto:function(){
            var that = this;
            navigator.camera.getPicture(that.CapturePhotoonSuccess, that.CapturePhotoonFail, 
                                                        { 
                                                            quality: 50,
                                                            destinationType: Camera.DestinationType.DATA_URL
                                                        }
            );
        },
        
        CapturePhotoonSuccess:function(imageData){
            var image = document.getElementById('userImg');
            var btn = document.getElementById('photoBtn');
            image.src = "data:image/jpeg;base64," + imageData;
            
            image.style.display = 'block';
            btn.style.display = 'none';
            
            console.log(image.src);
        },
        
        CapturePhotoonFail:function(message){
            navigator.notification.alert('Failed because: ' + message,function(){},'Notification','OK');
        },
        
        getExistingImage:function(){
            var that = this;
            navigator.camera.getPicture(that.ExistingImageonSuccess, that.ExistingImageonFail, 
                                                        { 
                                                            quality: 50,
                                                            destinationType: Camera.DestinationType.FILE_URI 
                                                        }
            );
        },
        
        ExistingImageonSuccess:function(imageURI){
            var image = document.getElementById('userImg');
            var btn = document.getElementById('photoBtn');
            image.src = imageURI;
            image.style.display = 'block';
            btn.style.display = 'none';
            
            console.log(image.src);
        },
        
        ExistingImageonFail:function(message){
             navigator.notification.alert('Failed because: ' + message,function(){},'Notification','OK');
        }
        
    });
    app.signupService = {
        viewModel:new SignupModel()
    };
})(window);