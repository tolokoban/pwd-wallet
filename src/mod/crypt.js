"use strict";

/**
 * @param {string} source - Text to crypt/decrypt.
 * @param {string} key - Textual key. Should be greater of equal in length than `source`.
 */
module.exports = {
  encode: function(source, key) {
    var destination = '';
    var i, s, k;
    for( i = 0 ; i < source.length ; i++ ) {
      s = source.charCodeAt( i ) - 32;
      k = key.charCodeAt( i % key.length ) - 32;
      destination += String.fromCharCode( s ^ k );
    }
    return destination;
  },
  decode: function(source, key) {
    var destination = '';
    var i, s, k;
    for( i = 0 ; i < source.length ; i++ ) {
      s = source.charCodeAt( i );
      k = key.charCodeAt( i % key.length ) - 32;
      destination += String.fromCharCode( (s ^ k) + 32 );
    }
    return destination;
  }
};
