var CategoryCollection = Backbone.Collection.extend({
	url: "http://toptotoe-boutique.com/jeapi/Category.php",
	model: CategoryItem,
	comparator: function(item) {
		//sort by id
        return item.get('id');
    }
});