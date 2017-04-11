var window = self;

/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

window.require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(f, mod, exports);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
/** @module $ */require( '$', function(require, module, exports) {   exports.config={"name":"\"pwd-wallet\"","description":"\"Phone app to strore encrypted passwords.\"","author":"\"tolokoban\"","version":"\"0.0.5\"","major":"0","minor":"0","revision":"5","date":"2017-04-11T15:05:25.000Z","consts":{}};
var currentLang = null;
exports.lang = function(lang) {
    if (lang === undefined) {
        if (window.localStorage) {
            lang = window.localStorage.getItem("Language");
        }
        if (!lang) {
            lang = window.navigator.language;
            if (!lang) {
                lang = window.navigator.browserLanguage;
                if (!lang) {
                    lang = "fr";
                }
            }
        }
        lang = lang.substr(0, 2).toLowerCase();
    }
    currentLang = lang;
    if (window.localStorage) {
        window.localStorage.setItem("Language", lang);
    }
    return lang;
};
exports.intl = function(words, params) {
    var dic = words[exports.lang()],
        k = params[0],
        txt, newTxt, i, c, lastIdx, pos;
    var defLang;
    for( defLang in words ) break;
    if( !defLang ) return k;
    if (!dic) {
        dic = words[defLang];
        if( !dic ) {
            return k;
        }
    }
    txt = dic[k];
    if( !txt ) {
        dic = words[defLang];
        txt = dic[k];
    }
    if (!txt) return k;
    if (params.length > 1) {
        newTxt = "";
        lastIdx = 0;
        for (i = 0 ; i < txt.length ; i++) {
            c = txt.charAt(i);
            if (c === '$') {
                newTxt += txt.substring(lastIdx, i);
                i++;
                pos = txt.charCodeAt(i) - 48;
                if (pos < 0 || pos >= params.length) {
                    newTxt += "$" + txt.charAt(i);
                } else {
                    newTxt += params[pos];
                }
                lastIdx = i + 1;
            } else if (c === '\\') {
                newTxt += txt.substring(lastIdx, i);
                i++;
                newTxt += txt.charAt(i);
                lastIdx = i + 1;
            }
        }
        newTxt += txt.substr(lastIdx);
        txt = newTxt;
    }
    return txt;
};



});function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            './index.html',
            './manifest.json',
            './js/@index.js',
            './css/@index.css',
            './css/app/back.jpg',
            './css/app/icon-192.png',
            './css/app/icon-512.png'
        ]);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}


var CACHE = 'cache-and-update';

self.addEventListener('install', function(evt) {
    console.log('[SW] install.');
    evt.waitUntil(precache());
});

self.addEventListener('activate', function(evt) {
    console.log('[SW] activate.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('[SW] fetch. ', evt.request.url);
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});

self.addEventListener('message', function(evt) {
    console.log('[SW] message.');
});

self.addEventListener('sync', function(evt) {
    console.log('[SW] sync.');
});

self.addEventListener('push', function(evt) {
    console.log('[SW] push.');
});
