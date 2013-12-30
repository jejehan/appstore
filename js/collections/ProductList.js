var ProductCollection = Backbone.Collection.extend({
	url: "http://toptotoe-boutique.com/jeapi/HomeProduct.php",
	model: ProductItem,
	comparator: function(item) {
		//sort by id
		console.log("product collection load")
        return item.get('id');
    }
});