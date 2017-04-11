/** @module hash */require( 'hash', function(require, module, exports) { var _=function(){var D={"en":{},"fr":{}},X=require("$").intl;function _(){return X(D,arguments);}_.all=D;return _}();
    "use strict";

var Alphabet = require( "alphabet" );

module.exports =
  /**
   * Mitchell and Moore method. (TAOCP 2, page 27)
   * Xn+1 = (Xn-24 + Xn-55) % m
   * The seed is an array of the first 55 values.
   */
  function ( text ) {
    var i;
    var arr = Alphabet.toIntArray( text );
    var seed = [ 0, 27 ]; // To ensure that not all elements are even.
    for ( i = 2; i < 64; i++ ) {
      seed.push( ( 17 * i + arr[ i % arr.length ] ) % Alphabet.length );
    }
    var len = seed.length;
    var cursor = 0;
    var rnd = function () {
      var v = ( seed[ ( cursor + len - 24 ) % len ] + seed[ ( cursor + len - 55 ) % len ] ) % Alphabet.length;
      seed[ cursor ] = v;
      cursor = ( cursor + 1 ) % seed.length;
      return v;
    };

    // Warmup.
    for ( i = 0; i < 2711; i++ ) {
      rnd();
    }

    var out = [];
    for ( i = 0; i < 32; i++ ) {
      out.push( rnd() );
    }
    var hash = Alphabet.fromIntArray( out );
    return hash;
  };

  
module.exports._ = _;
/**
 * @module hash
 * @see module:$
 * @see module:alphabet

 */
});