/** @module offline */require( 'offline', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

if( navigator.serviceWorker ) {
    navigator.serviceWorker.register('offline.js', {
        scope: '/space-adventure/'
    });

    navigator.serviceWorker.ready.then(function(reg) {
        console.info( "Service Worker is ready for ", reg.scope );
    }).catch(function(err) {
        console.error("Registration failed with: ", err);
    });
}


  
module.exports._ = _;
/**
 * @module offline
 * @see module:$

 */
});