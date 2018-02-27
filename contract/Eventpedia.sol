pragma solidity ^0.4.18;

contract Eventpedia {
    address public founder;
    mapping (string => Event) events;
    mapping (address => Person) users;
    mapping (address => mapping (string => bool)) registration;

    struct Event {
        address hostName;
        uint eventPrice;
    }

    struct Person {
        string name;
        uint balance;
        bool exist;
    }

    function Eventpedia () {
        founder = msg.sender;
    }

    function createEvent(uint _eventPrice,
                         string _eventID) {
                            events[_eventID] = Event(msg.sender, _eventPrice);
                         }

    function retrieveUserInfo() constant returns (string _name, uint _balance) {
        if(!users[msg.sender].exist) {
            users[msg.sender] = Person("Name not set", 0, true);
        }
        Person storage curPerson = users[msg.sender];
        _name = curPerson.name;
        _balance = curPerson.balance;
    }

    function retrieveBalance(uint _amount) {
        require(_amount<=this.balance);
        msg.sender.transfer(_amount);
    }

    function topUp() payable {
        if(!users[msg.sender].exist) {
            users[msg.sender] = Person("Name not set", 0, true);
        }
        users[msg.sender].balance += msg.value;
    }

    function changeName(string _name) {
        users[msg.sender].name = _name;
    }

    function isEnrolled(string _stat) constant returns (bool) {
        return registration[msg.sender][_stat];
    }

    function joinEvent(string _eventID) {
        require(users[msg.sender].balance>=events[_eventID].eventPrice);
        require(!registration[msg.sender][_eventID]);
        users[msg.sender].balance-=events[_eventID].eventPrice;
        registration[msg.sender][_eventID] = true;
    }

    function payEvent(string _eventID) {
        require(registration[msg.sender][_eventID]);
        users[events[_eventID].hostName].balance += events[_eventID].eventPrice;
        registration[msg.sender][_eventID] = false;
    }
}
