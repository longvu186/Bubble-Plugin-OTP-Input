function(instance, context) {
    /* SETUP: replace this variable accordingly. Make sure this matches the other instances. */
    const elementName = "otp-input";
    instance.data._elementReady = false;
    instance.data._element = document.createElement(elementName);
    instance.canvas.append(instance.data._element);
    
    instance.data._tryInject = function tryInject(retryLeft, properties) {
        const element = instance.data._element;
        if (!retryLeft || retryLeft <= 0 || !element) {
            return;
        }
        if (!element._vdom) {
            setTimeout(() => tryInject(retryLeft - 1, properties), 200);
            return;
        }
        
        element.properties = properties;
        
        if (!element.instance) {
            element.instance = instance;
        }
        if (!element.bubbleContext) {
            element.bubbleContext = context;
        }
    }
    
}