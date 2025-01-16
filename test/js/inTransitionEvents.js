// Tests for events, both transitions

var blueRouter = require( '../../dist/blueRouter.js' );

// Init router
const initRouter = () => {
    // Initialize pages
    const pages = {};

    // Load js of pages
    pages[ 'page1' ] = require( './pages/page1.js' )( eventList );
    pages[ 'textWriter' ] = require( './pages/textWriter.js' );

    // Initialize options: both animations
    let options = {
        eventsByPage: pages,
        animationOut: false,
        routes: require( './routesInlineForEvents.js' )
    };
    
    // Create new router instance
    return new blueRouter.router( options );
};

// Init router
let eventList = [];
const router = initRouter();

// Unit tests
require( './events.js' )( router, eventList );


