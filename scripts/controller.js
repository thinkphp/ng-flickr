'use strict'

app.factory('Flickr', ['$http', 

            function( $http ){

                      var base = "http://api.flickr.com/services/feeds/photos_public.gne",

                          api_key = 'f7419c7c353a4812a53523af90e255df',

                          id = '23455178@N06'; //get your usernameID from http://idgettr.com/

                          return {
 
                                 get: function( usernameID ) {

                                      var url = base;

                                      var config = {

                                         'params': {
                                              'id': usernameID || id,
                                              'apikey': api_key,
                                              'jsoncallback': 'JSON_CALLBACK',
                                              'format': 'json' 
					           }
				              };

                                   return $http.jsonp(url, config);
                                 }
                          }
            }

])

app.controller('mainCtrl', ['$scope','Flickr', function($scope, Flickr){

               $scope.example = { hash: 'bucegi' }

               var handleResponse = function( response ) {

                   if(response.title != "" && response.generator == "http://www.flickr.com/") {

                       if( response.items.length > 0 ) {

                           $scope.items = response.items
                     
                       } else {

                           $scope.error = "This hashtag has returned no results" 

                           return
                       }

                   } else {

                           $scope.error = "This hashtag has returned no results" 

                           return
                   }
               } 

               Flickr.get( $scope.usernameID ).success(function( response ){
 
                            handleResponse( response )
               })
}])