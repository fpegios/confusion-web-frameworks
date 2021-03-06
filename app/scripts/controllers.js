'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.messageForDishes = "Loading ...";

            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.messageForDishes = "Error: "+response.status + " " + response.statusText;
            });

            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory' , function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    
                    var feedback = feedbackFactory.getFeedback().get();
                    feedback.mychannel = $scope.feedback.mychannel;
                    feedback.firstName = $scope.feedback.firstName;
                    feedback.lastName = $scope.feedback.lastName;
                    feedback.agree = $scope.feedback.agree;
                    feedback.email = $scope.feedback.email;
                    feedback.$save();
                    
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            $scope.showDish = false;
            $scope.message = "Loading ...";
            $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
            );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            $scope.ratings = [1, 2, 3, 4, 5];
            
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                $scope.dish.comments.push($scope.mycomment);
                
                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
                
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
            $scope.showDish = false;
            $scope.messageForDish = "Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.messageForDish = "Error: "+response.status + " " + response.statusText;
                    }
                );
            
            $scope.showPromotion = false;
            $scope.messageForPromotions = "Loading ...";
            $scope.promotion = menuFactory.getPromotions().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.promotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response){
                        $scope.messageForPromotions = "Error: "+response.status + " " + response.statusText;
                    }
            
            );
            
            $scope.showLeader = false;
            $scope.messageForLeader = "Loading ...";
            $scope.leader = corporateFactory.getLeaders().get({id:3})
                .$promise.then(
                    function(response){
                        $scope.leader = response;
                        $scope.showLeader = true;
                    },
                    function(response){
                        $scope.messageForLeader = "Error: "+response.status + " " + response.statusText;
                    }
            
            );
            
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            $scope.showLeaders = false;
            $scope.messageForLeaders = "Loading ...";
            $scope.leaders = corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.messageForLeaders = "Error: "+response.status + " " + response.statusText;
            });
        }])
;
