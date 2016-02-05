'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module('expenseApp')
  .controller('MainCtrl', function ($scope) {
	  $scope.getData = {};
	  
	  $scope.reset = function() {
		  $scope.expense = angular.copy($scope.getData);
	  };
	  
	  $scope.reset();
	  
	  $scope.update = function(expense) {
		  // Grabs data from form object
		  $scope.getData = angular.copy(expense);
		  // Grabs gross pay data 
		  $scope.grossPay = $scope.getData.grossPay;
		  // Calculations based on recommended percentages
		  $scope.essentialsGross = $scope.grossPay * .50;
		  $scope.financialGross = $scope.grossPay * .20;
		  $scope.personalGross = $scope.grossPay * .30;
		  // Makes each elements from form data an assignable variable
		  $scope.housing = $scope.getData.housing;
		  $scope.food = $scope.getData.food;
		  $scope.transportation = $scope.getData.transportation;
		  $scope.insurance = $scope.getData.insurance;
		  $scope.power = $scope.getData.power;
		  $scope.gas = $scope.getData.gas;
		  $scope.water = $scope.getData.water;
		  $scope.other = $scope.getData.other;
		  $scope.essentialsTotal = $scope.housing + $scope.food + $scope.transportation + $scope.insurance + $scope.power + $scope.gas + $scope.water + $scope.other;
		  $scope.savings = $scope.getData.savings;
		  $scope.retirement = $scope.getData.retirement;
		  $scope.debt = $scope.getData.debt;
		  $scope.other2 = $scope.getData.other2;
		  $scope.financialObligations = $scope.savings + $scope.retirement + $scope.debt + $scope.other2;
		  $scope.cellphone = $scope.getData.cellphone;
		  $scope.cable = $scope.getData.cable;
		  $scope.dinningOut = $scope.getData.dinningOut;
		  $scope.gym = $scope.getData.gym;
		  $scope.other3 = $scope.getData.other3;
		  $scope.personalChoices = $scope.cellphone + $scope.cable + $scope.dinningOut + $scope.other3;
		  // Caluate Percentages
		  $scope.essentialPercentage = $scope.essentialsTotal/$scope.grossPay*100;
		  $scope.financialPercantage = $scope.financialObligations/$scope.grossPay*100;
		  $scope.personalPercentage = $scope.personalChoices/$scope.grossPay*100;
	  };
	  
	  $scope.options = {
	    useEasing : true,
	    useGrouping : true,
	    separator : ',',
	    decimal : '.',
	    prefix : '%',
	    suffix : ''
	  };
	  
	  $scope.addClass = function() {
		  if ($scope.essentialPercentage > '50') {
			  'overpercentage';
		  } else {
			  'percentage';
		  };
	  };
	  

	  $scope.updateChart = function() {
		  	var data = [{
		  	          	  name: 'Standard',
		  				  data: [parseFloat($scope.essentialsGross),parseFloat($scope.financialGross),parseFloat($scope.personalGross)]
		  	          }, {
		  				  name: 'You',
		  	              data: [parseFloat($scope.essentialsTotal), parseFloat($scope.financialObligations), parseFloat($scope.personalChoices)]
		  	          }];
					  $scope.highchartsNG.series = data;
	  };
	

	      $scope.highchartsNG = {
	          options: {
	              chart: {
	                  type: 'column'
	              }
	          },
	          title: {
	              text: 'Your Report'
	          },
			  xAxis: {
				  title: {
					  text: 'Breakdown'
				  },
			           categories: [
			                  'Essentials',
			                  'Financial Obligations',
			                  'Personal Choices'
			              ],
			              crosshair: true
			          },
			  yAxis: {
			              allowDecimals: false,
			              title: {
			                  text: 'Money Spent'
			              }
			          },
	          series: null,
		    			func: function () {
		    				$scope.updateChart();

		    			}  	
	      };
	  

  });
  
  
