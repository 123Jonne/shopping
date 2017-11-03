angular.module('app')
  .controller('myorderController', ['$rootScope','$state', '$scope', 'API', 'utils', function ($rootScope,$state, $scope, API, utils) {

    $scope.isNotHas = true;

    $scope.comments = {
      comment: ''
    };

    utils.tips.initPopover($scope);

    utils.tips.showLoadTips();
    API.fetchGet('/myorder', {email: $rootScope.user.email})
      .then(function (data) {
        $scope.data = data.data;
        console.log($scope.data);
        if ($scope.data.length > 0) {
          $scope.isNotHas = false;
        }
        utils.tips.hideLoadTips();
      })
      .catch(function (err) {
        console.log(err);
        utils.tips.hideLoadTips();
      })

      $scope.discussion = function (item, index) {
        utils.tips.openPopover($scope);
        $scope.comments.comment = '';
        $scope.datas = {
          index: index,
          cartid: item.cartid,
          pname: item.pname,
          content: '',
          email: $rootScope.user.email,
          nickname:  $rootScope.user.nickname,
          commentTime: new Date().format('yyyy-MM-dd hh:mm:ss'),
          did: item.pid
        }

      }

      $scope.closePopover = function () {
        utils.tips.closePopover($scope);
      }

      $scope.confirmDisc = function () {
        utils.tips.showLoadTips();
        $scope.datas.content = $scope.comments.comment;
        API.fetchPost('/updatecomment/' + $scope.datas.did, $scope.datas)
        .then(function (data) {

          API.fetchPost('/updateShopcart/' + $scope.datas.cartid, {
            cartid: $scope.datas.cartid,
            email: $rootScope.user.email
          })
          .then(function (d) {
            utils.tips.hideLoadTips();
            utils.tips.closePopover($scope);
            // utils.tips.showTips(d.data.msg, $scope);
            $scope.data[$scope.datas.index].commentstatus = 1;
          })
          .catch(function (err) {
            console.log(err);
          })

        })
        .catch(function (err) {
          console.log(err);
          utils.tips.hideLoadTips();
        })
        
      }

  }])