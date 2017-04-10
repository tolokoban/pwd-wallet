"use strict";

var Alphabet = require("alphabet");

describe('Alphabet', function() {
  it('should be consistent for isInThisAlphabet()', function() {
    expect(Alphabet.isInThisAlphabet("garçon")).toBe( false );
    expect(Alphabet.isInThisAlphabet("l'arsenic")).toBe( false );
    expect(Alphabet.isInThisAlphabet("le€fort")).toBe( false );
    expect(Alphabet.isInThisAlphabet("La salamandre")).toBe( true );
    expect(Alphabet.isInThisAlphabet(Alphabet)).toBe( true );
  });
});
