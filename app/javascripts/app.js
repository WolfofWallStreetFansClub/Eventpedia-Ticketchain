//require the keccak Hashing algorithm
var keccakHash = require('keccak');
var Promise = require('es6-promise').Promise;
//require ipfs-apivar ipfsAPI = require('ipfs-api');
var ipfsAPI = require('ipfs-api');
var Buffer = require('safe-buffer').Buffer;
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});
// Import libraries we need.
import app from '../../angularConfig';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import eventpedia_artifacts from '../../build/contracts/Eventpedia.json';

// MetaCoin is our usable abstraction, which we'll use through the code below.\
var Eventpedia = contract(eventpedia_artifacts);

var defaultUser;
var eventHash;

(function($) {
	$.extend({
		uiLock: function(content){
				if(content == 'undefined')
          content = '';
				$('<div></div>').attr('id', 'uiLockId').css({
					'position': 'fixed',
					'top': 0,
					'left': 0,
					'z-index': 1000,
					'opacity': 0.6,
					'width':'100%',
					'height':'100%',
					'color':'black',
					'background-color':'white'
				}).html(content).appendTo('body');
        $(`<div class="loader">
          <div class="loader__figure"></div>
          <p class="loader__label">Transaction Processing</p>
          </div>`).appendTo('body');
			},
		uiUnlock: function(){
				$('#uiLockId').remove();
        $('.loader').remove();
			}
	});
})(jQuery);

$(window).scroll(function() {
	if ($("#mainNav").offset().top > 100) {
	  $("#mainNav").addClass("navbar-shrink");
	} else {
	  $("#mainNav").removeClass("navbar-shrink");
	}
});

window.App = {
  start: function() {
    var self = this;
    // Bootstrap the MetaCoin abstraction for Use.
    Eventpedia.setProvider(web3.currentProvider);
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      defaultUser = accs[0];
      var pediaInstance;
      Eventpedia.deployed().then(function(instance) {
        pediaInstance = instance;
        return pediaInstance.getEventHash.call({from: defaultUser});
      }).then(function(data) {
        if(data == "0") {
          ipfs.files.add(Buffer.from('[]'), function(err, file) {
            eventHash = file[0].hash;
            self.listAllEvents();
          });
        } else {
          eventHash = data;
          self.listAllEvents();
        }
      }).catch(function(err) {
        console.log(err);
      });
      self.retrieveUserInfo();
    });
  },

  createUser: function() {
    var self = this;
    $.uiLock('');
    var pediaInstance;
    Eventpedia.deployed().then(function(instance) {
      pediaInstance = instance;
      return pediaInstance.createUser($(userName).val(), {from: defaultUser});
    }).then(function() {
      $('#regRes').text('Registration succeeds');
      $.uiUnlock('');
    }).catch(function(e) {
      console.log(e);
      $('#regRes').text('Failed to register with this address');
      $.uiUnlock('');
    })
  },

  retrieveUserInfo: function() {
    var self = this;
    $.uiLock('');
    var pediaInstance;
    Eventpedia.deployed().then(function(instance) {
      pediaInstance = instance;
      return pediaInstance.retrieveUserInfo.call({from: defaultUser});
    }).then(function(value) {
      $('#userInfo').text(value);
      $.uiUnlock('');
    }).catch(function(e) {
      console.log(e);
      $('#userInfo').text('Failed to retrieve user info');
      $.uiUnlock('');
    });
  },

  createEvent: function() {
    var self = this;
    //Getting all the event details
    var eventIns = {};
    eventIns["eventName"] = $('#eventName').val();
    eventIns["eventAddr"] = $('#eventAddr').val();
    eventIns["eventDes"] = $('#eventDes').val();
    eventIns["registerStart"] = (new Date($('#registerStart').val()).getTime())/1000;
    eventIns["registerEnd"] = (new Date($('#registerEnd').val()).getTime())/1000;
    eventIns["hostName"] = defaultUser;
    eventIns["eventPrice"] = $('#eventPrice').val();
    eventIns["eventDate"] = (new Date($('#eventDate').val()).getTime())/1000;
    var hostName = defaultUser;
    var eventPrice = $('#eventPrice').val();
    var eventDate = (new Date($('#eventDate').val()).getTime())/1000;
    var eventID = keccakHash('keccak256').update(eventIns["registerStart"]+eventIns["registerEnd"]+eventIns['eventName']+defaultUser+eventDate).digest('hex').toString('hex');
    eventIns["eventID"] = eventID;
    var newEvent = JSON.stringify(eventIns);
    $.uiLock('');
    ipfs.files.get(eventHash, function(err, stream) {
      if(err) {
        console.log(err);
        $.uiUnlock('');
        return;
      }

      stream.on('data', (chunk) => {
        var data = JSON.parse(chunk.content.read().toString());
        data.push(newEvent);
        data = JSON.stringify(data);
        ipfs.files.add(Buffer.from(data), function(err, file) {
          if(err) {
            console.log(err);
            $.uiUnlock('');
            return;
          }
          eventHash = file[0].hash;
          var pediaInstance;
          Eventpedia.deployed().then(function(instance) {
            pediaInstance = instance;
            console.log(eventID + " - origin");
            return pediaInstance.createEvent(eventHash, hostName, eventPrice, eventDate, eventID, {from: defaultUser});
          }).then(function() {
            $('#eventCreate').text('A new event has been created');
            $.uiUnlock('');
          }).catch(function(e) {
            console.log(e);
            $('#eventCreate').text('Failed to create a new event');
            $.uiUnlock('');
          });
        });
      });
    })
  },

  listAllEvents: function() {
    var self = this;

    var header = `<tr>
                    <th>Event Name</th>
                    <th>Event Description</th>
                    <th>Event Location</th>
                    <th>Participation Fee</th>
                    <th>Event Date</th>
                    <th>Registration status</th>
                    <th>Detail</th>
                </tr>`;
    $('#joinedEvent').empty();
    $('#eventList').empty();
    $('#joinedEvent').html(header);
    $('#eventList').html(header);

    console.log(eventHash);
    ipfs.files.get(eventHash, function(err, stream) {
        if(err) {
          console.log(err);
          return;
        }
        stream.on('data', (chunk) => {
           var events = JSON.parse(chunk.content.read().toString());

           events.forEach(function(curEvent) {
               curEvent =  JSON.parse(curEvent);
               var append = "<tr>";
               var isEnrolled = false;
               var pediaInstance;
               Eventpedia.deployed().then(function(instance) {
                 pediaInstance = instance;
                 return pediaInstance.isEnrolled.call(curEvent["eventID"], {from: defaultUser});
               }).then(function(data) {
                  isEnrolled = data;
                  append += "<td>" + curEvent["eventName"] + "</td>";
                  append += "<td>" + curEvent["eventDes"] + "</td>";
                  append += "<td>" + curEvent["eventAddr"] + "</td>";
                  append += "<td>" + curEvent["eventPrice"] + "</td>";
                  var d = new Date(0);
                  d.setUTCSeconds(curEvent["eventDate"]);
                  append += "<td>" + d + "</td>";
                  if(isEnrolled) append += "<td>Registered</td>";
                  else append += "<td><input type='submit' value='Join Event!' onclick='App.joinEvent(\""+curEvent["eventID"]+"\")'></td>";
                  append += "<td><button><a href='#!event?key=" + curEvent["eventID"] + "'>view</a></button></td>";
                  append += "</tr>";
                  if(isEnrolled) $('#joinedEvent').append(append);
                  else $('#eventList').append(append);
               }).catch(function(e) {
                   console.log(e);
               });
           });
        });
    });
  },

  topUpAccount: function() {
    var self = this;
    $.uiLock('');
    var pediaInstance;
    Eventpedia.deployed().then(function(instance) {
      pediaInstance = instance;
      return pediaInstance.topUp({from: defaultUser, value: $('#topUpNum').val()*Math.pow(10, 18)});
    }).then(function() {
      $('#topUpRes').text("Top up succeeds");
      $.uiUnlock('');
    }).catch(function(e) {
      console.log(e);
      $('#topUpRes').text("An error occurs during the transaction");
      $.uiUnlock('');
    });
  },

  joinEvent: function(eventID) {
    var self = this;
    $.uiLock('');
    var pediaInstance;
    Eventpedia.deployed().then(function(instance) {
      pediaInstance = instance;
      return pediaInstance.joinEvent(eventID, {from: defaultUser});
    }).then(function() {
        self.listAllEvents();
        alert("registration succeeds!");
        $.uiUnlock('');
    }).catch(function(e) {
      console.log(e);
      alert("registration failed!");
      $.uiUnlock('');
    });
  },

  viewEvent: function(eventID) {
    return new Promise((resolve, reject) => {
      var self = this;
      ipfs.files.get(eventHash, function(err, stream) {
        if(err) {
          console.log(err);
          return;
        }
        stream.on('data', (chunk) => {
          var pediaInstance;
          Eventpedia.deployed().then(function(instance) {
            pediaInstance = instance;
            return pediaInstance.viewEvent.call(eventID, {from: defaultUser});
          }).then(function(num) {
              var events = JSON.parse(chunk.content.read().toString());
              var curEvent = JSON.parse(events.find((x) => {return JSON.parse(x)["eventID"] == eventID;}));
              curEvent["participants"] = num;
              resolve(curEvent);
          }).catch(function(e) {
            console.log(e);
          });
        });
      });
    });
  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545.");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
