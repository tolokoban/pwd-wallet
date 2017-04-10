/**
 * All the password must be made exclusively of characters of this alphabet.
 * This allow stringer protection against cryptanalysis.
 * If your passwords are random and with the same size of your master password,
 * nobody can break them.
 * Your master password don't need to be random, but must contain only characters
 * from this alphabet.
 */

"use strict";

var ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01213456789" +
  ".,:;+-*/$_()&%?'\"@#!<>=";

ALPHABET.isInThisAlphabet = function( text ) {
  for (var i=0 ; i<text.length ; i++) {
    if (ALPHABET.indexOf( text.charAt(i) ) == -1) return false;
  }
  return true;
};

ALPHABET.toIntArray = function( text ) {
  var arr = [];
  for (var i=0 ; i<text.length ; i++) {
    arr.push( ALPHABET.indexOf( text.charAt(i) ) );
  }
  return arr;
};

ALPHABET.fromIntArray = function( arr ) {
  var text = '';
  arr.forEach(function (code) {
    text += ALPHABET.charAt( code );
  });
  return text;
};

module.exports = ALPHABET;
