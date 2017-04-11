var Master = require("master");

describe('Master', function() {
  it('should get/set master password', function() {
    Master.password = "toto-4511";
    expect(Master.password).toBe("toto-4511");
  });

  describe('should encode/decode plain text', function() {
    function check(pwd, plain, name) {
      it('should encode/decode ' + JSON.stringify(plain) +
        " with password " + JSON.stringify(pwd) +
        " and name " + JSON.stringify(name), function()
        {
          Master.password = pwd;
          var cypher = Master.encode(plain, name);
          expect(Master.decode(cypher, name)).toBe(plain);
      });
    }
    check( 'toto-2711', 'Albert-1er', "mail");
    check( '45*412-2', '36(>$)7sjmDF', "Tortue Ninja");
    check( 'toto-2711', 'Albert-1er', "Violaine");
    check( 'df(.-45DD=', 'Choucroutte*', "    €€€€");
  });
});
