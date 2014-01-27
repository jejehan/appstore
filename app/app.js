(function (document, window) {
    'use strict';

    var scripts = [
        "js/iscroll-lite.js",
		
		"app/function.js",
		
        "app/application/application.js",
		"app/models/model.js",

        "app/views/parent_widget/parent_widget.js",
        "app/views/menu/menu.js",
		"app/views/right/right.js",
		"app/views/inner/home_widget/home_widget.js",
		"app/views/inner/category_widget/category_widget.js",
		"app/views/inner/product_widget/product_widget.js",
		"app/views/login_register/login_register.js",
		"app/views/login_register/register/register.js",
		"app/views/login_register/login/login.js",
		"app/views/keranjang_konfirmasi/keranjang_konfirmasi.js",
		"app/views/keranjang_konfirmasi/keranjang/keranjang.js",
		"app/views/keranjang_konfirmasi/konfirmasi/konfirmasi.js",
		"app/views/loading/loading.js"
    ];

    function onEndLoad() {

        var application = window.RAD.application,
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'slide',
                animationTimeout: 5000,
                debug: false
            };

        //initialize core by new application object
        window.RAD.core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));