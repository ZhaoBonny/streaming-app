angular.module('myApp.controllers')
.controller('UserPlayerController', ['$scope', '$stateParams', 'User', '$rootScope', '$cookieStore', '$sce', '$http', 'streamUrls',
		function($scope, $stateParams, User, $rootScope, $cookieStore, $sce, $http, streamUrls) {
		// var user = $cookieStore.get('user').name.toLowerCase();
		var user = $stateParams.user;
		var userUrlPlayer = 'http://' + streamUrls.hlsUrl +'/hls/' + user + '.m3u8';
		$scope.hls = userUrlPlayer;
		$scope.userUrlPlayerRtmp = 'rtmp://'+streamUrls.rtmpUrl+'/hls/' + user + '_exhi';
		$scope.userUrl = $sce.trustAsResourceUrl(userUrlPlayer);

		$http.get('/check_live/' + user)
		.then(function(res, status) {
			if (res.data.playerOptions && res.data.playerOptions.rtmpHls) {
        $scope.rtmpHls = res.data.playerOptions.rtmpHls;
			}

			$scope.stream_live = res.data.stream_live;

			// RTMP and HLS delivery options

			// noUser under that name {
			if (res.data.err == "No user")
        $scope.noUser = res.data.err;

			});

		}
]);
