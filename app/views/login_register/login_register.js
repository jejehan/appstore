RAD.view("view.login_register", RAD.Blanks.ScrollableView.extend({
	url:'app/views/login_register/login_register.html',
	children:[{
		container_id:'.register_login_content',
		content:"view.register",
		animation:"slide"
	}],
	events:{
		'tap .tab_nav_login_register' : 'changeContent'
	},
	changeContent : function (e) {
		console.log("here")
		var View = $(e.currentTarget).data('target')
		
		if(View == "view.login"){
			Animation = "slide"
		}else{
			Animation = "slide-out"
		}
		
        var options = {
                container_id: '.register_login_content',
                content: View,
                animation: Animation
            };
		
        this.publish('navigation.show', options);
        //this.publish(View, null);
	}
}),false)