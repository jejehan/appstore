/**
* app.js
* 
*/ 
var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"products/:id": "productDetails"
	},

	initialize: function  () {	
		
		this.homeSliderCollection = new HomeSliderCollection();
		this.homeSliderPresenter = new HomeSliderPresenter({
			collection:this.homeSliderCollection
		});
		
		this.productCollection = new ProductCollection();
		this.productPresenter = new ProductPresenter({
			collection:this.productCollection
		});
		
		this.categoryCollection = new CategoryCollection();
		this.categoryPresenter = new CategoryPresenter({
			collection:this.categoryCollection
		});
		
		this.categoryCollection.fetch()
	},

	home: function () {
		$("#scroller").empty();
		$.when(
			this.productCollection.fetch()
		).then(function(){
			myScroll = new iScroll('wrapper',{
				 hideScrollbar: true,
                 fadeScrollbar: true
			});	
			
			console.log("home load")
		});
	},
	productDetails: function (id) {
		var mdl = new ProductDetailCollection([],{id:id});
		mdl.fetch({
			success: function(collection){ 
				$("#scroller").html(new ProductDetailView({model: collection.at(0).attributes}).render().el);
			}
		});
	}
});

var app = new AppRouter();

$(function() {	
	Backbone.history.start();
});