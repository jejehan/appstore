(function (document, window) {
    'use strict';

    var scripts = [
        "js/iscroll-lite.js",

        "app/application/application.js",

        "app/views/parent_widget/parent_widget.js",
        "app/views/menu/menu.js",
		"app/views/inner/home_widget/home_widget.js",
		"app/views/inner/category_widget/category_widget.js",
		"app/views/inner/product_widget/product_widget.js",
		"app/views/inner/product_widget/content-first/content-first.js",
        "app/views/inner/product_widget/content-second/content-second.js",
        "app/views/inner/product_widget/content-product/content-product.js",
        "app/views/inner/product_widget/content-second/first/first.js",
        "app/views/inner/product_widget/content-second/second/second.js",
    ];

    function onEndLoad() {

        var view = window.RAD.views,
            core = window.RAD.core,
            views = [
                {"view.parent_widget": view.ParentWidget},
                {"view.menu": view.menu},
				{"view.inner_home_widget": view.InnerHomeWidget},
				{"view.inner_category_widget": view.InnerCategoryWidget},
				{"view.inner_product_widget": view.InnerProductWidget},
				{"view.content_first_widget": view.ContentFirstWidget},
                {"view.content_second_widget": view.ContentSecondWidget},
                {"view.content_third_widget": view.ContentThirdWidget},
                {"view.first": view.FirstWidget},
                {"view.second": view.SecondWidget},
            ],
            application = new window.RAD.application(core),
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'slide',
                animationTimeout: 5000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //register views
        core.registerAll(views);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));