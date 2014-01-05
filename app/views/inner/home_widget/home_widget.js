RAD.views.InnerHomeWidget = RAD.Blanks.ScrollableView.extend({
    url: 'app/views/inner/home_widget/home_widget.html',
	events: {
        'tap #home-product': 'openProduct'
    },
	oninit: function () {
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
}())