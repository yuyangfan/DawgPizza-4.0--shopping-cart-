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