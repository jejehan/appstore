RAD.view("view.keranjang_konfirmasi", RAD.Blanks.ScrollableView.extend({
	url:'app/views/keranjang_konfirmasi/keranjang_konfirmasi.html',
	children:[{
		container_id:'.keranjang_konfirmasi_content',
		content:"view.keranjang"
	}],
	events:{
		'tap .tab_nav_login_register' : 'changeContent'
	},
	changeContent : function (e) {
		var View = $(e.currentTarget).data('target')
        var options = {
                container_id: '.keranjang_konfirmasi_content',
                content: View,
                animation: 'none'
            };
		
        this.publish('navigation.show', options);
	}
}),false)