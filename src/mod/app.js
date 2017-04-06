"use strict";

require( "font.josefin" );

// Starting the service worker for offline experience.
require( "offline" );

var $ = require( "dom" );
var W = require( "x-widget" ).getById;
var Msg = require( "tfw.message" ).info;
var Err = require( "tfw.message" ).error;
var Crypt = require( "crypt" );
var Wallet = require( "wallet" );
var Master = require( "master" );
var WdgItem = require( "wdg-item" );
var Alphabet = require( "alphabet" );




var g_nameToDelete;
var g_masterPassword = null;
var PAGES = [ "master", "view", "new", "del" ];

exports.start = function () {
  $( 'file' ).addEventListener( 'change', function ( evt ) {
    var file = evt.target.files[ 0 ];
    if ( !file ) return;
    var reader = new FileReader();
    reader.onload = function ( evt ) {
      var content = evt.target.result;
      Wallet.import( content ).then( Msg, Err );
    };
    reader.readAsText( file );
  }, false );
};

/**
 * If there is no master password defined,
 */
exports.onPage = function ( args ) {
  var id = args[ 0 ].trim().toLowerCase();
  if ( Master.password === null || PAGES.indexOf( id ) < 0 ) {
    window.location.hash = "master";
  } else {
    switch ( id ) {
    case "master":
      W( 'master' ).value = '';
      W( 'master' ).focus = true;
      break;
    case "view":
      refreshView();
      break;
    case 'new':
      W( 'newName' ).focus = true;
      W( 'newName' ).value = "";
      W( 'newUser' ).value = "";
      exports.onRndPwd();
      break;
    case "del":
      refreshDel( args );
      break;
    }
  }
};

exports.onExport = function () {
  Wallet.export();
};

exports.onImport = function () {
  $( 'file' ).click();
};

exports.onSetPassword = function () {
  var pwd = W( 'master' ).value;
  if ( pwd.length < 10 ) {
    Err( "Please provide a password with at least 10 characters!" )
    W( 'master' ).focus = true;
    return;
  }
  for ( var i = 0; i < pwd.length; i++ ) {
    if ( Alphabet.indexOf( pwd.charAt( i ) ) == -1 ) {
      Err( "<html>Please use only these characters:<br/>" +
        Alphabet.substr( 0, 26 ) + "<br/>" +
        Alphabet.substr( 26, 26 ) + "<br/>" +
        Alphabet.substr( 52 )
      );
      W( 'master' ).focus = true;
      return;
    }
  }
  Master.password = pwd;
  window.location.hash = "view";
};

/**
 * Create a random password.
 */
exports.onRndPwd = function () {
  var master = Master.password;
  if ( !master ) return;
  var pwd = '';
  var size = master.length;
  while ( size-- > 0 ) {
    pwd += Alphabet.charAt( Math.floor( Math.random() * Alphabet.length ) );
  }
  W( 'newPwd' ).value = pwd;
};

exports.onNewPwd = function () {
  var name = W( 'newName' ).value;
  var usr = W( 'newUsr' ).value;
  var pwd = Master.encode( W( 'newPwd' ).value );
  Wallet.set( name, usr, pwd );
  window.location.hash = "view";
};

exports.onDelPwd = function () {
  Wallet.del( g_nameToDelete );
  Msg( "<html>Password <b>" + g_nameToDelete + "</b> has been deleted." );
  window.location.hash = "view";
};

function refreshView() {
  $.clear( "list" );
  var list = Wallet.list();
  list.forEach( function ( item ) {
    var wdg = new WdgItem( item );
    $.add( "list", wdg );
  } );
}

function refreshDel( args ) {
  var name = args[ 1 ];
  g_nameToDelete = name;
  console.info( "name=", name )
  $( "nameToDelete" ).textContent = name;
}