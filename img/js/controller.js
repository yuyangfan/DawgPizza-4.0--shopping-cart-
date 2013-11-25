// This is the JavaScript for DawgPizza

$(function() {

	renderPizza(com.dawgpizza.menu.pizzas, $('.pizza-template'), $('.menu-data1'));
	renderDrink(com.dawgpizza.menu.drinks, $('.drink-template'), $('.menu-data2'));
	renderDessert(com.dawgpizza.menu.desserts, $('.dessert-template'), $('.menu-data3'));

    var total = 0;
    var cart = new CartModel();
	

function renderPizza(pizzas, template, menuData) {
	var instance;
	var idx;
	var pizza;
	
	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
	    instance = template.clone();
	    pizza = com.dawgpizza.menu.pizzas[idx];
	            
        
        var small = '<button type= "button" class="btn btn-info btn-sm" data-type = "pizza" data-name = "'+ pizza.name + '" data-size = "small" data-price = "'+ pizza.prices[0] + '">' + "small $" + pizza.prices[0] + '</button>' + " ";
        var medium = '<button type= "button" class="btn btn-success btn-sm" data-type = "pizza" data-name = "'+ pizza.name +'" data-size = "medium" data-price = "'+ pizza.prices[1] + '">' + "medium $" + pizza.prices[1] + '</button>' + " ";
        var large = '<button type= "button" class="btn btn-warning btn-sm" data-type = "pizza" data-name = "'+ pizza.name +'" data-size = "large" data-price = "'+ pizza.prices[2] + '">' + "large $" + pizza.prices[2] + '</button>' + " ";

        //pizza.name = name of pizza
	    instance.find('.name').html(pizza.name);
	    //pizza.description = description of pizza
	    instance.find('.description').html(pizza.description);
	    //pizza.prices = array of three numbers, which are prices for small, medium, and large
	    //pizza.prices[0] = price for small
	    //pizza.prices[1] = price for medium
	    //pizza.prices[2] = price for large
	    instance.find('.price').html(small + medium + large);

	    instance.removeClass('template');
	    menuData.append(instance);
	} //for each pizza
}



function renderDrink(drinks, template, menuData) {
	var instance;
	var idx;
	var drink;
	
	for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
	    instance = template.clone();
	    drink = com.dawgpizza.menu.drinks[idx];
	  
	    var drink = '<button type= "button" class="btn btn-warning btn-sm" data-type = "drink" data-name = "'+ drink.name +'" data-price = "'+ drink.price + '">' + drink.name + " $" + drink.price + '</button>' + " ";
		instance.find('.name').html(drink);
	    instance.removeClass('template');
		menuData.append(instance);

	} //for each drink

	
}



function renderDessert(desserts, template, menuData) {
	var instance;
	var idx;
	var dessert;
	
	for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
	    instance = template.clone();
	    dessert = com.dawgpizza.menu.desserts[idx];
	  	
	  	var dessert = '<button type= "button" class="btn btn-info btn-sm" data-type = "dessert" data-name = "'+ dessert.name +'" data-price = "'+ dessert.price + '">' + dessert.name + " $" + dessert.price + '</button>' + " ";
	    //drink.name = name of dessert
	    instance.find('.name').html(dessert);
	    
	    instance.removeClass('template');
		menuData.append(instance);
	} //for each dessert

	
}
//adds to cart with a click
$(".btn-sm").click(function() {
    //adds to cart using button functionality
    //button includes functionality for removal
    //updates the total price + tax
    
            var name = $(this).data("name");
            var type = $(this).data("type");
            var price = $(this).data("price");
            var size = "";
            if(type == "pizza"){
                size = $(this).data("size");
            }

            var item = new Items({
                name : name,
                type : type,
                size : size,
                quantity : 1
            });

        //add button if it does not exist
            if(cart.exists(item) == -1){
                    cart.insert(item);
                    total += price;
                    var itemHtml = $(".template").clone().removeClass("template");
                    if(type == "pizza"){
                            itemHtml.html( "<span class=\"glyphicon glyphicon-remove\"></span> " + name + " for $" + price + " : " + size);
                    }else {
                                itemHtml.html(" <span class=\"glyphicon glyphicon-remove\"></span> " + name + " for $" + price);
                    }
                    itemHtml.attr("data-name", name);
                    itemHtml.attr("data-type", type);
                    itemHtml.attr("data-size", size);
                    itemHtml.attr("data-price", price);
                    $(".cart").append(itemHtml);
                    $(".cart-item").unbind();
                    $(".cart-item").bind("click", removeFromCart);
            } else { //adds to the quantity and does not add a new button
                    cart.insert(item);
                    total += price;
                    $('.cart-item[data-name="' + name + '"].cart-item[data-size="' + size + '"]').html(" <span class=\"glyphicon glyphicon-remove\"></span> " + cart.getQuantity(item) + "x " + " for $" + price +" " + name + " : " + size);
                }
                $(".col-xs-10").html("Total: $" + total + " + $" + (total * .095).toFixed(2) + " (tax) = $" + (total * 1.095).toFixed(2));
        

});




function createCartItemView(config) {
        var view = createTemplateView(config);
        
        view.afterRender = function(clonedTemplate, model) {
            clonedTemplate.find('.remove-item').click(function(){
                view.cartModel.removeItem(model);
            });
        };

        return view;
} //createCartItemView()


//allows user to remove items from cart
//updates the total price + tax
function removeFromCart(){
        var name = $(this).data("name");
        var type = $(this).data("type");
        var price = $(this).data("price");
        var size = "";
        if(type == "pizza"){
                size = $(this).data("size");
        }
        var item = new Items({
                name : name,
        type : type,
        size : size,
        quantity : 0
        });        
                
        total -= price * (cart.getQuantity(item));
        $(".col-xs-10").html("Total: $" + total + " + $" + (total * .095).toFixed(2) + " (tax) = $" + (total * 1.095).toFixed(2));

        cart.removeItem(item);
        $(this).remove();
}


// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));
    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

}

//submits the order into a modal with click
    //if order is under $20, don't allow the click the work, and opens up an alert window    
    $(".submit-order").click(function(){
        if(total < 20){
            alert("you need at least $20 to order");
        } else {
            $("#submitOrderForm").modal();
            $(".finalSubmitButton").click(submitForm);
        }
    });

    //clears items from cart
    $(".clear-cart").click(function() {
        cart.clearCart();
        total = 0;
        $(".cart-item").not(".template").remove();
        $(".col-xs-10").html("Total: $" + total + " + $" + (total * .095).toFixed(2) + " (tax) = $" + (total * 1.095).toFixed(2));
    });


//populates the form for submitting onto separate page
function submitForm() {
    cart.populateInfo({
        name : $(".form-name").val(),
        address1 : $(".form-line1").val(),
        address2 : $(".form-line2").val(),
        zip : $(".form-zip").val(),
        phone : $(".form-phone").val(),
        nextUrl : "http://students.washington.edu/meizzhou/info343/Homework4/menu.html",
        nextCaption : "Back to Menu"
    });
    $("#jsonForm").val(JSON.stringify(cart));
    $(".address-form").find('[type="submit"]').trigger("click");
}


/* 
    makeEventSource()

    This function will add very simple event support to any object you
    pass as the 'obj' parameter. This is known as a mix-in class,
    or as Crockford refers to it, a 'part' that can be added to
    any other object. The key is that you don't inherit from a
    class or object to get this functionality--this will add the
    functionality to any existing object.
*/

function makeEventSource(obj) {
    //private listeners variable to hold set of
    //callbacks, keyed on event name
    //this variable will remain private from other code
    //but the following functions will be able to see it
    var listeners = {};
    
    //on() method for registering a new listener
    obj.on = function(eventName, callback, context) {
        if (!listeners[eventName])
            listeners[eventName] = [];

        listeners[eventName].push({
            callback: callback,
            context: context
        });        
    } //on()

    //trigger() method for triggering an event
    obj.trigger = function(eventName, data) {
        var idx, listener;
        var evtListeners = listeners[eventName];

        if (evtListeners) {
            for (idx = 0; idx < evtListeners.length; ++idx) {
                listener = evtListeners[idx];
                if (listener.callback) {
                    listener.callback.call(listener.context, data);
                } //if there is a callback
            } //for each listener
        } //if listeners for eventName        
    } //trigger()

    //off() method for removing all listeners from an event
    obj.off = function(eventName) {
        delete listeners[eventName];
    }

    return obj;
} //makeEventSource()

}); //doc ready
