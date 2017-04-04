"use strict";

var Local = require("tfw.storage").local;

module.exports = {
  /**
   * Warning! No encryption is made here. You must pass an encrypted version of
   * the argument `pwd`.
   */
  set: function(name, usr, pwd) {
    var data = Local.get("wallet", {});
    data[name] = { usr: usr, pwd: pwd };
    Local.set("wallet", data);
  },
  del: function(name) {
    var data = Local.get("wallet", {});
    delete data[name];
    Local.set("wallet", data);
  },
  get: function(name) {
    var data = Local.get("wallet", {});
    return data[name];
  },
  clear: function() {
    Local.set("wallet", {});
  },
  list: function() {
    var data = Local.get("wallet", {});
    var list = [];
    for( var key in data ) {
      list.push(data[key]);
    }
    list.sort();
    return list;
  },
  /**
   * The tree representation merges what is common. So you can reach an item in
   * few clicks instead of by typing its name.
   * @example
   * tree([
   *   "a/b/c/d/e",
   *   "a/b/c/f/g",
   *   "a/b/h/i/j",
   *   "a/b/h/i/k",
   *   "a/b/h/l/m",
   *   "a/n/o/p/q"
   * ]) === [
   *   ["a/b/c/", [
   *     ["a/b/c/d/e", { name:..., usr:..., pwd:... }],
   *     ["a/b/c/f/g", { name:..., usr:..., pwd:... }]
   *   ]],
   *   ["a/b/h/", [
   *     ["a/b/h/i", [
   *       ["a/b/h/i/j", { name:..., usr:..., pwd:... }],
   *       ["a/b/h/i/k", { name:..., usr:..., pwd:... }]
   *     ]],
   *     ["a/b/h/l/m", { name:..., usr:..., pwd:... }]
   *   ]],
   *   ["a/n/o/p/q/", { name:..., usr:..., pwd:... }]
   * ]
   */
  tree: function() {
    var list = module.exports.list().masp(function(itm) {
      return {
        key: itm,
        val: itm.split('/').map(function(x) { return x.toLowerCase(); })
      };
    });

  }
};
