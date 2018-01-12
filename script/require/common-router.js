(function () {
    'use strict';
    define([
        'jquery',
        'angular',
        'baseController',
        'socketController',
        'userController',
        'smileyDirective',
        'trackDirective',
        'drawDirective',
        'photoTrollDirective',
        'waveDirective',
        'scrollbar',
        'mmenu'
    ], function (jquery, angular, baseController, socketController, userController, smileyDirective, trackDirective, drawDirective, photoTrollDirective, waveDirective) {
        var app = angular.module('myCrazyApp', []);
        app.init = function () {
            angular.bootstrap(document, ['myCrazyApp']);
        };
        app.controller('baseController', baseController);
        app.controller('socketController', socketController);
        app.controller('userController', userController);
        app.directive('drawElement', drawDirective);
        app.directive('photoTrollElement', photoTrollDirective);
        app.directive('trackElement', trackDirective);
        app.directive('waveElement', waveDirective);
        app.directive('smileyElement', smileyDirective);

        return app;
    });
}());