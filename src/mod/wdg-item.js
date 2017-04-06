/**
 * This widget shows an item. This is a name, a user and a password.
 * The passwod is hidden until you press and hold a button.
 */
"use strict";

var $ = require( "dom" );
var DB = require( "tfw.data-binding" );
var Icon = require( "wdg.icon" );
var Master = require( "master" );

/**
 * @param {string} opts.name - Name of the item.
 * @param {string} opts.usr - User name.
 * @param {string} opts.pwd - Password (encrypted).
 *
 */
var WdgItem = function ( opts ) {
  var that = this;
  var name = $.div( 'name' );
  var usr = $.div( 'usr' );
  var pwd = $.div( 'pwd' );
  var btnDelete = new Icon( {
    button: true,
    content: 'delete',
    type: 'accent',
    size: "1.5rem"
  } );
  btnDelete.on( function () {
    window.location.hash = "del/" + that.name;
  } );
  $.addClass( btnDelete, "delete" );
  var elem = $.elem( this, 'div', 'wdg-item', [ btnDelete, name, usr, pwd ] );

  DB.propString( this, 'name' )( function ( v ) {
    name.textContent = v;
  } );
  DB.propString( this, 'usr' )( function ( v ) {
    usr.textContent = v;
  } );
  DB.propString( this, 'pwd' )( function ( v ) {
    pwd.textContent = "Press to show...";
  } );

  $.on( elem, {
    down: function () {
      pwd.textContent = Master.decode( that.pwd );
      $.addClass( elem, 'active' );
    },
    up: function () {
      pwd.textContent = "Press to show...";
      $.removeClass( elem, 'active' );
    }
  } );
  opts = DB.extend( {
    name: "Unknown",
    usr: "User name",
    pwd: "Password"
  }, opts, this );
};


module.exports = WdgItem;