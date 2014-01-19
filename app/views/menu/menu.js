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
        var getNewView = $(e.currentTarget).data('view')
		var rSplit = getNewView.split("#")
		var newView = rSplit[0]
		var categoryId = rSplit[1]
		
        var options = {
                container_id: '.sub-content',
                content: newView,
                animation: 'none',
				extras:{
					id	: categoryId
				}
            };
		
        this.publish('navigation.show', options);
        this.publish('view.parent_widget.close', null);
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