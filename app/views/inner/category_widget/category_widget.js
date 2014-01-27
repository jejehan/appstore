RAD.view("view.inner_category_widget",RAD.Blanks.View.extend({
    url: 'app/views/inner/category_widget/category_widget.html',
	events: {
        'tap #home-product': 'openProduct'
    },
	onStartAttach: function () {
		var self= this
		var container = $(".rad-content")
		self.destroyScroll(container);
		self.createScroll(container);
	},
	onEndRender: function () {
        "use strict";
    },
	onNewExtras: function(extras){
		this.bindModel(extras.model);
	},
	createScroll: function ($html) {
        "use strict";
        var self = this,
            element = $html.find('.scroll-product').get(0);
		
		if(element != "undefined"){
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
		}
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
					animation: 'slide'
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
								model: collection.at(0),
								view: "view.inner_category_widget"
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


var	CategoryProduct = Backbone.Model.extend({
		defaults: {
			"id": 0,
			"id_default_image":0,
			"id_homeslider_slides": "",
			"name":"Product Name",
			"price":""
		}
});

var	CategoryCollections = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.id = options.id;
		},
		url: function() {
			//var urlNya = "http://toptotoe-boutique.com/jeapi/CategoryProduct.php?cid="
			var urlNya 	= "http://toptotoe-boutique.com/jeapi/CategoryProduct.php"
			var param	= "?cid=" + this.id
			return urlNya + param ;
		},
		model: CategoryProduct,
		comparator: function(item) {
			return item.get('id');
		}
});