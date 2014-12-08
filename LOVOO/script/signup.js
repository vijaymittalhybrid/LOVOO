(function(global){
    var SignupModel,
        app = global.app = global.app || {};
    
    SignupModel = kendo.data.ObservableObject.extend({
        
        email:'',
        name:'',
        gender:'',
        interest:'',
        choice:'',
        rpassword:'',
       
        show:function(){
            
        },
       
        navigateToTerms:function()
        {
            apps.navigate("views/terms.html");
        },
        
        ProcessToNavigate1:function()
        {
            var that = this,
                userEmail = that.get('email'),
                userPassword = that.get('rpassword');
                dataParam={};
            
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
            else if(userPassword ==="")
            {
                navigator.notification.alert("Please enter your password.",function(){},"Notification","OK");
                document.getElementById("rpassword").focus();
            }
            else if(!app.signupService.viewModel.passwordValidation(userPassword))
            {
                navigator.notification.alert("Password length must be minimum 6 and maximum 20 character.",function(){},"Notification","OK");
                document.getElementById("rpassword").focus();
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
                    dataParam['userEmailId'] = userEmail;
                    dataParam['userPwd'] = userPassword;
                    apps.navigate("#signupForm2");
                }, 3000);
            }
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
                navigator.notification.alert("Please enter your name in string format.",function(){},"Notification","OK");
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
                    dataParam['username'] = uname;
                    dataParam['DOB'] = localStorage.getItem("dob");
                    apps.navigate("#signupForm3");
                }, 3000);
                
            }
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
                apps.pane.loader.show();
                setTimeout(function() {
                    apps.pane.loader.hide();
                    dataParam['gender'] = genderSelect;
                    dataParam['like'] = likeSelect;
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
                dataParam['choice'] = choiceSelect;
                app.signupService.viewModel.registerAllDataInsert();
            }
        },
        
        registerAllDataInsert:function(){
            
            apps.pane.loader.show();
            var Lovoo_Register_Data = {
                
                'Username':dataParam['username'],
                'Email':dataParam['userEmailId'],
                'Password':dataParam['userPwd'],
                'Gender':dataParam['gender'],
                'Like':dataParam['like'],
                'Choice':dataParam['choice'],
                'ImageSrc':dataParam['imageSrc'],
                'DOB':dataParam['DOB'],
                "DisplayName": dataParam['username']
            };
            
            $.ajax({
                type:'POST',
                url:'http://api.everlive.com/v1/kmt9rPQ4qPYDHEH2/Users',
                contentType:'application/json',
                data:JSON.stringify(Lovoo_Register_Data),
                success:function(data){
                    setTimeout(function() {
                        apps.pane.loader.hide();
                        apps.navigate("views/dashboard.html");
                    }, 2000);
                },
                error:function(error){
                    apps.pane.loader.hide();
                    navigator.notification.alert(error.responseText,function(){},"Notification","OK");
                }
            });
            
        },
        
        resetRegisteraionValue:function(){
            var that = this;
            localStorage.setItem("showStatus","0");
            localStorage.setItem("dob","0");
            that.set('email','');
            that.set('name','');
            that.set('rpassword','');
            $('input[type="radio"]').prop('checked',false);
            that.set('interest','');
            that.set('choice','');
            that.set('gender','');
            app.signupService.viewModel.removeImage();
            document.getElementById("calendar").innerHTML = "";
        },
        
        cancelRegisteraionValue:function(e){
            console.log(e.sender.element[0].id);
            
            var that = this;
            localStorage.setItem("showStatus","0");
            localStorage.setItem("dob","0");
            that.set('email','');
            that.set('name','');
            that.set('rpassword','');
            $('input[type="radio"]').prop('checked',false);
            that.set('interest','');
            that.set('choice','');
            that.set('gender','');
            app.signupService.viewModel.removeImage();
            document.getElementById("calendar").innerHTML = "";
            apps.navigate("#mainpage");
        },
        
        calanderCreate:function(e){
            var d = new Date();
            var maxYear = d.getYear()-18,
                maxMonth = d.getMonth(),
                maxDate = d.getDate(),
                minYear = maxYear-60,
                minMonth = maxMonth,
                minDate = maxDate;
            
            $("#calendar").kendoCalendar({
                format: "yyyy/MM/dd",
                min:new Date(minYear,minMonth,minDate),
                max:new Date(maxYear,maxMonth,maxDate),
                change:function(e){
                    var value = this.value();
                    localStorage.setItem("dob",value);
                }
            });
        },
        
        /*All validation Function here*/
        emailValidation:function(uemail){
            
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return expr.test(uemail);
        },
        
        usernameValidation:function(uname){
            var letters = /^[A-Za-z ]+$/; 
            return letters.test(uname);
        },
        
        passwordValidation:function(password){
            var pwd = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
            return pwd.test(password);
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
            var cancelImg = document.getElementById('cancelImg');
            var btn = document.getElementById('photoBtn');
            image.src = "data:image/jpeg;base64," + imageData;
            dataParam['imageSrc'] = imageData;
            
            image.style.display = 'block';
            cancelImg.style.display = 'block';
            btn.style.display = 'none';
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
            var cancelImg = document.getElementById('cancelImg');
            var btn = document.getElementById('photoBtn');
            
            image.src = imageURI;
            dataParam['imageSrc'] = imageURI;
            image.style.display = 'block';
            cancelImg.style.display = 'block';
            btn.style.display = 'none';
        },
        
        ExistingImageonFail:function(message){
             navigator.notification.alert('Failed because: ' + message,function(){},'Notification','OK');
        },
        
        cancelImage:function(){
            alert("cancel");
            navigator.notification.confirm("Are you sure you want to delete this image?",function(confirmed){
                
                if(confirmed ===1 || confirmed === "1")
                {
                   app.signupService.viewModel.removeImage();
                }
            },"Notification");
        },
        
        removeImage:function(){
            var image = document.getElementById('userImg');
            var cancelImg = document.getElementById('cancelImg');
            var btn = document.getElementById('photoBtn');
            image.style.display = 'none';
            cancelImg.style.display = 'none';
            btn.style.display = 'block';
        },
        
    });
    app.signupService = {
        viewModel:new SignupModel()
    };
})(window);