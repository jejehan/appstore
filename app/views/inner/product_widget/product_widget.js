RAD.views.InnerProductWidget = RAD.Blanks.View.extend({
    url: 'app/views/inner/product_widget/product_widget.html',
	onEndRender: function () {
        "use strict";
        var self= this
		var container = $(".th-content")
		self.destroyScroll(container);
		self.createScroll(container);
    },
    events: {
        'tap .button-go-to': 'open'
    },
	onNewExtras:function (extras) {
		this.dataModel = new productCollections([],{id:extras.id});
		this.dataModel.fetch({
			success: function(collection){ 
				console.log(collection.at(0).attributes)
				this.dataModel = collection.at(0).attributes;
			}
		});
		this.bindModel(this.dataModel);
		console.log(this.dataModel)
		return this.model
		
	},
    open: function (e) {
        "use strict";
        var $target = $(e.currentTarget),
            $lastTarget = this.$lastTarget || this.$('.rad-footer.rad-tab-bar .active'),
            options = {
                container_id: '.th-content'
            },
            lastIndex = $lastTarget.data('index'),
            newIndex = $target.data('index');
		
        $lastTarget.removeClass('active');
        this.$lastTarget = $target;
        $target.addClass('active');

        options.content = $target.data('target');
        options.animation = $target.data('animation') + ((lastIndex > newIndex) ? '-out' : '-in');
        this.publish('navigation.show', options);
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
});

var	productModel = Backbone.Model.extend({
		defaults: {
				"id": 0,
				"price":0,
				"short_description": "",
				"available_now":"",
				"id_default_image":"",
				"name":"Product Name",
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
			console.log(response[0])
			return response[0]
		}
});