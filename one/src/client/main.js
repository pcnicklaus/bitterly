
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'partials/form.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'partials/form-profile.html'
        })

        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'partials/form-interests.html'
        })

        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'partials/form-payment.html'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/form/profile');
})

// our controller for the form
// =============================================================================
.controller('formController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {

        console.log($scope.formData.delivery)

        if ($scope.formData.delivery === "phone") {

            // var holder = userService.user.searchKeyword;
            // var searchPhrase = holder.replace(' ', '%20');

            // var payload = {
            //   city:     userService.user.searchState,
            //   keyword:  searchPhrase
            // };
            // console.log(payload, 'payload');

            $http.post('/call')
                .success(function(data) {
                    console.log(data, '');
                })
                .error(function(err) {
                    console.log(err, 'error');
                });

        }

        else if ($scope.formData.delivery === "text") {

            var message     = $scope.formData.message;
            var number      = '+1' + $scope.formData.text1 + $scope.formData.text2 + $scope.formData.text3;
            var to          = $scope.formData.name;
            var from        = $scope.formData.fromName;

            // var from =

            var payload = {
              message   : message,
              number    : number,
              to        : to,
              from      : from
              // from: from
            };

            console.log(payload, 'payload');

            $http.post('/text', payload)
                .success(function(data) {
                    console.log(data);
                    $scope.messageData = data;
                })
                .error(function(err) {
                    console.log(err, 'error');
                });

        }

        else if ($scope.formData.delivery === "email") {


            var body    = $scope.formData.message;
            var email   = $scope.formData.email;
            var to      = $scope.formData.name;
            var from    = $scope.formData.fromName;

              var payload = {
                body    : body,
                email   : email,
                to      : to,
                from    : from
              };
              console.log(payload);

              $http.post('/mail', payload)
                    .success(function(data) {
                        $scope.responseData = data;
                        console.log($scope.responseData, 'resposne data');
                    })
                    .error(function(err) {
                        console.log(err, 'error');
                    });
        }
    };

}]);

