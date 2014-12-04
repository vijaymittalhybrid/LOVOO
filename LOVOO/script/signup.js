(function(global){
    var SignupModel,
        app = global.app = global.app || {};
    
    SignupModel = kendo.data.ObservableObject.extend({
        
        email:'',
        name:'',
        
        show:function(){
            
            $("#calendar").kendoCalendar({
                format: "yyyy/MM/dd",
                change:function(e){
                    var value = this.value();
                    localStorage.setItem("dob",value);
                    
                   /* var o_year = value.getMonth();
                    var o_month = value.getYear();
                    
                    console.log("month is "+value.getMonth());
                    console.log("Year is "+value.getYear());
                    console.log(e);
                   
                    var d = new Date();
                    console.log("today"+d);
                    var current_Year = d.getYear();
                    var current_month = d.getMonth();
                    var countY=0;
                   var data = current_Year - o_year;
                    console.log("jhghjgj"+data);*/
                },
                /*navigate: function (e) {
                console.log(this._current);
                var cur = new Date(this._current);
                var prev = new Date(cur);
                prev.setMonth(cur.getMonth() - 1);
                var next = new Date(cur);
                next.setMonth(cur.getMonth() + 1);
                console.log("-----------");
                console.log("prev", prev);
                console.log("cur ", cur);
                console.log("next", next);

                console.log("********************************");
                var cur1 = new Date(this._current);
                var prev1 = new Date(cur1);
                prev1.setYear(cur1.getYear() - 18);
                var next1 = new Date(cur);
                next1.setMonth(cur1.getMonth() + 1);
                console.log("-----------");
                console.log("prev1", prev1);
                console.log("cur1 ", cur1);
                console.log("next1", next1);
                console.log("count"+prev1.getYear());

                console.log("+++++++++++++++++++++++++");
                var cur2 = new Date();
                console.log("Current "+cur2);
                console.log(cur2.getMonth());
                }*/
            });
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
                    localStorage.setItem("dob","0");
                    apps.navigate("#signupForm2");
                }, 4000);
            }
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
                }, 4000);
                
            }
        },
        
        usernameValidation:function(uname){
            var letters = /^[A-Za-z]+$/; 
            return letters.test(uname);
        },
        
    });
    app.signupService = {
        viewModel:new SignupModel()
    };
})(window);