var CategoryCollection = Backbone.Collection.extend({
	url: "http://localhost:8080/Project/makanjaapi/source/Category.php",
	model: CategoryItem,
	comparator: function(item) {
		//sort by id
        return item.get('id');
    }
});