var ProductDetailsItem = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
			"id_category_default": 0,
			"price": 0,
			"short_description": "",
			"available_now": "",
			"id_default_image": "",
			"name": "Product Name"
	}
});