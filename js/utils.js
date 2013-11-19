/*
    utils.js -- random utility functions used throughout the code
*/

/* apply()
    copies all properties from the source object
    to the target object (shallow copy)
    params:
    - source (object) object to copy from
    - target (object) object to copy to

    no return value
*/
function apply(source, target) {
    for (prop in source) {
        target[prop] = source[prop];
    }
} //apply()


function wrapSuper(superFn, context) {
    return function() {
        return superFn.apply(context, arguments);
    }    
}