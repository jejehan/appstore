RAD.view("view.right", RAD.Blanks.View.extend({
    className: 'menu',
    url: 'app/views/right/right.html',
    events: {
        'tap li': 'openView'
    },
	model:userAuth ,
	onInitialize: function () {
		"use strict";
		this.model.fetch();
		this.bindModel(this.model);
		
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
	onEndRender: function () {
        "use strict";
        var self= this
		var container = $(".menu-right")
		self.destroyScroll(container);
		self.createScroll(container);

    },
	createScroll: function ($html) {
        "use strict";
        var self = this,
            element = $html.find('.scroll-right').get(0);

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