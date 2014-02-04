RAD.view("view.login", RAD.Blanks.ScrollableView.extend({
	url:'app/views/login_register/login/login.html',
	events:{
		'click .login' : 'toAuth'
	},
	toAuth : function (event) {
		var self = this,
			url ="http://localhost:8080/Project/appstore/api/login",
			formValues = {
				email: $('input[name="email"]').val(),
				password: $('input[name="password"]').val()
			};
			
		$.ajax({
			type: "POST",
			url: url,
			data: formValues,
			dataType: "JSON",
			success: function (data) {
                console.log(data);
               
                if(data.error) {  //kalo ada error
				   alert(data.error.text);
                }
                else { //kalo berhasil
				   alert("Hallo " + data.firstname);
                }
            }
		});
	
	}
}),false)
