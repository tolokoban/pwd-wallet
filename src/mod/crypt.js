"use strict";

var Alphabet = require( "alphabet" );

/**
 * @param {string} source - Text to crypt/decrypt.
 * @param {string} key - Textual key. Should be greater of equal in length than `source`.
 */
module.exports = {
  encode: function ( source, key ) {
    var destination = '';
    var i, s, k;
    for ( i = 0; i < source.length; i++ ) {
      s = Alphabet.indexOf( source.charAt( i ) );
      k = Alphabet.indexOf( key.charAt( i % key.length ) );
      destination += Alphabet.charAt( ( s + k ) % Alphabet.length );
    }
    return destination;
  },
  decode: function ( source, key ) {
    var destination = '';
    var i, s, k;
    for ( i = 0; i < source.length; i++ ) {
      s = Alphabet.indexOf( source.charAt( i ) );
      k = Alphabet.indexOf( key.charAt( i % key.length ) );
      destination += Alphabet.charAt( ( s + Alphabet.length - k ) % Alphabet.length );
    }
    return destination;
  }
};