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
		  // jshint ignore: start
		  $scope.essentialsGross = $scope.grossPay * .50;
		  $scope.financialGross = $scope.grossPay * .20;
		  $scope.personalGross = $scope.grossPay * .30;
		  // jshint ignore: end
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
	  //Adjust colors for percentages if over recommended value
	  $scope.getEssential = function() {
		  if ($scope.essentialPercentage > '50') {
			  $scope.adj = 'overPercentage';
			  $scope.setMe = 'over the recommended guideine by' + ' ' + parseInt($scope.essentialPercentage - 50) + '% which puts you at $' + parseFloat($scope.essentialsTotal - $scope.essentialsGross) + ' ' + 'over your recommended spendings.' ;
		  } else {
			  $scope.adj = 'yourPercentage';
			  $scope.setMe = 'meeting or below the recommended guideline.';
		  }
	  };
	  //Adjust colors for percentages if over recommended value
	  $scope.getFinancial = function() {
		  if ($scope.financialPercantage > '20') {
			  $scope.adj1 = 'overPercentage';
			  $scope.setMe1 = 'over the recommended guideine by' + ' ' + parseInt($scope.financialPercantage - 20) + '% which puts you at $' + parseFloat($scope.financialObligations - $scope.financialGross) + ' ' + 'over your recommended spendings.' ;
		  } else {
			  $scope.adj1 = 'yourPercentage';
			  $scope.setMe1 = 'meeting or below the recommended guideline.';
		  }
	  };
	  //Adjust colors for percentages if over recommended value
	  $scope.getPersonal = function() {
		  if ($scope.personalPercentage > '30') {
			  $scope.adj2 = 'overPercentage';
			  $scope.setMe2 = 'over the recommended guideine by' + ' ' + parseInt($scope.personalPercentage - 30) + '% which puts you at $' + parseFloat($scope.personalChoices - $scope.personalGross) + ' ' + 'over your recommended spendings.' ;
		  } else {
			  $scope.adj2 = 'yourPercentage';
			  $scope.setMe2 = 'meeting or below the recommended guideline.';
		  }
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
				  colors: ['#90ed7d','#5c5c5c'],
	              chart: {
	                  type: 'column'
	              }
	          },
	          title: {
	              text: ''
	          },
			  xAxis: {
				  title: {
					  text: 'Break Down'
				  },
			           categories: [
			                  'Essentials',
			                  'Financial Obligations',
			                  'Personal Choices'
			              ],
			              crosshair: true
			          },
			  yAxis: {
			              allowDecimals: true,
			              title: {
			                  text: 'Money Spent'
			              }
			          },
	          series: null,
		    			func: function () {
		    				$scope.updateChart();

		    			}  	
	      };
		  
		  $scope.toggle = true;
		  $scope.toggleCustom = function() {
			  $scope.toggle = false;
		  };
		  
		  //Reloads app from Start Over button
		  $scope.startOver = function() {
		  	  location.reload();
		  };  

  });
  
  
