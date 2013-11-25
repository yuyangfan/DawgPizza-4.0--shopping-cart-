/*
    ListModel

    Basic model representing an array of model objects. Provides
    support for getting the array of items, getting a single item
    by an 'id' property (if exists), adding new items and removing
    existing items. Triggers events at the appropriate times so that
    views that are bound to it can auto-update
*/

var ListModel = {
    getItems: function() {
        return this.items;
    },

    getItem: function(id) {
        return this.itemIndex[id];
    },

    addItem: function(item) {
        this.items.push(item);
        this.trigger('change');
    },

    removeItem: function(item) {
        var idx;
        for (idx = 0; idx < this.items.length; ++idx) {
            if (item === this.items[idx]) {
                this.items.splice(idx, 1);
                this.trigger('change');
                break;
            }
        } //for each item
    }, //removeItem()

    setItems: function(items) {
        this.items = items;
        this.buildIndex();
        this.trigger('change');
    }, //setItems()

    buildIndex: function() {    
        this.itemIndex = {};
        for (idx = 0; idx < this.items.length; ++idx) {
            item = this.items[idx];
            if (undefined != item.id)
                this.itemIndex[item.id] = item;
        }
    } //buildIndex()

} //ListModel

/*
    createListModel()

    Creates a new instance of a ListModel, applying the
    configuration properties (if any). The config parameter
    may contain the following properties:
    - items (array of objects) the model objects
*/

function createListModel(config) {
    var model = Object.create(ListModel);
    var idx;
    var item;

    apply(config, model);
    model = makeEventSource(model);

    //provide default empty items array if
    //nothing was specified in the config
    model.items = model.items || [];

    model.buildIndex();
    
    return model;
} //createListModel


/*
    createMoviesModel()

    Creates a model for the list of movies for sale.
    This uses the ListModel as the prototype, but adds 
    a few specific methods.

    The config parameter should contain the following properties:
    - url (string) URL from which we should fetch movie JSON
*/

function createPizzasModel(config) {
    var model = createListModel(config);

    model.refresh = function() {
        if (!this.url)
            throw new 'No url property supplied in config!';

        $.getJSON(this.url, function(pizzas){
            //set the items
            //prototype will trigger a change event
            model.setItems(pizzas);
        });

    }; //refresh()

    return model;
} //createMoviesModel()

/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

function createCartModel(config) {
        var model = createListModel(config);

        model.getTotalPrice = function() {
            var idx;
                var totalPrice = 0;
                for (idx = 0; idx < this.items.length; ++idx) {
                    totalPrice += this.items[idx].price;
                }
                return totalPrice.toFixed(2);
        }; //getTotalPrice()

        model.getTax = function() {
            var tax = model.getTotalPrice * 0.095;
            return tax;
        }

        model.getGrandTotal = function() {
            var grandTotal = model.getTax + model.getTotalPrice;
            return grandTotal;
        }

        model.toJSON = function() {
            return JSON.stringify(this.items);

        }; //return toJSON
        return model;
} //createCartModel()

/*
    createCartView()

    Creates a view for the whole shopping cart, using TemplateListView
    as the prototype. It overrides the render() function to update the
    total price, and register click event handlers for the remove item
    buttons.
*/

