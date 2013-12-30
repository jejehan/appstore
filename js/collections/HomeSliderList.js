var HomeSliderCollection = Backbone.Collection.extend({
	url: "http://toptotoe-boutique.com/jeapi/api/homeSlider",
	model: HomeSliderItem,
	comparator: function(item) {
		//sort by id
        return item.get('position');
    }
});