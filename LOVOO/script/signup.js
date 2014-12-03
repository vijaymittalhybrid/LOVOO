(function(global){
    var SignupModel,
        app = global.app = global.app || {};
    
    SignupModel = kendo.data.ObservableObject.extend({
       
        check:function(){
            apps.navigate("#signupForm2");
        }
    });
    app.signupService = {
        viewModel:new SignupModel()
    };
})(window);