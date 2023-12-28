const store={};
/**
 * subscribers a callback for an event
 * @param {string} eventName-Name of the event to listen for
 * @param {function} callback-Funbction to invoke when said event is fired
 */

const subscribe=(eventName,callback)=>{
    if(!store[eventName]){
        store[eventName]=new Set();
    }

    store[eventName].add(callback);
};

/**
 * unsubscribers a callback for an event
 * @param {string} eventName-Name of the event to unsubscribe from
 * @param {function} callback-Funbction to unsubscribe 
 */

const unsubscribe=(eventName,callback)=>{
    if(store[eventName]){
        store[eventName].delete(callback);
    }
};


/**
 * publish an event to listerners
 * @param {string} eventName-Name of the event to publish
 * @param {*} payload-payload of the event to publish
 * 
 */

const publish =(eventName,payload)=>{
    if(store[eventName]){
        store[eventName].forEach(callback => {
            try{
                callback(payload);
            }
            catch(error){
                console.error(error);
            }
        });
    }
}

export default{
    subscribe,unsubscribe,publish
}