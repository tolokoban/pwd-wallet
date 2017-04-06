/**
 * All the password must be made exclusively of characters of this alphabet.
 * This allow stringer protection against cryptanalysis.
 * If your passwords are random and with the same size of your master password,
 * nobody can break them.
 * Your master password don't need to be random, but must contain only characters
 * from this alphabet.
 */

"use strict";

module.exports = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01213456789" +
  ".,:;+-*/$_()&%?'\"@#!<>=";