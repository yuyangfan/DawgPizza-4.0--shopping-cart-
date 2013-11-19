// This is the JavaScript for DawgPizza

$(function() {

	renderPizza(com.dawgpizza.menu.pizzas, $('.pizza-template'), $('.menu-data1'));
	renderDrink(com.dawgpizza.menu.drinks, $('.drink-template'), $('.menu-data2'));
	renderDessert(com.dawgpizza.menu.desserts, $('.dessert-template'), $('.menu-data3'));

})

function renderPizza(pizzas, template, menuData) {
	var instance;
	var idx;
	var pizza;
	
	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
	    instance = template.clone();
	    pizza = com.dawgpizza.menu.pizzas[idx];
	    //pizza.name = name of pizza
	    instance.find('.name').html(pizza.name);
	    //pizza.description = description of pizza
	    instance.find('.description').html(pizza.description);
	    //pizza.prices = array of three numbers, which are prices for small, medium, and large
	    //pizza.prices[0] = price for small
	    //pizza.prices[1] = price for medium
	    //pizza.prices[2] = price for large
	    instance.find('.price').html('$' + pizza.prices[0] + ' / ' 
	    	+ '$' + pizza.prices[1] + ' / ' + '$' + pizza.prices[2]);
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
	  
	    //drink.name = name of drink
	    instance.find('.name').html(drink.name);
	    //drink.price = price of drink
	    instance.find('.price').html('$' + drink.price);

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
	  
	    //drink.name = name of dessert
	    instance.find('.name').html(dessert.name);
	    //drink.price = price of dessert
	    instance.find('.price').html('$' + dessert.price);
	    instance.removeClass('template');
		menuData.append(instance);
	} //for each dessert

	
}



