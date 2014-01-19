RAD.view("view.parent_widget",  RAD.Blanks.View.extend({
    url: 'app/views/parent_widget/parent_widget.html',
    children: [
        {
            container_id: '.sub-content',
            content: "view.inner_home_widget"
        },
        {
            container_id: '.menu-container',
            content: "view.menu"
        },
        {
            container_id: '.menu-container-right',
            content: "view.right"
        }
		
    ],
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    tapWidth: 100,
    events: {
        'tapdown .content-container': 'tapDown',
        'tapmove .content-container': 'tapMove',
        'tapup .content-container': 'tapUp',
        'tapcancel .content-container': 'tapChancel',
        'tapclear .content-container': 'tapClear',

        'tap .content-overlay': 'toggleMenu',
        'tap .toggle-menu': 'menuLeft',
        'tap .right-menu': 'menuRight'
    },
    onEndRender: function () {
        "use strict";
        this.$overlay = this.$('.content-overlay');
        this.$content = this.$('.content-container');
        this.contentPosition = this.contentPosition || 0;
        this.changePosition(this.contentPosition);

        this.menuWidth = this.$('.menu-container').width();
		this.menuRightWidth = this.$('.menu-container-right').width();
    },

    changePosition: function (position) {
        "use strict";
        var value = "translate3d(" + position + "px, 0, 0)";

        window.getComputedStyle(this.$content.get(0)).width;

        this.$content.css({
            'transform': value,
            '-o-transform': value,
            '-ms-transform': value,
            '-moz-transform': value,
            '-webkit-transform': value
        });
        this.contentPosition = position;

        this.$overlay.css({
            'transform': value,
            '-o-transform': value,
            '-ms-transform': value,
            '-moz-transform': value,
            '-webkit-transform': value
        });

    },

    prepareAnimation: function () {
        "use strict";
        var self = this,
            $container = this.$content,
            eventName = 'webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd';
		
        function onEnd(e) {
            if (e && e.target !== $container.get(0)) {return; }

            $container.removeClass('swipe-animation');
            $container.off(eventName, onEnd);
            clearTimeout($container.get(0).timeout);
			
			if(self.contentPosition == 250){
				$('.menu-container').css({'visibility': 'visible'})
				$('.menu-container-right').css({'visibility': 'hidden'})
			}
				
			if(self.contentPosition == -250){
				$('.menu-container-right').css({'visibility': 'visible'})
				$('.menu-container').css({'visibility': 'hidden'})
			}
            if (self.contentPosition == 250 || self.contentPosition == -250) {
                self.$overlay.css({'visibility': 'visible'});
            } else {
                self.$overlay.css({'visibility': 'hidden'});
            }

            $container.get(0).timeout = null;
        }

        $container.addClass('swipe-animation');
        $container.on(eventName, onEnd);
        $container.get(0).timeout = setTimeout(onEnd, 5000);
    },
    touchBlock: function (e) {
        "use strict";
		
        if (e && this.isRunning) {
            e.stopPropagation();
            e.preventDefault();
        }
    },
    tapDown: function (e) {
        "use strict";
		
        this.startX = e.originalEvent.tapdown.clientX;
        if (this.startX < this.tapWidth) {
            this.isRunning = true;
            this.publish("view.product_widget.block", null);
        }
        this.isSwipe = false;
        this.touchBlock(e);
    },

    tapMove: function (e) {
        "use strict";
	
        var X = e.originalEvent.tapmove.clientX,
            delta = X - this.startX;
		
        this.isSwipe = true;

        if (!this.isRunning) {return; }
        //calculate new containers positions
        this.changePosition(this.contentPosition + delta);

        //for next move function
        this.startX = X;
        this.touchBlock(e);
    },

    tapChancel: function (e) {
        "use strict";
		
        var self = this;
        this.clearTimeout = setTimeout(function () {
            self.tapUp();
        }, 50);
    },

    tapClear: function (e) {
        "use strict";
		
        clearTimeout(this.clearTimeout);
    },

    tapUp: function (e) {
        "use strict";
		
        var newPosition = (this.contentPosition > this.menuWidth / 2) ? this.menuWidth : 0;
		
        this.touchBlock(e);

        if (this.isSwipe && this.isRunning) {
            this.isSwipe = false;
            this.prepareAnimation();
            this.changePosition(newPosition);
        }
        this.isRunning = false;
        this.publish("view.product_widget.unblock", null);
    },

    closeMenu: function () {
        "use strict";
        this.prepareAnimation();
        this.changePosition(0);
    },

    openMenu: function () {
        "use strict";
        this.prepareAnimation();
        this.changePosition(this.menuWidth);
    },

    toggleMenu: function () {
        "use strict";
		if(this.contentPosition > 0){
			var newPosition = (this.contentPosition > this.menuWidth / 2) ? 0 : this.menuWidth;
		}else{
			var newPosition = (this.contentPosition < this.menuWidth / 2) ? 0 : this.menuWidth;
		}
		
        this.prepareAnimation();
		
        this.changePosition(newPosition);
    },
	menuLeft: function () {
        "use strict";
        var newPosition = (this.contentPosition > this.menuWidth / 2) ? 0 : this.menuWidth;
        this.prepareAnimation();

        this.changePosition(newPosition);
    },
	menuRight: function () {
        "use strict";
        var newPosition = (this.contentPosition > this.menuWidth / 2) ? 0 : this.menuWidth;
        this.prepareAnimation();
        this.changePosition(newPosition * -1);
    },

    onReceiveMsg: function (channel, data) {
        "use strict";
        var strings = channel.split('.');
        switch (strings[2]) {
        case 'close':
            this.closeMenu();
            break;
        case 'open':
            this.openMenu();
            break;
        case 'toggle':
            this.toggleMenu();
            break;
        }
    },

    parseToArray: function (query) {
        "use strict";
        var i, l, arr = [];
        for (i = 0, l = query.length; i < l; i += 1) {
            arr.push(query[i].getAttribute('view'));
        }
        return arr;
    },

    openDialog: function () {
        "use strict";
        var list = this.parseToArray(document.querySelectorAll('[view]')),
            options = {
                content: "view.dialog",
                extras: {
                    title: "Widgets in DOM",
                    content: list
                }
            };
        this.publish('navigation.dialog.show', options);
    }
}), false);