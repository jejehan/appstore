RAD.view("view.inner_product_widget", RAD.Blanks.View.extend({
    url: 'app/views/inner/product_widget/product_widget.html',
	onEndRender: function () {
        "use strict";
    },
	onStartAttach: function () {
		var self= this
		var container = $(".th-content")
		self.destroyScroll(container);
		self.createScroll(container);
		window.addEventListener('load', self.createScroll(container), false);
		$(document).foundation({
			orbit: {
				animation: 'slide',
				timer_speed: 1000,
				pause_on_hover: true,
				animation_speed: 500,
				navigation_arrows: true,
				bullets: false,
				variable_height:true
			}
		});
	},
    events: {
        'tap .button-go-to': 'open',
		'click .button': 'addToCart'
    },
	
	onNewExtras:function (data) {
		var self = this;
        if (!!data.model) {
			data.model.set({view:data.view})
            self.changeModel(data.model);
        }
	},
    open: function (e) {
        "use strict";
		
        var $target = $(e.currentTarget),
            $lastTarget = this.$lastTarget || this.$('.rad-footer.rad-tab-bar .active'),
            options = {
                container_id: '.sub-content'
            },
            lastIndex = $lastTarget.data('index'),
            newIndex = $target.data('index');
		
        $lastTarget.removeClass('active');
        this.$lastTarget = $target;
        $target.addClass('active');

        options.content = $target.data('target');
        options.animation = $target.data('animation') + ((lastIndex > newIndex) ? '-out' : '-in');
		
		this.publish('navigation.show', options);
		this.publish('view.inner_product_widget.close', null);
		this.publish('view.parent_widget.close', null);
    },
	addToCart: function(e){
		e.preventDefault();
		
		 var self = this,
			 oProduct = self.model.attributes,
			 oId = oProduct.id,
			 oName = oProduct.name,
		     oPrice = oProduct.price,
			 oDetail = {
							"name":oName,
							"price":oPrice,
							"id":oId,
							"qty":1
						}
			 
			 cart.addToCart(oDetail);
			 
			 self.publish('navigation.show', {
					container_id: '.sub-content',
					content: "view.keranjang_konfirmasi",
					animation: 'slide'
				});
			self.publish('view.parent_widget.close', null);
	},
	createScroll: function ($html) {
        "use strict";
        var self = this,
            element = $html.find('.scroll-product').get(0);
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
}),false);

var	productModel = Backbone.Model.extend({
		defaults: {
				"id": 0,
				"price":0,
				"short_description": "",
				"available_now":"",
				"id_default_image":"",
				"name":"Product Name",
				"image":"",
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