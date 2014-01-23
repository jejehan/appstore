RAD.view("view.konfirmasi", RAD.Blanks.ScrollableView.extend({
	url:'app/views/keranjang_konfirmasi/login/login.html',
	events:{
		'click .register' : 'addUser'
	},
	model : new RAD.models.User(),
	addUser : function (event) {

	}
}),false)