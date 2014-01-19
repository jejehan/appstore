RAD.namespace('utils.Query', function (context) {
    var query = this,
        stack = [];

    function next(previousResult) {
        var fn = stack.shift();
        if (fn && typeof fn === 'function') {
            fn.apply(context, [previousResult, next]);
        }
    }

    query.push = function (fn) {
        stack.push(fn);
    };

    query.run = function () {
        next(null);
    };

    return query;
});

RAD.application(function (core) {
    'use strict';

    var app = this;
	
	function showMainScreen(previousResult, nextFn){
		core.publish('navigation.show', {
            container_id: '#screen',
            content: "view.parent_widget",
            animation: 'none',
            callback: nextFn
        });
	}
	
	function showLoadingScreen(previousResult, nextFn) {
        core.publish('navigation.show', {
            container_id: '#screen',
            content: "view.loading",
            animation: 'none',
            callback: nextFn
        });
    }
	
    app.start = function () {
		var query = new RAD.utils.Query(this);
		query.push(showLoadingScreen);
		query.push(showMainScreen);
        query.run();
    };

    return app;
},true);

