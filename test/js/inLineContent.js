"use strict";

var Qunit = require( 'qunit' );
var zz = require( 'zzdom' );
var blueRouter = require( '../../build/blueRouter.standalone.concat.js' );

// Init router
const initRouter = () => {
    // Initialize pages
    const pages = {};

    // Initialize options: no animations
    let options = {
        pages: pages,
        animationOut: false,
        animationIn: false
    };

    // Add routes to options
    options.routes = [
        // Home page
        {
            'path': '[home]',
            'content': `
<h1>Blue router test</h1>

<div class="page-content">
    <h3>Home page</h3>
    <p>
        This is Home page
    </p>

    <ul id="home_links">
        <li>
            <a href="!page1" id="home_page1Link">Page 1</a>. Go to page 1.
        </li>
        <li>
            <a href="!page2" id="home_page2Link">Page 2</a>. Go to page 2.
        </li>
    </ul>
</div>
`
        },
        // page1
        {
            'path': 'page1',
            'content': `
<h1>Blue router test</h1>

<div>
    <a href="!" id="page1_homeLink">Home</a>
</div>

<div class="page-content">
    <h3>Page 1</h3>
    <p>
        This is Page 1
    </p>

    <ul id="page1_links">
        <li>
            <a href="!page11" id="page1_page11Link">Page 11</a>. Go to page 11.
        </li>
        <li>
            <a href="!page12" id="page1_page12Link">Page 12</a>. Go to page 12.
        </li>
    </ul>
</div>
`
        },
        // page11
        {
            'path': 'page11',
            'content': `
<h1>Blue router test</h1>

<div>
    <a href="!" id="page11_homeLink">Home</a>
</div>

<div class="page-content">
    <h3>Page 11</h3>
    <p id="page11_p">
        This is Page 11
    </p>
</div>
`
        },
        // page12
        {
            'path': 'page12',
            'content': `
<h1>Blue router test</h1>

<div>
    <a href="!" id="page12_homeLink">Home</a>
</div>

<div class="page-content">
    <h3>Page 12</h3>
    <p id="page12_p">
        This is Page 12
    </p>
</div>
`
        },
        // page2
        {
            'path': 'page2',
            'content': `
<h1>Blue router test</h1>

<div>
    <a href="!" id="page2_homeLink">Home</a>
</div>

<div class="page-content">
    <h3>Page 2</h3>
    <p>
        This is Page 2
    </p>

    <ul id="page2_links">
        <li>
            <a href="!page21" id="page2_page21Link">Page 21</a>. Go to page 21.
        </li>
        <li>
            <a href="!page22" id="page2_page22Link">Page 22</a>. Go to page 22.
        </li>
    </ul>
</div>
`
        },
        // page21
        {
            'path': 'page21',
            'content': `
<h1>Blue router test</h1>

<div>
    <a href="!" id="page21_homeLink">Home</a>
</div>

<div class="page-content">
    <h3>Page 21</h3>
    <p id="page21_p">
        This is Page 21
    </p>
</div>
`
        },
        // page22
        {
            'path': 'page22',
            'content': `
<h1>Blue router test</h1>

<div>
    <a href="!" id="page22_homeLink">Home</a>
</div>

<div class="page-content">
    <h3>Page 22</h3>
    <p id="page22_p">
        This is Page 22
    </p>
</div>
`
        },
        // Default route (404 page)
        {
            'path': '[404]',
            'content': `
<h1>Blue router test</h1>

<div>
    <a href="!" id="404_homeLink">Home</a>
</div>

<div class="page-content">
    <h3>404 page</h3>
    <p>
        Sorry
    </p>
    <p>
        Requested content not found.
    </p>
</div>
`
        }
    ];

    // Create new router instance
    let router = new blueRouter.router( options );
};

// Init router
initRouter();

// Unit tests
QUnit.test( "Simple navigation test", function( assert ) {

    // Start testing
    assert.equal( zz('#home_page1Link').html() , "Page 1" );
    assert.equal( zz('#home_page2Link').html() , "Page 2" );

    // Go to page 1
    zz('#home_page1Link').el.click();
    assert.equal( zz('#page1_page11Link').html() , "Page 11" );
    assert.equal( zz('#page1_page12Link').html() , "Page 12" );

    // Go to page 11
    zz('#page1_page11Link').el.click();
    assert.equal( zz('#page11_p').text().trim() , "This is Page 11" );

    // Go to home
    zz('#page11_homeLink').el.click();
    assert.equal( zz('#home_page1Link').html() , "Page 1" );
    assert.equal( zz('#home_page2Link').html() , "Page 2" );

    // Go to page 2
    zz('#home_page2Link').el.click();
    assert.equal( zz('#page2_page21Link').html() , "Page 21" );
    assert.equal( zz('#page2_page22Link').html() , "Page 22" );

    // Go to page 22
    zz('#page2_page22Link').el.click();
    assert.equal( zz('#page22_p').text().trim() , "This is Page 22" );
});


