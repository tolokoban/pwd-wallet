"use strict";

if( navigator.serviceWorker ) {
    navigator.serviceWorker.register('offline.js', {
        scope: '/pwd-wallet/'
    });

    navigator.serviceWorker.ready.then(function(reg) {
        console.info( "Service Worker is ready for ", reg.scope );
    }).catch(function(err) {
        console.error("Registration failed with: ", err);
    });
}
