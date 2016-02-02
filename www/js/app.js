// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// angular.module('starter', ['ionic', 'ionic.private.update', 'starter.controllers'])
angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'ionic.service.deploy', 'starter.services'])
    // .config(['$ionicUpdateConfigProvider', function($ionicUpdateConfigProvider) {
    //     $ionicUpdateConfigProvider.config({
    //         'app_id': '17dfe86d',
    //         'version': '0.0.1',
    //         'api_server_host': 'http://192.168.1.154:8100'
    //     })
    // }])
    .config(['$ionicAppProvider', function($ionicAppProvider) {
        // Identify app
        $ionicAppProvider.identify({
            // Your App ID
            app_id: '17dfe86d',
            // The public API key services will use for this app
            api_key: 'e97a48ed3565de98f92349c95a753daea13769e53b33f124',
            domain: 'http://192.168.1.154:8100',
            channel_tag: 'production'
                // Your GCM sender ID/project number (Uncomment if supporting Android)
                //gcm_id: 'YOUR_GCM_ID'
        });

    }])
    .run(function($ionicPlatform, $rootScope, versionUpdateService) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
  

        });

        // $rootScope.updateOptions = {
        //   interval: 2 * 60 * 1000
        // }

        // $ionicDeploy.watch($rootScope.updateOptions).then(function() {}, function() {},
        //   function(hasUpdate) {
        //     $rootScope.lastChecked = new Date();
        //     console.log('WATCH RESULT', hasUpdate);
        //   }
        // );
    })

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: 'AppCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

});
