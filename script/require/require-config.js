(function () {
    "use strict";
    requirejs.config({
        //By default load any module IDs from js/lib
        baseUrl: 'script',
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
            jquery: 'lib/jquery',
            angular: 'lib/angularjs',
            commonRouter: 'require/common-router',
            baseController: 'controller/baseController',
            socketController: 'controller/socketController',
            userController: 'controller/userController',
            smileyDirective: 'directive/smileyDirective',
            waveDirective: 'directive/waveDirective',
            trackDirective: 'directive/trackDirective',
            photoTrollDirective: 'directive/photoTrollDirective',
            drawDirective: 'directive/drawDirective',
            scrollbar: 'lib/jquery-scrollbar',
            mmenu: 'lib/jquery-mmenu',
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'jquery': {
                exports: 'jquery'
            },
            'scrollbar': {
                deps: ['jquery'],
                exports: 'jQuery'
            },
            'mmenu': {
                deps: ['jquery'],
                exports: 'jQuery'
            }

        }
    });
    requirejs(['commonRouter'], function (commonRouter) {
        commonRouter.init();
    });

}());