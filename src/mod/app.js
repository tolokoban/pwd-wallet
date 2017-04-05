"use strict";

var W = require("x-widget").getById;
var Err = require("tfw.message").error;
var Crypt = require("crypt");
var Master = require("master");


var g_masterPassword = null;
var PAGES = ["master", "view"];

/**
 * If there is no master password defined,
 */
exports.onPage = function( pageId ) {
  var id = pageId.trim().toLowerCase();
  if (Master.password === null || PAGES.indexOf(id) < 0) {
    window.location.hash = "master";
  }
  else {
    switch( id ) {
      case "master":
        W('master').value = '';
        W('master').focus = true;
        break;
    }
  }
};


exports.onSetPassword = function() {
  var pwd = W('master').value;
  if( pwd.length < 10 ) {
    Err("Please provide a password with at least 10 characters!")
    W('master').focus = true;
    return;
  }
  Master.password = pwd;
  window.location.hash = "view";
};
