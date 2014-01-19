// Card User
RAD.model('User', Backbone.Model.extend({
	urlRoot:'http://localhost:8080/Project/appstoremodified/api/user',
    defaults: {
        "name": "", 
        "email": "",
        "password": "",
        "address": "",
        "mobileno": 0,
        "state": 0,
        "propinsi": ""
    }
}), false);

RAD.view("view.register", RAD.Blanks.ScrollableView.extend({
	url:'app/views/login_register/register/register.html',
	events:{
		'click .register' : 'addUser'
	},
	model : new RAD.models.User(),
	addUser : function (event) {
		console.log(event)	
		console.log(this.model)
		console.log($('input[name="name"]').val())
		this.model.set({"name":$('input[name="name"]').val(),
						"email":$('input[name="email"]').val(),
						"password":$('input[name="password"]').val(),
						"address": $('input[name="address"]').val(),
						"mobileno": $('input[name="mobileno"]').val(),
						"state": $('input[name="state"]').val(),
						"propinsi": $('input[name="propinsi"]').val()
						});
		this.model.save();
	}
}),false)