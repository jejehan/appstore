/**
* app.js
* 
*/ 
var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"products/:id": "productDetails",
		"Categorys/:id": "categoryDetails"
		
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
			myScroll = null;
			myScroll = new iScroll('wrapper',{
				 hideScrollbar: true,
                 fadeScrollbar: true
			});	
			setTimeout(function(){myScroll.refresh()}, 400);
			console.log("home load")
		});
	},
	productDetails: function (id) {
		var cProductDetails = new ProductDetailCollection([],{id:id});
		cProductDetails.fetch({
			success: function(collection){ 
				myScroll.destroy();
				$("#scroller").html(new ProductDetailView({model: collection.at(0).attributes}).render().el);
			}
		});
	},
	categoryDetails: function (id) {
		$("#scroller").empty();
		
		var cCategoryDetails = new CategoryDetailCollection([],{id:id});
		cCategoryDetails.fetch({
			success: function(collection){ 
				myScroll.refresh();
				$('#scroller').append('<div class="row full-width" id="display-data"></div>').el;
				collection.each(function(item){
					$('#display-data').append(new CategoryDetailsView({
						model: item.toJSON()
					}).el);
				});
				if(collection.length%2==1){
					add = 	'<div class="small-6 large-6 columns" id="home-product" style="background:#A7DBD8;">'+
							'<div id="image" align="center"></div>' +
							'</div> '
				}else{
					add = ''
				}
				$('#display-data').append(add);	
				
				myScroll.options.onScrollEnd = function(){
					if(Math.abs(this.maxScrollY) - Math.abs(this.y) < 10){
						console.log("scroller done")
					}
				};
			}
		});
	}
});

var app = new AppRouter();

$(function() {	
	Backbone.history.start();
});