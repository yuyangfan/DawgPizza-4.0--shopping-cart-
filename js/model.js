/*
    ListModel

    Basic model representing an array of model objects. Provides
    support for getting the array of items, getting a single item
    by an 'id' property (if exists), adding new items and removing
    existing items. Triggers events at the appropriate times so that
    views that are bound to it can auto-update
*/
function Items(input){
    this.type = input.type;
    this.name = input.name;
    this.quantity = input.quantity;
    this.size = input.size;
}

function CartModel(input) {
    //initializes the cartmodel to null
    this.items = [];
    this.name = "";
    this.address1 = "";
    this.address2 = "";
    this.zip = "";
    this.phone = "";
    this.nextUrl = "";
    this.nextCaption = "";
    
    //clears cart
    this.clearCart = function(){
        this.items = [];
    };

    //returns quantity
    this.getQuantity = function(item){
        var i = this.exists(item);
        if(i == -1){
            return 0;
        }
        return this.items[i].quantity;
    }

    //populates information when given in input
    this.populateInfo = function(input){
        this.name = input.name;
        this.quantity = input.quantity;
        this.address1 = input.address1;
        this.address2 = input.address2;
        this.zip = input.zip;
        this.phone = input.phone;
        this.nextUrl = input.nextUrl;
        this.nextCaption = input.nextCaption;
    }

    //inserts an item and updates quantity
    this.insert = function(item){
        var x = this.exists(item);
        if(x > -1){
            this.items[x].quantity++;
        } else {
            this.items.push(item);
        }
    }

    //tests if function exists
    this.exists = function(item){
        var x = -1;
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].name == item.name && this.items[i].size == item.size){
                x = i;
            }
        }
        return x;
    }

    //removes item from website
    this.removeItem = function(item){
        var index = this.exists(item);
        if(index > -1){
            this.items.splice(index, 1);
        }
    }
}