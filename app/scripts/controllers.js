angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ClientsCtrl', function($scope, $log, clientsFactory) {
  //$scope.clients = [{"_id":"57e7c3e55ca4e30cc4bf8b37","clientNo":"CL0001","firstName":"FName-1","lastName":"LName-2","__v":0},{"_id":"57e7d78763530112788be5f2","clientNo":"CL0002","firstName":"FName-2","lastName":"LName-2","__v":0}];


    $scope.getClients = function() {
      clientsFactory.getClients().then(
        function(res) {
          $scope.clients = res.data;
        },
        function(err) {
          $log.error(err);
        }

      );
      
    };

    $scope.getClients();

    $scope.deleteClient = function(id) {
      clientsFactory.deleteClient(id);
      $scope.getClients();
    };
})

.controller('AddEditClientCtrl', function($scope, $log, $stateParams, $state, clientsFactory) {
  //$scope.clients = [{"_id":"57e7c3e55ca4e30cc4bf8b37","clientNo":"CL0001","firstName":"FName-1","lastName":"LName-2","__v":0},{"_id":"57e7d78763530112788be5f2","clientNo":"CL0002","firstName":"FName-2","lastName":"LName-2","__v":0}];
    
    $scope.clientData = {};
    $scope.clientData._id = $stateParams.id;
    $scope.header ="Add New Client";

    if($scope.clientData._id != 0) {
      
      $scope.header ="Edit Client Data";

      clientsFactory.getClientDetails($scope.clientData._id).then(
        function(res){
          $scope.clientData = res.data;
          $log.info($scope.clientData);
        },
        function(err){
          $log.error(err);
        }
      );

    }


    $scope.saveClient = function() {
      clientsFactory.saveClient($scope.clientData).then(
        function(){
          $log.info('Client saved successfully');
          //$location.path('/clients');
           $state.go('tab.clients');  
        },
        function(){
          $log.error('Error saving data');
        }
      );
    };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
