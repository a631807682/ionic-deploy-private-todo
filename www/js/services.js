angular.module('starter.services', [])
    .factory("versionUpdateService", function($ionicPopup, $ionicDeploy, $timeout, $ionicLoading) {



        var version;

        /**
         * 获得version
         */
        function getAppVersion() {

            $ionicDeploy.info().then(function(data) {
                var binaryVersion = data.binary_version;
                var deployUuid = data.deploy_uuid;
                version = deployUuid != 'NO_DEPLOY_AVAILABLE' ? deployUuid : binaryVersion;
            });

        }



        /**
         * 检查更新
         */
        function checkUpdate() {
            $ionicLoading.show({
                template: '正在检查更新...',
                animation: 'fade-in',
                showBackdrop: true,
                duration: 3000,
                showDelay: 0
            });

            $ionicDeploy.check().then(function(result) {

                if (result.available == 'true') {
                    showUpdateConfirm(result);
                } else {
                    $ionicLoading.show({
                        template: '恭喜你,你的版本已经是最新!',
                        animation: 'fade-in',
                        showBackdrop: true,
                        duration: 2000,
                        showDelay: 0
                    });
                }
            }, function(err) {
                $ionicLoading.show({
                    template: '更新失败,请检查您的网络配置!' + err,
                    animation: 'fade-in',
                    showBackdrop: true,
                    duration: 2000,
                    showDelay: 0
                });

            });
        }

        function init() {}

        function showUpdateConfirm(checkResult) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.confirm({
                title: '版本升级',
                template: "有新的版本了,是否要升级?",
                cancelText: '取消',
                okText: '升级'
            });
            confirmPopup.then(function(res) {
                //兼容更新
                if (checkResult.available == 'true' && checkResult.compatible == 'true') {
                    $ionicLoading.show({
                        template: '正在更新...',
                        animation: 'fade-in',
                        showBackdrop: true,
                        //duration: 2000,
                        showDelay: 0
                    });

                    if (res) {
                        $ionicDeploy.update().then(function(res) {
                            $ionicLoading.hide();
                            $ionicLoading.show({
                                template: '更新成功!',
                                animation: 'fade-in',
                                showBackdrop: true,
                                duration: 2000,
                                showDelay: 0
                            });
                        }, function(err) {
                            $ionicLoading.hide();
                            $ionicLoading.show({
                                template: '更新失败!' + err,
                                animation: 'fade-in',
                                showBackdrop: true,
                                duration: 2000,
                                showDelay: 0
                            });
                        }, function(prog) {
                            $ionicLoading.show({
                                template: "已经下载：" + prog + "%"
                            });
                            if (downloadProgress > 99) {
                                $ionicLoading.hide();
                            }
                        });
                    } else {
                        $ionicLoading.hide();
                    }
                }
                //非兼容更新
                else if (checkResult.available == 'true' && checkResult.compatible != 'true') {
                    $ionicLoading.show({
                        template: '请前往' + checkResult.update.url + '更新您的app',
                        animation: 'fade-in',
                        showBackdrop: true,
                        duration: 10000,
                        showDelay: 0
                    });
                }


            });
        };


        return {
            init: function() {
                getAppVersion();
            },

            getVersion: function() {
                return version;
            },

            checkUpdate: function() {
                checkUpdate();
            },

            update: function() {
                update();
            }
        }
    })
