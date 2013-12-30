var CategoryView = Backbone.View.extend({
	template: Handlebars.compile(
		'<li class="cat-list" >{{ this.name }}</li>'
	),
	initialize: function () {
		 this.render();
    },
	render: function () {
		this.$el.append(this.template(this.model));
		return this;
	},
	events: {
		"click li" : "openCategory",
	},
	openCategory: function(){
		if (!leftScroll.moved){
			app.navigate('Categorys/' + this.model.id, { trigger: true });
			snapper.close();
		}
	}
});