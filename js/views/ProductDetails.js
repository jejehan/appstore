var ProductDetailView = Backbone.View.extend({
	template: Handlebars.compile(
		' <div class="row full-width"> ' +
		' 	<div class="large-7 large-centered columns"> ' +
		' 		<div class="slideshow-wrapper" > ' +
		' 			<span class="preloader"></span> ' +
		' 			<ul id="featured1" data-orbit data-options="pause_on_hover:false; timer_speed:5000;"> ' +
		' 				<li> ' +
		' 					<img src="{{this.id_default_image}}" /> ' +
		' 				</li> ' +
		' 				<li> ' +
		' 					<img src="{{this.id_default_image}}" /> ' +
		' 				</li> ' +
		' 				<li> ' +
		' 					<img src="{{this.id_default_image}}" /> ' +
		' 				</li> ' +
		' 			</ul> ' +
		' 		</div> ' +
		' 	</div> ' +
		' </div>  {{name}} '
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