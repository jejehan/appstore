RAD.view("view.register", RAD.Blanks.ScrollableView.extend({
	url:'app/views/login_register/register/register.html',
	events:{
		'click .register' : 'addUser'
	},
	addUser : function (event) {
		var self = this,
			url ="http://localhost:8080/Project/appstore/api/user",
			formValues = {
				firstname: $('input[name="firstname"]').val(),
				lastname: $('input[name="lastname"]').val(),
				email: $('input[name="email"]').val(),
				passwd: $('input[name="passwd"]').val()
			};
			
		$.ajax({
			type: "POST",
			url: url,
			data: formValues,
			dataType: "JSON",
			success: function (data) {
                console.log(["Register request details: ", data]);
               
                if(data.error) {  //kalo ada error
				   alert(data.error.text);
                }
                else { //kalo berhasil
				   alert("Hallo" + data.username);
                }
            }
		});
	}
}),false)