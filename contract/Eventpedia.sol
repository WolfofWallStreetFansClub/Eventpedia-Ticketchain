pragma solidity ^0.4.2;

contract Eventpedia {

    string public eventHash;
    address public founder;
    mapping (string => Event) events;
    mapping (address => Person) users;
    mapping (address => mapping (string => bool)) registration;

    struct Event {
        address hostName;
        uint eventPrice;
        uint eventDate;
        uint participants;
        bool exist;
    }

    struct Person {
        string name;
        int credit;
        uint balance;
        bool exist;
    }

    function Eventpedia () {
        eventHash = "0";
        founder = msg.sender;
    }

    function createEvent(string _eventHash,
                         address _hostName,
                         uint _eventPrice,
                         uint _eventDate,
                         string _eventID) {
                            eventHash = _eventHash;
                            events[_eventID] = Event(_hostName, _eventPrice, _eventDate, 0, true);
                         }

    function createUser(string _name) {
        require(!users[msg.sender].exist);
        users[msg.sender] = Person(_name, 0, 0, true);
    }

    function retrieveUserInfo() returns (string _name, int _credit, uint _balance) {
        require(users[msg.sender].exist);
        Person storage curPerson = users[msg.sender];
        _name = curPerson.name;
        _credit = curPerson.credit;
        _balance = curPerson.balance;
    }

    function retrieveBalance(uint _amount) {
        require(_amount<=this.balance);
        msg.sender.transfer(_amount);
    }

    function showBalance(address _user) returns (uint) {
        return users[_user].balance;
    }

    function topUp() payable {
        users[msg.sender].balance += msg.value;
    }

    function getEventHash() constant returns (string) {
        return eventHash;
    }

    function isEnrolled(string _stat) constant returns (bool) {
        return registration[msg.sender][_stat];
    }

    function viewEvent(string _eventID) constant returns (uint) {
        require(events[_eventID].exist);
        return events[_eventID].participants;
    }

    function joinEvent(string _eventID) {
        require(users[msg.sender].balance>=events[_eventID].eventPrice);
        require(!registration[msg.sender][_eventID]);
        users[msg.sender].balance-=events[_eventID].eventPrice;
        registration[msg.sender][_eventID] = true;
        ++events[_eventID].participants;
    }

}
