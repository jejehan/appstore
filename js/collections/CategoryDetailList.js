var CategoryDetailCollection = Backbone.Collection.extend({
	initialize: function(models, options) {
		
		this.id = options.id;
		console.log(this.id)
	},
	url: function() {
		return 'http://localhost:8080/Project/makanjaapi/source/CategoryProduct.php?cid=' + this.id;
	},
	model: CategoryItem,
	comparator: function(item) {
		//sort by id
        return item.get('id');
    }
});