"use strict";

var Qunit = require( 'qunit' );
var zz = require( 'zzdom' );
var blueRouter = require( '../../build/blueRouter.standalone.concat.js' );

// Init router
const initRouter = () => {
    // Initialize pages
    const pages = {};

    // Initialize options
    let options = {
        pages: pages
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
        This is the Home page
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
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Page 1</h3>
    <p>
        This is the Page 1
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
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Page 11</h3>
    <p>
        This is the Page 11
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
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Page 12</h3>
    <p>
        This is the Page 12
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
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Page 2</h3>
    <p>
        This is the Page 2
    </p>

    <ul id="page2_links">
        <li>
            <a href="!page21">Page 21</a>. Go to page 21.
        </li>
        <li>
            <a href="!page22">Page 22</a>. Go to page 22.
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
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Page 21</h3>
    <p>
        This is the Page 21
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
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Page 22</h3>
    <p>
        This is the Page 22
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
    <a href="!">Home</a>
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

// Unit tests
QUnit.test( "Simple navigation test", function( assert ) {

    // Init router
    initRouter();

    // Start testing
    assert.equal( zz('#home_page1Link').html() , "Page 1" );
    assert.equal( zz('#home_page2Link').html() , "Page 2" );

    // Go to page 1
    zz('#home_page1Link').el.click();
    assert.equal( zz('#page1_page11Link').html() , "Page 11" );
    assert.equal( zz('#page1_page12Link').html() , "Page 12" );
});


