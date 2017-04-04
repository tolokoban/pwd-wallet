var Crypt = require("crypt");

function check( cases ) {
  cases.forEach(function (itm) {
    var src = itm[0];
    var key = itm[1];
    var cod = Crypt.encode(src, key);
    expect(src).toEqual(Crypt.decode(cod, key));
  });
}

describe('Crypt', function() {
  it('should encode/decode with long passwords', function() {
    check([
      ["Coniglio", "My-password"],
      ["Albero", "My-password"],
      ["toto-4511.!", "My-password"]
    ]);
  });
  it('should encode/decode with short passwords', function() {
    check([
      ["Coniglio", "PWD!"],
      ["Albero", "PWD!"],
      ["toto-4511.!", "PWD!"]
    ]);
  });
  it('should encode/decode with exotic chars in password', function() {
    check([
      ["Coniglio", "l'été"],
      ["Albero", "G€"],
      ["toto-4511.!", "(映画)"]
    ]);
  });
  it('should encode/decode with exotic chars in text', function() {
    check([
      ["l'été", "My-password"],
      ["G€", "My-password"],
      ["(映画)", "My-password"]
    ]);
  });
});
