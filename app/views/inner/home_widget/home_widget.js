RAD.view("view.inner_home_widget", RAD.Blanks.View.extend({
    url: 'app/views/inner/home_widget/home_widget.html',
	events: {
        'tap #home-product': 'openProduct'
    },
	onInitialize: function () {
		"use strict";
		this.model = RAD.models.HomeProducts
		this.model.fetch();
		
	},
	onEndRender: function () {
        "use strict";
        var self= this
		var container = $(".rad-content")
		self.destroyScroll(container);
		self.createScroll(container);
    },
	createScroll: function ($html) {
        "use strict";
        var self = this,
            element = $html.find('.scroll-view').get(0);

        $html.get(0).mScroll = new window.iScroll(element, {
            onBeforeScrollStart: function (e) {
                var target = e.target;

                while (target.nodeType !== 1) {
                    target = target.parentNode;
                }
                if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                }
            },
            onScrollStart: function (e) {
                if (self.swipeRunning) {
                    e.preventDefault();
                    e.stopPropagation();
                    self.swipeRunning = false;
                }
            },
            onScrollMove: function () {
                if (this.dirY !== 0 && !self.isSwiping) {
                    self.swipeRunning = true;
                }
            },
            onScrollEnd: function () {
                self.swipeRunning = false;
            }
        });
    },
    destroyScroll: function ($html) {
        "use strict";
        var el = $html.get(0);
        if (el && el.mScroll) {
            el.mScroll.destroy();
            el.mScroll = null;
        }
    },
	openProduct: function(e) {
		var container = $(".rad-content")
		var self = this;
		var el = container.get(0);
		if(el && el.mScroll){
			if(!el.mScroll.moved){
			
			
				self.publish('navigation.show', {
					container_id: '.sub-content',
					content: "view.loading",
					animation: 'none'
				});
				self.publish('view.parent_widget.close', null);
				
				var data_id = $(e.currentTarget).data('id')
				
				var collectProduct = new productCollections([],{id:data_id})
					
				collectProduct.fetch({
					success:function (collection){
						
						var options = {
							container_id: '.sub-content',
							content: 'view.inner_product_widget',
							animation: 'none',
							extras:{
								model: collection.at(0)
							}
						};
						
						self.publish('navigation.show', options);
						self.publish('view.parent_widget.close', null);
					}
				})
				
			}
		}
	}
}),false);

//data collection
RAD.models.HomeProducts = (function (){
	"use strict";
	var HomeProduct,Models ,result
	
	HomeProduct = Backbone.Model.extend({
		defaults: {
				"id": 0,
				"id_default_image":0,
				"id_homeslider_slides": "",
				"name":"Product Name",
				"price":""
		}
	});
	
	Models = Backbone.Collection.extend({
		url: "http://toptotoe-boutique.com/jeapi/HomeProduct.php",
		model: HomeProduct,
		comparator: function(item) {
			//sort by id
			return item.get('id');
		}
	})
	
	result = new Models();
    return result;
}());

var	productModel = Backbone.Model.extend({
		defaults: {
				"id": 0,
				"price":0,
				"short_description": "",
				"available_now":"",
				"id_default_image":"",
				"name":"Product Name"
		}
});     

var	productCollections = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.id = options.id;
		},
		url: function() {
			return "http://toptotoe-boutique.com/jeapi/Product2.php?ProdId=" + this.id;
		},
		model: productModel,
		comparator: function(item) {
			return item.get('id');
		},
		parse: function(response){
			return response[0]
		}
});