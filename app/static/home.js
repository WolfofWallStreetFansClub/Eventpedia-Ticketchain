module.exports = function(ngModule) {
  ngModule.directive('home', function() {
    return {
      templateUrl: 'app/directives/home.html'
    };
  });
}
