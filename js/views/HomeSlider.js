var HomeSliderView = Backbone.View.extend({
	template: Handlebars.compile(
		'<li> ' +
		'	<img src="{{this.image}}" /> ' +
		'</li> '
	),
	initialize: function () {
		 this.render();
    },
	render: function () {
		this.$el.append(this.template(this.model));
		return this;
	},
});