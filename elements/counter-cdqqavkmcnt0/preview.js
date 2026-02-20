function(instance, properties) {
    function loadJS(url, module = false) {
        return new Promise((resolve, reject) => {
            let scriptEle = document.createElement("script");
            document.head.appendChild(scriptEle);
            scriptEle.onload = function () {
                resolve();
            }
            scriptEle.setAttribute("type", module ? "module" : "text/javascript" );
            scriptEle.setAttribute("src", url);
        });
    }

    /* Make the appropriate changes to the following lines */
    const DEV = false;
    const ELEMENT_NAME = "otp-input";
    const PACKAGE_LINK = `https://www.unpkg.com/@citizendev/bubble-otp-input@0.0.8`;

    let jsLink, cssLink;

    if (DEV) {
        cssLink = "http://localhost:5173/src/style.css"
        jsLink = "http://localhost:5173/src/index.ts";
    } else {
        cssLink = `${PACKAGE_LINK}/dist/style.css`; 
        jsLink = `${PACKAGE_LINK}/dist/index.umd.js`;
    }



    jQuery("html").height("100%");
    jQuery("body").height("100%");

    jQuery("head").append(`<link rel="stylesheet" href="${cssLink}" />`);

    (async () => {
        if (DEV) {
            await loadJS("http://localhost:5173/@vite/client", true);
        }
        
        await loadJS("https://www.unpkg.com/preact@^10.19.1/dist/preact.umd.js");
        await loadJS("https://www.unpkg.com/preact@^10.19.1/hooks/dist/hooks.umd.js");
        await loadJS("https://www.unpkg.com/preact@^10.19.1/compat/dist/compat.umd.js");
        await loadJS("https://www.unpkg.com/preact-custom-element@^4.2.1/dist/preact-custom-element.umd.js");
        await loadJS("https://www.unpkg.com/@preact/signals-core@^1.5.1/dist/signals-core.min.js");
        await loadJS("https://www.unpkg.com/@preact/signals@^1.2.2/dist/signals.min.js");
        await loadJS(jsLink, DEV);
            
        const element = document.createElement(ELEMENT_NAME);
        instance.canvas.append(element);

        function tryInject(retryLeft, properties) {
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
                element.isPreview = true;
            }
        }

        tryInject(25, properties);
    })();


}