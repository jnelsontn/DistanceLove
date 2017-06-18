'use strict';

app.controller('MessageCtrl', function($scope, $http, profile, partner, 
    apiUrl, RootFactory) {
    
    console.log('MessageCtrl Here');

    $scope.messages = profile.messages;
    $scope.partner_messages = partner.messages;

    // post the message to our Api, retrieve our profile, update msg $scope.
    $scope.addMessage = () => {
        $http({
            url: `${apiUrl}/messages/`,
            method: 'POST',
            headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            data: { 'message': $scope.message }
        }).then((server_response) => {
            console.log('server response: ', server_response.data);
            $scope.message = '';
            
            $http({
                url: `${apiUrl}/messages/`,
                headers: { 'Authorization': 'Token ' + RootFactory.getToken() },
            })
            .then((updated_messages) => {
                updated_messages = updated_messages.data.results;
                $scope.messages = updated_messages;
            });
        });
    };

});