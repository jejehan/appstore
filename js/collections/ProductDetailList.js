var ProductDetailCollection = Backbone.Collection.extend({
	initialize: function(models, options) {
		
		this.id = options.id;
		console.log(this.id)
	},
	url: function() {
		return 'http://toptotoe-boutique.com/jeapi/Product2.php?ProdId=' + this.id;
	},
	model: ProductItem,
	comparator: function(item) {
		//sort by id
        return item.get('id');
    },
	parse: function (response) {
		return response[0]
	}
});