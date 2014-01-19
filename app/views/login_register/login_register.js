RAD.view("view.login_register", RAD.Blanks.ScrollableView.extend({
	url:'app/views/login_register/login_register.html',
	children:[{
		container_id:'.register_login_content',
		content:"view.register"
	}],
	events:{
		'tap .tab_nav_login_register' : 'changeContent'
	},
	changeContent : function (e) {
		console.log("here")
		var View = $(e.currentTarget).data('target')
		
        var options = {
                container_id: '.register_login_content',
                content: View,
                animation: 'none'
            };
		
        this.publish('navigation.show', options);
        //this.publish(View, null);
	}
}),false)