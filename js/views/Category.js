var CategoryView = Backbone.View.extend({
	template: Handlebars.compile(
		'<li><a href="#">{{ this.name }}</a></li>'
	),
	initialize: function () {
		 this.render();
    },
	render: function () {
		console.log(this.model)
		this.$el.append(this.template(this.model));
		return this;
	},
	events: {
		"dblclick #home-Category" : "masking",
	},
	masking: function(){
		console.log("pindah ke details")
		app.navigate('Categorys/' + this.model.id, { trigger: true });
	}
});