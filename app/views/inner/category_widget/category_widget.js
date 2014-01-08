RAD.views.InnerCategoryWidget = RAD.Blanks.ScrollableView.extend({
    url: 'app/views/inner/category_widget/category_widget.html',
	events: {
        'tap #home-product': 'openProduct'
    },
	onEndRender: function () {
        "use strict";
        var self= this
		var container = $(".rad-content")
		self.destroyScroll(container);
		self.createScroll(container);
    },
	onNewExtras: function(extras){
		this.catId = extras.id
		this.model = new CategoryCollections([],{id:this.catId});
		this.bindModel(this.model);
		this.model.fetch();
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
		console.log("here")
		var container = $(".rad-content")
		var el = container.get(0);
		if(el && el.mScroll){
			if(!el.mScroll.moved){
				
				var data_id = $(e.currentTarget).data('id')
				var options = {
						container_id: '.sub-content',
						content: 'view.inner_product_widget',
						animation: 'none',
						extras:{
							id: data_id
						}
					};
		
				this.publish('navigation.show', options);
				this.publish('view.parent_widget.close', null);
			}
		}
	}
});


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
			var urlNya 	= "http://localhost:8080/Project/makanjaapi/source/CategoryProduct.php"
			var param	= "?cid=" + this.id
			return urlNya + param ;
		},
		model: CategoryProduct,
		comparator: function(item) {
			return item.get('id');
		}
});