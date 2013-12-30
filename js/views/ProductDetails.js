var ProductDetailView = Backbone.View.extend({
	template: Handlebars.compile(
		' <div class="row full-width"> ' +
		' 	{{name}} ' +
		' </div>  '
	),
	initialize: function  () {
		//this.on(this.model, "change", this.render);
	},
	render: function (){
		//console.log(this.model)
		this.$el.html(this.template(this.model));
		return this;
	}
});