"use strict";

var W = require("x-widget").getById;
var Crypt = require("crypt");

var g_masterPassword = null;

/**
 * If there is no master password defined,
 */
exports.onPage = function( pageId ) {
    var page = pages[pageId.toLowerCase()];
    if( typeof page !== 'undefined' ) page.onPage();
};


exports.onSetPassword = function() {

};
