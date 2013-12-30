var ProductCollection = Backbone.Collection.extend({
	url: "http://localhost:8080/Project/makanjaapi/source/HomeProduct.php",
	model: ProductItem,
	comparator: function(item) {
		//sort by id
		console.log("product collection load")
        return item.get('id');
    }
});