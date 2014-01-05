RAD.views.ContentFirstWidget = RAD.Blanks.View.extend({
    url: 'app/views/inner/product_widget/content-first/content-first.html',
	onInitialize: function(){ 
		this.model = test()
		this.model.fetch().done(function () {
			console.log(model)
			console.log(model.models)
		})
		
	},
    events: {
        'tap .cube-container': "changePosition"
    },
    
});
