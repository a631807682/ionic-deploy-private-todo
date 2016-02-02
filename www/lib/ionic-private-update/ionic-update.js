angular.module('ionic.private.update', [])

/**
 * Update conifg provider
 */
.provider('$ionicUpdateConfig', function() {

    var app = {};

    //非配置项
    var settings = {

    };


    this.set = function(k, v) {
        settings[k] = v;
    }

    /**
     * 配置项
     * {
     *   'app_id': '17dfe86d',
     *   'version': '0.0.1',
     *   'api_server_host': 'http://192.168.1.154:8100'
     * }
     */
    this.config = function(opts) {
        app = opts;
    }

    /**
     * 注入 ionicUpdateConfig.xxx
     */
    this.$get = [function() {
        return {
            getId: function() {
                return app.app_id;
            },
            getVersion: function() {
                return app.version;
            },
            getApiUrl: function() {
                return app.api_server_host;
            },
            getValue: function(k) {
                return settings[k];
            },
            /**
             * 服务地址
             * @param  {[type]} service [服务(check/down)]
             * @return {[type]}         [description]
             */
            getApiEndpoint: function(service) {
                return this.getApiUrl() + '/' + service;
            }

        }
    }];
})

/**
 * Update factory
 */
.factory('$ionicUpdate', [
    '$q',
    '$http',
    '$ionicUpdateConfig',
    function($q, $http, $ionicUpdateConfig) {

        return {
            /**
             * 检测更新函数
             * @return 
             */
            check: function() {
                var deferred = $q.defer();
                var url = $ionicUpdateConfig.getApiEndpoint('check');
                var entity = {
                    app_id: $ionicUpdateConfig.getId(),
                    device_app_version: $ionicUpdateConfig.getVersion,
                    device_platform: ''
                };

                $http.post(url, entity).then(function(res) {
                    deferred.resolve(res.data);
                }, function(res) {
                    deferred.reject(res.data);
                })
            },
            /**
             * 下载www.zip
             * @return {[type]} [description]
             */
            download: function() {




            },
            /**
             * 解压
             * @return {[type]} [description]
             */
            extract: function() {

            }



        }


    }
]);
