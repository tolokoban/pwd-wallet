/**
 * The master password is managed here.
 * If it has not been accessed for more than 5 minutes, it is reset.
 */
"use strict";

var Msg = require( "tfw.message" ).info;
var Hash = require( "hash" );
var Crypt = require( "crypt" );


var DURATION = 1000 * 60 * 5; // 5 minutes.
var g_password = null;
var g_time = 0;

Object.defineProperty( module.exports, 'password', {
  get: function () {
    var t = Date.now();
    if ( t - g_time > DURATION ) {
      g_password = null;
      window.location.hash = "";
      Msg( "The master password is reset after 5 minutes of inactivity." );
      console.log( "Password expiration: ", ( ( t - g_time ) * 0.001 ).toFixed( 0 ) );
    }
    return g_password;
  },
  set: function ( v ) {
    g_password = v;
    g_time = Date.now();
  },
  configurable: true,
  enumerable: true
} );

module.exports.encode = function ( plainText, name ) {
  if ( typeof name !== 'string' ) throw Error( "Second argument is missing (usr)!" );
  if ( !module.exports.password ) return "";
  var key = Hash( module.exports.password + name );
  return Crypt.encode( plainText, key );
};

module.exports.decode = function ( code, name ) {
  if ( typeof name !== 'string' ) throw Error( "Second argument is missing (usr)!" );
  if ( !module.exports.password ) return "";
  var key = Hash( module.exports.password + name );
  return Crypt.decode( code, key );
};