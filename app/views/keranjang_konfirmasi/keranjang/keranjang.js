// Cart User
RAD.model('Cart', Backbone.Model.extend({
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

RAD.view("view.keranjang", RAD.Blanks.ScrollableView.extend({
	url:'app/views/keranjang_konfirmasi/keranjang/keranjang.html',
	events:{
		'click .keranjang' : 'addUser'
	},
	model : new RAD.models.Cart(),
	cekOut : function (event) {
		
	},
	addQty : function (event) {
		
	},
}),false)