/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

window.require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(f, mod, exports);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        APP = require('app');
setTimeout(function (){if(typeof APP.start==='function')APP.start()});
var W = require('x-widget');
        W('wdg.layout-stack129', 'wdg.layout-stack', {
            hash: "^#([a-zA-Z0-9]+)",
            content: [
          W({
              elem: "section",
              prop: {"$key": "master"},
              children: [
                "\n              ",
                                W('wdg.flex130', 'wdg.flex', {
                  orientation: "V",
                  justify: "between",
                  content: [
                  W({
                      elem: "h1",
                      prop: {"$grow": "0"},
                      children: ["Master Password"]}),
                                      W('master', 'wdg.text', {
                      label: "Master password",
                      width: "100%",
                      type: "password",
                      wide: "true",
                      focus: "true"}),
                                      W('wdg.button131', 'wdg.button', {
                      text: "Decrypt passwords' list",
                      wide: "true",
                      icon: "right"}),
                  W({
                      elem: "blockquote",
                      children: [
                        "\n                      Please provide a strong master password (at least ",
                        W({
                          elem: "b",
                          children: ["10 characters"]}),
                        "),\n                      for this is your protection for all other passwords.\n                  "]}),
                  W({
                      elem: "input",
                      attr: {
                        type: "file",
                        id: "file"}}),
                  W({
                      elem: "center",
                      prop: {"$grow": "0"},
                      children: [
                        "\n                    ",
                                                W('wdg.button132', 'wdg.button', {
                          icon: "gear",
                          text: "Config",
                          enabled: "false"}),
                        "\n                  "]}),
                                      W('wdg.flex133', 'wdg.flex', {
                      justify: "between",
                      $grow: "0",
                      content: [
                                              W('wdg.button134', 'wdg.button', {
                          icon: "import",
                          text: "Import"}),
                                              W('wdg.button135', 'wdg.button', {
                          icon: "export",
                          text: "Export"})]})]}),
                "\n            "]}),
          W({
              elem: "section",
              prop: {"$key": "view"},
              children: [
                "\n              ",
                                W('wdg.flex136', 'wdg.flex', {
                  orientation: "V",
                  justify: "space-between",
                  type: "fill",
                  content: [
                  W({
                      elem: "h1",
                      prop: {"$grow": "0"},
                      children: ["Passwords Wallet"]}),
                  W({
                      elem: "div",
                      attr: {"id": "list"}}),
                                      W('wdg.flex137', 'wdg.flex', {
                      type: "fill",
                      $grow: "0",
                      content: [
                                              W('wdg.button138', 'wdg.button', {
                          icon: "close",
                          type: "simple",
                          text: "Close",
                          href: "#master"}),
                                              W('wdg.button139', 'wdg.button', {
                          icon: "add",
                          text: "Add",
                          href: "#new"})]})]}),
                "\n            "]}),
          W({
              elem: "section",
              prop: {"$key": "show"},
              children: [
                "\n              ",
                                W('wdg.flex140', 'wdg.flex', {
                  orientation: "V",
                  justify: "between",
                  type: "default",
                  content: [
                  W({
                      elem: "h1",
                      attr: {"id": "showName"},
                      prop: {"$grow": "0"},
                      children: ["Name..."]}),
                  W({
                      elem: "article",
                      attr: {"id": "showPanel"},
                      children: [
                        "\n                    ",
                        W({
                          elem: "div",
                          attr: {"id": "showUsr"}}),
                        "\n                    ",
                        W({
                          elem: "div",
                          attr: {
                            id: "showPwd",
                            class: "theme-elevation-2"}}),
                        "\n                    ",
                        W({
                          elem: "div",
                          attr: {"id": "showHint"},
                          children: ["Press to reveal the password..."]}),
                        "\n                  "]}),
                                      W('wdg.flex141', 'wdg.flex', {
                      type: "fill",
                      $grow: "0",
                      content: [
                                              W('wdg.button142', 'wdg.button', {
                          icon: "left",
                          type: "simple",
                          text: "Back",
                          href: "#view"}),
                                              W('wdg.button143', 'wdg.button', {
                          icon: "delete",
                          text: "Delete",
                          type: "warning"})]})]}),
                "\n            "]}),
          W({
              elem: "section",
              prop: {"$key": "new"},
              children: [
                "\n              ",
                                W('wdg.flex144', 'wdg.flex', {
                  orientation: "V",
                  justify: "between",
                  type: "fill",
                  content: [
                  W({
                      elem: "h1",
                      prop: {"$grow": "0"},
                      children: ["New password"]}),
                  W({
                      elem: "article",
                      children: [
                        "\n                    ",
                                                W('newName', 'wdg.text', {
                          label: "Item's name",
                          wide: "true"}),
                        "\n                    ",
                                                W('newUsr', 'wdg.text', {
                          label: "User name",
                          wide: "true"}),
                        "\n                    ",
                                                W('wdg.flex145', 'wdg.flex', {
                          type: "fill",
                          content: [
                                                      W('newPwd', 'wdg.text', {
                              label: "Password",
                              wide: "true"}),
                                                      W('wdg.icon146', 'wdg.icon', {
                              button: "true",
                              content: "refresh",
                              size: "1rem",
                              $grow: "0"}),
                                                      W('wdg.icon147', 'wdg.icon', {
                              button: "true",
                              content: "add",
                              size: "1rem",
                              $grow: "0"})]}),
                        "\n                  "]}),
                                      W('wdg.flex148', 'wdg.flex', {
                      type: "fill",
                      $grow: "0",
                      content: [
                                              W('wdg.button149', 'wdg.button', {
                          icon: "left",
                          type: "simple",
                          text: "Cancel",
                          href: "#master"}),
                                              W('wdg.button150', 'wdg.button', {
                          icon: "add",
                          text: "OK"})]})]}),
                "\n            "]}),
          W({
              elem: "section",
              prop: {"$key": "edit"},
              children: [
                "\n              ",
                                W('wdg.flex151', 'wdg.flex', {
                  orientation: "V",
                  justify: "between",
                  content: [
                  W({
                      elem: "center",
                      prop: {"$grow": "0"},
                      children: [                        W('wdg.button152', 'wdg.button', {
                          text: "Delete",
                          icon: "delete",
                          type: "warning"})]}),
                  W({
                      elem: "hr",
                      prop: {"$grow": "0"}}),
                  W({
                      elem: "h1",
                      prop: {"$grow": "0"},
                      children: ["Edit password"]}),
                  W({
                      elem: "article",
                      children: [
                        "\n                    ",
                                                W('editName', 'wdg.text', {
                          label: "Item's name",
                          wide: "true"}),
                        "\n                    ",
                                                W('editUsr', 'wdg.text', {
                          label: "User name",
                          wide: "true"}),
                        "\n                    ",
                                                W('wdg.flex153', 'wdg.flex', {
                          type: "fill",
                          content: [
                                                      W('editPwd', 'wdg.text', {
                              label: "Password",
                              wide: "true"}),
                                                      W('wdg.icon154', 'wdg.icon', {
                              button: "true",
                              content: "add",
                              size: "1.5rem",
                              $grow: "0"})]}),
                        "\n                  "]}),
                                      W('wdg.flex155', 'wdg.flex', {
                      type: "fill",
                      $grow: "0",
                      content: [
                                              W('wdg.button156', 'wdg.button', {
                          icon: "left",
                          type: "simple",
                          text: "Cancel",
                          href: "#master"}),
                                              W('wdg.button157', 'wdg.button', {
                          icon: "add",
                          text: "OK"})]})]}),
                "\n            "]}),
          W({
              elem: "section",
              prop: {"$key": "del"},
              children: [
                "\n              ",
                                W('wdg.flex158', 'wdg.flex', {
                  justify: "between",
                  orientation: "V",
                  content: [
                  W({
                      elem: "h1",
                      children: ["Delete a password"]}),
                  W({
                      elem: "p",
                      attr: {"class": "confirm"},
                      children: [
                        "Are you sure you want to delete the password for ",
                        W({
                          elem: "b",
                          attr: {"id": "nameToDelete"}}),
                        "?"]}),
                                      W('wdg.flex159', 'wdg.flex', {
                      $grow: "0",
                      justify: "between",
                      content: [
                                              W('wdg.button160', 'wdg.button', {
                          icon: "left",
                          type: "simple",
                          text: "Cancel",
                          href: "#master"}),
                                              W('wdg.button161', 'wdg.button', {
                          icon: "delete",
                          text: "Delete",
                          type: "warning"})]})]}),
                "\n            "]})]})
        W.bind('wdg.layout-stack129',{"args":{"S":["onPage"]}});
        W.bind('wdg.button131',{"action":{"B":[["master","action"]],"S":["onSetPassword"]}});
        W.bind('wdg.button134',{"action":{"S":["onImport"]}});
        W.bind('wdg.button135',{"action":{"S":["onExport"]}});
        W.bind('wdg.button143',{"action":{"S":["onConfirmDel"]}});
        W.bind('wdg.icon146',{"action":{"S":["onRndPwd"]}});
        W.bind('wdg.icon147',{"action":{"S":["onRndAddCharPwd"]}});
        W.bind('wdg.button150',{"action":{"S":["onNewPwd"]}});
        W.bind('wdg.icon154',{"action":{"S":["onRndPwd"]}});
        W.bind('wdg.button157',{"action":{"S":["onNewPwd"]}});
        W.bind('wdg.button161',{"action":{"S":["onDelPwd"]}});
    }
);
