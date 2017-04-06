"use strict";

var Wallet = require( "wallet" );

describe( 'Wallet', function () {
  it( 'should get item by name with same case', function () {
    Wallet.clear();
    Wallet.set( "anchor", "usrA", "pwd" );
    Wallet.set( "beach", "usrB", "pwd" );
    Wallet.set( "crabe", "usrC", "pwd" );
    var item = Wallet.get( "beach" );
    expect( item.usr ).toEqual( "usrB" );
  } );
} );