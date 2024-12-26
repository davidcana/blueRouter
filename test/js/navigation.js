const navigation = {};

var zz = require( 'zzdom' );
var utils = require( './utils.js' );

// Unit tests
navigation.simpleNavigationTest = async function( assert ) {
    
    // Get a reference to finish the qunit test later
    var done = assert.async();
    debugger;

    // Start testing
    assert.equal( zz('#home_page1Link').html() , "Page 1" );
    assert.equal( zz('#home_page2Link').html() , "Page 2" );

    // Go to page 1
    zz('#home_page1Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page1_page11Link').html() , "Page 11" );
    assert.equal( zz('#page1_page12Link').html() , "Page 12" );

    // Go to page 11
    zz('#page1_page11Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page11_p').text().trim() , "This is Page 11" );

    // Go to home
    zz('#page11_homeLink').el.click();
    await utils.waitShort();
    assert.equal( zz('#home_page1Link').html() , "Page 1" );
    assert.equal( zz('#home_page2Link').html() , "Page 2" );

    // Go to page 2
    zz('#home_page2Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page2_page21Link').html() , "Page 21" );
    assert.equal( zz('#page2_page22Link').html() , "Page 22" );

    // Go to page 22
    zz('#page2_page22Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page22_p').text().trim() , "This is Page 22" );

    // Go to home
    zz('#page22_homeLink').el.click();
    await utils.waitShort();

    // Finish qunit test
    done();
};

navigation.historyNavigationTest = async function( assert ) {
    
    // Get a reference to finish the qunit test later
    var done = assert.async();

    // Start testing
    assert.equal( zz('#home_page1Link').html() , "Page 1" );
    assert.equal( zz('#home_page2Link').html() , "Page 2" );

    // Go to page 1
    zz('#home_page1Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page1_page11Link').html() , "Page 11" );
    assert.equal( zz('#page1_page12Link').html() , "Page 12" );

    // Go to page 11
    zz('#page1_page11Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page11_p').text().trim() , "This is Page 11" );

    // Test first back-forward-back

    // Go back to page 1
    history.back();
    await utils.waitShort();
    assert.equal( zz('#page1_page11Link').html() , "Page 11" );
    assert.equal( zz('#page1_page12Link').html() , "Page 12" );

    // Go forward to page 11
    history.forward();
    await utils.waitShort();
    assert.equal( zz('#page11_p').text().trim() , "This is Page 11" );

    // Go back to page 1
    history.back();
    await utils.waitShort();
    assert.equal( zz('#page1_page11Link').html() , "Page 11" );
    assert.equal( zz('#page1_page12Link').html() , "Page 12" );

    // Go to home: can not use go back because of qunit strange behaviour
    zz('#page1_homeLink').el.click();
    await utils.waitShort();
    assert.equal( zz('#home_page1Link').html() , "Page 1" );
    assert.equal( zz('#home_page2Link').html() , "Page 2" );
    
    // Go to page 2
    zz('#home_page2Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page2_page21Link').html() , "Page 21" );
    assert.equal( zz('#page2_page22Link').html() , "Page 22" );
    
    // Go to page 22
    zz('#page2_page22Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page22_p').text().trim() , "This is Page 22" );
    
    // Go to page 221
    zz('#page22_page221Link').el.click();
    await utils.waitShort();
    assert.equal( zz('#page221_p').text().trim() , "This is Page 221" );
    
    // Test second back-back-forward-forward
    
    // Go back to page 22
    history.back();
    await utils.waitShort();
    assert.equal( zz('#page22_p').text().trim() , "This is Page 22" );
    
    // Go back to page 2
    history.back();
    await utils.waitShort();
    assert.equal( zz('#page2_page21Link').html() , "Page 21" );
    assert.equal( zz('#page2_page22Link').html() , "Page 22" );

    // Go forward to page 22
    history.forward();
    await utils.waitShort();
    assert.equal( zz('#page22_p').text().trim() , "This is Page 22" );

    // Go forward to page 221
    history.forward();
    await utils.waitShort();
    assert.equal( zz('#page221_p').text().trim() , "This is Page 221" );

    // Finish qunit test
    done();
};

navigation._404ErrorTest = async function( assert ) {
    
    //let thisUrl = "/test/bothTransitionNavigation.html";
    let thisUrl = window.location.href;

    // Get a reference to finish the qunit test later
    var done = assert.async();

    // Try to go to 404 error page
    window.location.href = thisUrl + "#!notFound";
    await utils.waitShort();

    // Test 404 page
    assert.equal( zz('#e404_p').text().trim() , "Requested content not found." );
    
    // Go to home
    zz('#e404_homeLink').el.click();
    await utils.waitShort();

    // Go to bokenPage: page with no content defined
    zz('#home_brokenPageLink').el.click();
    await utils.waitShort();
    assert.ok( zz('#error').text().startsWith( "No content found for route from path" ) );

    // Go to home
    //window.location.href = thisUrl;
    //await utils.waitShort();

    // Finish qunit test
    done();
};
/*
const utils.waitShort = function() {
    return wait( 1000 );
};

const wait = function( timeout ) {
    return new Promise( resolve => {
        setTimeout( resolve, timeout );
    });
};
*/
module.exports = navigation;
