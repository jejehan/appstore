var cartModel = Backbone.Model.extend({
	defaults: {
		items : []
	},
	addToCart = function (item){
		this.attributes.items.push(item);
	}
});