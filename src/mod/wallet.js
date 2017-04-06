"use strict";

var Local = require( "tfw.storage" ).local;
var SaveAs = require( "tfw.fileapi" ).saveAs;


module.exports = {
  /**
   * Warning! No encryption is made here. You must pass an encrypted version of
   * the argument `pwd`.
   */
  set: function ( name, usr, pwd ) {
    var data = Local.get( "wallet", [] );
    module.exports.del( name );
    data.push( {
      name: name,
      usr: usr,
      pwd: pwd
    } );
    Local.set( "wallet", data );
  },
  del: function ( name ) {
    var data = Local.get( "wallet", [] );
    var idx = data.findIndex( equalIgnoreCase( name ) );
    if ( idx != -1 ) {
      // Remove the index.    
      data = data.splice( idx, 1 );
    }
    Local.set( "wallet", data );
  },
  get: function ( name ) {
    var data = Local.get( "wallet", [] );
    return data.find( equalIgnoreCase( name ) );
  },
  clear: function () {
    Local.set( "wallet", [] );
  },
  export: function () {
    SaveAs( new Blob( [ JSON.stringify( Local.get( "wallet", [] ), null, '  ' ) ] ),
      "passwords.json" );
  },
  import: function ( content ) {
    return new Promise( function ( resolve, reject ) {
      if ( typeof content !== 'string' ) {
        reject( "Only text files are accepted!" );
        return;
      }
      try {
        var data = JSON.parse( content );
        if ( !Array.isArray( data ) ) {
          reject( "This is not a valid JSON Array file!" );
          return;
        }
        var count = 0;
        data.forEach( function ( item ) {
          if ( typeof item.name !== 'string' ) return;
          if ( typeof item.usr !== 'string' ) return;
          if ( typeof item.pwd !== 'string' ) return;
          module.exports.set( item.name, item.usr, item.pwd );
          count++;
        } );
        resolve( "<html>Passwords imported: <b>" + count + "</b>." );
        window.location.hash = "view";
      } catch ( ex ) {
        reject( "This is not a valid JSON file!" );
      }
    } );
  },
  list: function () {
    var data = Local.get( "wallet", [] );
    var list = [];
    for ( var key in data ) {
      list.push( data[ key ] );
    }
    list.sort();
    return list;
  },
  /**
   * The tree representation merges what is common. So you can reach an item in
   * few clicks instead of by typing its name.
   * @example
   * tree([
   *   "a/b/c/d/e",
   *   "a/b/c/f/g",
   *   "a/b/h/i/j",
   *   "a/b/h/i/k",
   *   "a/b/h/l/m",
   *   "a/n/o/p/q"
   * ]) === [
   *   ["a/b/c/", [
   *     ["a/b/c/d/e", { name:..., usr:..., pwd:... }],
   *     ["a/b/c/f/g", { name:..., usr:..., pwd:... }]
   *   ]],
   *   ["a/b/h/", [
   *     ["a/b/h/i", [
   *       ["a/b/h/i/j", { name:..., usr:..., pwd:... }],
   *       ["a/b/h/i/k", { name:..., usr:..., pwd:... }]
   *     ]],
   *     ["a/b/h/l/m", { name:..., usr:..., pwd:... }]
   *   ]],
   *   ["a/n/o/p/q/", { name:..., usr:..., pwd:... }]
   * ]
   */
  tree: function () {
    var list = module.exports.list().maps( function ( itm ) {
      return {
        key: itm,
        val: itm.split( '/' ).map( function ( x ) {
          return x.toLowerCase();
        } )
      };
    } );
  }
};

function equalIgnoreCase( name ) {
  if ( typeof name !== 'string' ) name = '';
  else name = name.toLowerCase();
  return function ( item ) {
    if ( typeof item !== 'object' ) return false;
    if ( typeof item.name !== 'string' ) return false;
    return item.name.toLowerCase() == name;
  };
}