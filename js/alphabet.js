/** @module alphabet */require( 'alphabet', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    /**
 * All the password must be made exclusively of characters of this alphabet.
 * This allow stronger protection against cryptanalysis.
 * If your passwords are random and with the same size of your master password,
 * nobody can break them.
 * Your master password don't need to be random, but must contain only characters
 * from this alphabet.
 */

"use strict";

var ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01213456789" +
  ".,:;+-*/$_()&%?'\"@#!<>=";

module.exports = {
  isInThisAlphabet: function ( text ) {
    for ( var i = 0; i < text.length; i++ ) {
      if ( ALPHABET.indexOf( text.charAt( i ) ) == -1 ) return false;
    }
    return true;
  },

  toIntArray: function ( text ) {
    var arr = [];
    var val;
    for ( var i = 0; i < text.length; i++ ) {
      val = ALPHABET.indexOf( text.charAt( i ) );
      if (val < 0) val = 0;
      arr.push( val );
    }
    return arr;
  },

  fromIntArray: function ( arr ) {
    var text = '';
    arr.forEach( function ( code ) {
      text += ALPHABET.charAt( code );
    } );
    return text;
  },

  indexOf: ALPHABET.indexOf.bind( ALPHABET ),
  substr: ALPHABET.substr.bind( ALPHABET ),
  charAt: ALPHABET.charAt.bind( ALPHABET ),
};


Object.defineProperty( module.exports, 'value', {
  value: ALPHABET,
  writable: false,
  configurable: false,
  enumerable: true
} );

Object.defineProperty( module.exports, 'length', {
  value: ALPHABET.length,
  writable: false,
  configurable: false,
  enumerable: true
} );


  
module.exports._ = _;
/**
 * @module alphabet
 * @see module:$

 */
});