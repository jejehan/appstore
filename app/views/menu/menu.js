RAD.view("view.menu", RAD.Blanks.View.extend({
    className: 'menu',
    url: 'app/views/menu/menu.html',
    events: {
        'tap li': 'openView'
    },
	getPageCount: function () {
        "use strict";
        return RAD.models.Category.length;
    },
    openView: function (e){
        "use strict";
		var self = this;
        var getNewView = $(e.currentTarget).data('view')
		var rSplit = getNewView.split("#")
		var newView = rSplit[0]
		var categoryId = rSplit[1]
						
		if(categoryId == undefined ){
			var options = {
				container_id: '.sub-content',
				content: newView,
				animation: 'none',
				
			};
			self.publish('navigation.show', options);
			self.publish('view.parent_widget.close', null);
		}else{
			self.publish('navigation.show', {
					container_id: '.sub-content',
					content: "view.loading",
					animation: 'none'
				});
			self.publish('view.parent_widget.close', null);
			
			var collectProduct = new CategoryCollections([],{id:categoryId})
				collectProduct.fetch({
					success:function (collection){
						var options = {
							container_id: '.sub-content',
							content: newView,
							animation: 'none',
							extras:{
								model : collection
							}
						};
						
						self.publish('navigation.show', options);
						self.publish('view.parent_widget.close', null);
					}
				});
		}
			
    },
	oninit: function () {
		"use strict";
		this.model = RAD.models.Category
	},
	onEndRender: function () {
        "use strict";
        var self= this
		var container = $(".menu-left")
		self.destroyScroll(container);
		self.createScroll(container);
    },
	createScroll: function ($html) {
        "use strict";
        var self = this,
            element = $html.find('.scroll-left').get(0);

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
    }
}),false);



//data collection
RAD.models.Category = (function (){
	"use strict";
	var HomeSliderItem,Models ,result
	
	HomeSliderItem = Backbone.Model.extend({
		defaults: {
				"id_homeslider_slides": 0,
				"position":0,
				"image": ""
		}
	});
	
	Models = Backbone.Collection.extend({
		url: "http://toptotoe-boutique.com/jeapi/Category.php",
		model: HomeSliderItem,
		comparator: function(item) {
			//sort by id
			return item.get('position');
		}
	})
	
	result = new Models();
	result.fetch();
    return result;
}())

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