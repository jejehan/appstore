var ProductCollection = Backbone.Collection.extend({
	url: "http://toptotoe-boutique.com/jeapi/Product",
	model: ProductItem,
	comparator: function(item) {
		//sort by id
        return item.get('id');
    }
});