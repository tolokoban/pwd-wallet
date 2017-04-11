"use strict";

var Local = require( "tfw.storage" ).local;

module.exports = {
  /**
   * Warning! No encryption is made here. You must pass an encrypted version of
   * the argument `pwd`.
   */
  set: function ( name, usr, pwd ) {
    var data = get();
    module.exports.del( name );
    data.push( {
      name: name,
      usr: usr,
      pwd: pwd
    } );
    set( data );
  },
  del: function ( name ) {
    set( get().filter( nameNotEqual( name ) ) );
  },
  get: function ( name ) {
    var data = get();
    return data.find( nameEqual( name ) );
  },
  clear: function () {
    set();
  },
  list: function () {
    var data = get();
    var list = data.slice();
    list.sort( function ( a, b ) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if ( a < b ) return -1;
      if ( a > b ) return +1;
      return 0;
    } );
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
    var list = module.exports.list().map( function ( itm ) {
      return {
        key: itm,
        val: itm.split( '/' ).map( function ( x ) {
          return x.toLowerCase();
        } )
      };
    } );

  }
};


var DEFAULT = JSON.stringify({ version: 0, items: [] });

function get() {
  var obj = Local.get( "wallet", JSON.parse( DEFAULT ) );
  if ( !obj || !Array.isArray( obj.items ) ) {
    obj = JSON.parse( DEFAULT );
  }
  return obj.items;
}

function set( value ) {
  if ( typeof value === 'undefined' ) {
    value = [];
  }
  else if (!Array.isArray( value )) {
    value = [];
  }
  var obj = Local.get( "wallet", JSON.parse( DEFAULT ) );
  if ( !obj || !Array.isArray( obj.items ) ) {
    obj = JSON.parse( DEFAULT );
  }
  if (typeof obj.version === 'number') {
    obj.version++;
  } else {
    obj.version = 0;
  }
  obj.items = value;
  Local.set( "wallet", obj );
}

function nameEqual( name ) {
  name = name.toLowerCase();
  return function ( rec ) {
    return rec.name.toLowerCase() == name;
  };
}

function nameNotEqual( name ) {
  name = name.toLowerCase();
  return function ( rec ) {
    return rec.name.toLowerCase() != name;
  };
}
