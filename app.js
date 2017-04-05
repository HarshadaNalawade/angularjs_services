var app = angular.module('contactApp',[]);

app.service('ContactService',function(){
    var uid = 1;
    var contacts = [{
        id:1,
        name:'test',
        email:'test@gmail.com',
        phone:'1234567898'
    }];

    this.save = function(contact)
    {
        console.log(contact);
        if(contact.id==null)
        {
            contact.id = ++uid;
            contacts.push(contact);
        }
        else
        {
            for(i in contacts)
            {
                if(contacts[i].id == contact.id)
                {
                    contacts[i] = contact;
                }
            }
        }
    }

    this.delete = function(id)
    {
        for(i in contacts)
        {
            if(contacts[i].id == id)
            {
                contacts.splice(i,1);
            }
        }
    }

    this.list = function()
    {
        return contacts;
    }

    this.get = function(id)
    {
        for(i in contacts)
        {
            if(contacts[i].id == id)
            {
                return contacts[i];
            }
        }
    }
});


app.controller('ContactController',function($scope,ContactService){
    $scope.contacts = ContactService.list();

    $scope.saveContact = function()
    {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
    }

    $scope.delete = function(id)
    {
        ContactService.delete(id);
        if($scope.newcontact.id==id) $scope.newcontact = {}; 
    }

    $scope.edit = function(id)
    {
        $scope.newcontact = angular.copy(ContactService.get(id));
    }
});
