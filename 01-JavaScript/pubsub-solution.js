var pubsub = (function(){
    var subscriptions = {};

    function pubsub(eventName){
        if (typeof subscriptions[eventName] === 'undefined')
            subscriptions[eventName] = new Subscriptions(eventName);
        return subscriptions[eventName];
    }

    function Subscriptions(eventName){
        this._eventName = eventName;
        this._callbacks = [];
    }

    Subscriptions.prototype.subscribe = function(){
        for(var index = 0, count = arguments.length; index < count; index++)
            this._callbacks.push(arguments[index]);
        return this;
    }

    Subscriptions.prototype.publish = function(){
        var eventArgs = arguments;
        for (var index = 0, count = this._callbacks.length; index < count; index++){
            var callback = this._callbacks[index];
            if (typeof callback === 'function'){
                callback.apply(undefined, eventArgs);
            }
            if (Array.isArray(callback)){
                var callbackFn = callback[0],
                    context = callback[1];
                callbackFn.apply(context, eventArgs);
            }
        }
        return this;
    }

    Subscriptions.prototype.unsubscribe = function (fn) {
        for (var index = this._callbacks.length -1 ; index >= 0; index--) {
            var callback = this._callbacks[index];
            if (typeof callback === 'function' && callback === fn) {
                this._callbacks.splice(index, 1); 
            }
            if (Array.isArray(callback) && callback[0] === fn) {
                this._callbacks.splice(index, 1); 
            }
        }
        return this;
    }

    return pubsub;

})();

var e1 = 'event-1', e2 = 'event-2', data1 = 'data-1', data2 = 'data-2', 
fn1 = function(){
	console.log('subscription 1 is invoked with ', arguments);
}, 
fn2 = function(){
	console.log('subscription 2 is invoked with ', arguments , ' and  this -> ', this);
}