angular.module('app', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/static/home.html'

  })

  .when('/discover', {
    templateUrl: 'app/static/discover.html',
    controller: 'discoverCtrl'
  })

  .when('/event', {
    templateUrl: 'app/static/event.html',
    controller: 'viewEvent'
  })

  .when('/profile', {
    templateUrl: 'app/static/profile.html'
  });
})

.controller('discoverCtrl', function($scope) {
    App.listAllEvents();
})

.controller('viewEvent', function($scope, $routeParams){
    App.viewEvent($routeParams.key).then((eventObj) => {
      $('#eventContent').html(`
        <h3>`+eventObj["eventName"]+`</h3>
        <hr>
        Event Address: `+eventObj["eventAddr"]+`<br>
        Event Description: `+eventObj["eventDes"]+`<br>
        Registration Starts: `+eventObj["registerStart"]+`<br>
        Registration Ends: `+eventObj["registerEnd"]+`<br>
        Host Ethereum Address: `+eventObj["hostName"]+`<br>
        Event Price: `+eventObj["eventPrice"]+`<br>
        Event Date: `+eventObj["eventDate"]+`<br>
        `);
    });
});
