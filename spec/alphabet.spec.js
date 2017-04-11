"use strict";

var Alphabet = require( "alphabet" );

describe( 'Alphabet', function () {
  describe( 'isInThisAlphabet()', function () {
    function check( text, expectedValue ) {
      it( 'should return ' + expectedValue + " for text " + JSON.stringify( text ), function () {
        expect( Alphabet.isInThisAlphabet( text ) ).toBe( expectedValue );
      } );
    }

    check( "garçon", false );
    check( "l§arsenic", false );
    check( "L€ffort", false );
    check( "La salamandre", false );
    check( "La-salamandre", true );
    check( Alphabet, true );
  } );

  describe( 'toIntArray()', function () {
    function check( text, arr ) {
      it( 'should return ' + JSON.stringify( arr ) +
        " for text " + JSON.stringify( text ),
        function () {
          expect( Alphabet.toIntArray( text ) ).toEqual( arr );
        } );
    }

    check( "Fernande", [ 31, 4, 17, 13, 0, 13, 3, 4 ] );
    check( "L€ffort", [ 37, 0, 5, 5, 14, 17, 19 ] );
  } );

  describe( 'fromIntArray()', function () {
    function check( arr, text ) {
      it( 'should return ' + JSON.stringify( text ) +
        " for array " + JSON.stringify( arr ),
        function () {
          expect( Alphabet.fromIntArray( arr ) ).toEqual( text );
        } );
    }

    check( [ 31, 4, 17, 13, 0, 13, 3, 4 ], "Fernande" );
    check( [ 37, -1, 5, 5, 14, 17, 19 ], "Lffort" );
  } );
} );
