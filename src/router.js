/*
 * blueRouter.router class
 */
/** @constructor */
blueRouter.router = function ( userOptions ) {

    // Init options
    this.options = {};
    blueRouter.utils.extend( this.options, blueRouter.defaultOptions, userOptions );
    this.checkOptions();

    // Init some other vars
    //this.pathname = window.location.pathname;
    //this.urlBase = window.location.href;
    this.routesMap = this.createRoutesMap();
    this.stack = [];

    //alert( 'pathname: ' + this.pathname + '\nurlBase:' + this.urlBase );

    // Add event listeners
    this.addEventListenersForWindow();
    this.addEventListenersForLinks();
};

/* Methods */

// Check that mandatory user defined properties are defined
blueRouter.router.prototype.checkOptions = function() {

    let errors = 0;
    let errorMessages = '';

    if ( ! this.options.routes ){
        ++errors;
        errorMessages += 'Routes must be defined. ';
    }

    if ( ! this.options.pages ){
        ++errors;
        errorMessages += 'Pages must be defined. ';
    }

    if ( errors ){
        let fullErrorMessage = 'Unable to initalize Blue router. ' + errors + ' errors found: ' + errorMessages;
        alert( fullErrorMessage );
        throw fullErrorMessage;
    }
};

blueRouter.router.prototype.addEventListenersForWindow = function() {

    window.onload = () => {
        if ( this.options.browserHistoryOnLoad ){
            this.navigateUrl( window.location.href );
            return;
        }

        this.navigateUrl( '' );
    }

    window.onpopstate = ( e ) => {
        this.navigateUrl( window.location.href );
        //this.navigateUrl( e.state[ 'page' ] );
    }
};

blueRouter.router.prototype.addEventListenersForLinks = function() {
    
    let self = this;

    // Add event listeners for a elements
    blueRouter.utils.addEventListenerOnList(
        document.getElementsByTagName( 'a' ),
        'click', 
        (e) => {
            const href = e.target.getAttribute( 'href' );

            // Follow the link if it is external (if it is marked as external in the class list)
            /*
            if ( e.target.classList.contains ( self.options.externalClass ) ){
                return;
            }
            */
            // Follow the link if it is external (if it does not start by !)
            if ( ! href.startsWith( self.options.pagePrefix ) ){
                return;
            }

            e.preventDefault();
            history.pushState(
                {
                    'page': href
                },
                'page ' + href,
                '#' + href
            );
            self.navigateUrl( href );
        }
    );
};

// Create a map with the data in routes, using the path as the key
blueRouter.router.prototype.createRoutesMap = function() {

    const routerMap = {};
    const routes = this.options.routes || [];

    routes.map( routeItem => {
        routerMap[ routeItem[ 'path' ] ] = routeItem;
    });

    return routerMap;
};

blueRouter.router.prototype.navigateUrl = function( url ) {
    //alert( 'navigateUrl\nurl: ' + url );

    // Create an url object to make it easy everything
    let urlObject = blueRouter.utils.analizeUrl( url, this.options );

    // Update stack and get currentPageId
    let currentPageId = this.updateStack( urlObject.page );

    // Exit if trying to navigate to current page
    if ( currentPageId == urlObject.page ){
        return;
    }

    // Get the content
    let content = this.getContentForPage( urlObject.page );

    // Update current page
    this.doPageTransition( content, urlObject.page, currentPageId, urlObject );
};

blueRouter.router.prototype.updateStack = function( pageId ) {
    
    // If the penultimate element is the pageId then we are going backwards; otherwise we are going forward
    let isBackward = this.stack[ this.stack.length - 2 ] == pageId;

    if ( isBackward ){
        // Is backward
        return this.stack.pop();
    }

    // Is forward
    var currentPageId = this.stack[ this.stack.length - 1 ];
    this.stack.push( pageId );
    return currentPageId;
};

blueRouter.router.prototype.getContentForPage = function( pageId ) {

    let route = this.routesMap[ pageId ];

    // Check if there is a route for this path
    if ( route ){
        return this.getContentForRoute( route );
    }

    // No route found, 404 error
    route = this.routesMap[ this.options.PAGE_ID_404_ERROR ];
    if ( route ){
        return this.getContentForRoute( route );
    }

    // No 404 page found
    return '<h3>404 - Page not found: ' + pageId + '</h3>';
};

blueRouter.router.prototype.getContentForRoute = function( route ) {
    
    if ( route[ 'keepAlive' ] ){
        let alivePage = document.getElementById( route[ 'path' ] );
        if ( alivePage ){
            return alivePage;
        }
    }

    let content = route[ 'content' ];
    return content? content: 'No content found for route from path ' + route[ 'path' ];
};


blueRouter.router.prototype.doPageTransition = function( content, nextPageId, currentPageId, urlObject ) {

    // Run events
    this.runEvent( blueRouter.defaultOptions.EVENT_BEFORE_OUT, currentPageId, {} );

    // Get the currentPage and add next page
    let currentPage = document.getElementsByClassName( 'currentPage' )[0];
    let newPage = this.addNextPage( currentPage, content, nextPageId );

    // Animate!
    let self = this;
    let currentPageAnimationendListener = () => {
        currentPage.removeEventListener( 'animationend', currentPageAnimationendListener );
        
        // Remove hidden class, add animationIn class
        newPage.classList.remove( 'hidden' );
        newPage.classList.add( this.options.animationIn );

        // Retire current page: save it as an alive page or remove it
        this.retireCurrentPage( currentPageId, currentPage );
        self.runEvent( blueRouter.defaultOptions.EVENT_AFTER_OUT, currentPageId, {} );
    };
    currentPage.addEventListener( 'animationend', currentPageAnimationendListener );

    let newPageAnimationendListener = () => {
        newPage.removeEventListener( 'animationend', newPageAnimationendListener );

        // Remove nextPage class, add currentPage class, remove animationIn class
        newPage.classList.remove( 'nextPage' );
        newPage.classList.add( 'currentPage' );
        newPage.classList.remove( this.options.animationIn );

        // Run EVENT_INIT or EVENT_REINIT
        self.runEvent(
            content instanceof HTMLElement? blueRouter.defaultOptions.EVENT_REINIT: blueRouter.defaultOptions.EVENT_INIT,
            nextPageId,
            urlObject
        );
        // Run EVENT_MOUNTED
        self.runEvent( blueRouter.defaultOptions.EVENT_MOUNTED, nextPageId, urlObject );
    };
    newPage.addEventListener( 'animationend', newPageAnimationendListener );

    currentPage.classList.add( this.options.animationOut );
};

blueRouter.router.prototype.addNextPage = function( currentPage, content, nextPageId ){

    if ( content instanceof HTMLElement ){
        currentPage.insertAdjacentElement(
            'afterend',
            content
        );
        content.classList.add( 'nextPage' );
        content.classList.add( 'hidden' );
        content.classList.remove( 'alive' );

    } else {
        currentPage.insertAdjacentHTML(
            'afterend',
            '<div class="nextPage hidden page" id="' + nextPageId + '">'
            + content
            + '</div>'
        );
    }

    return document.getElementById( nextPageId );
};

// Retire current page: save it as an alive page or remove it
blueRouter.router.prototype.retireCurrentPage = function( currentPageId, currentPage ){

    let currentRoute = this.routesMap[ currentPageId ];

    // If must keep alive current page, set page and alive as classes removing the rest
    if ( currentRoute && currentRoute[ 'keepAlive' ]){
        currentPage.removeAttribute( 'class' );
        currentPage.classList.add( 'page' );
        currentPage.classList.add( 'alive' );
        return;
    }

    // Do not keep alive current page, so remove it
    currentPage.remove();
};

blueRouter.router.prototype.runEvent = function( eventId, pageId, urlObject ) {

    if ( eventId == blueRouter.defaultOptions.EVENT_INIT ){
        this.addEventListenersForLinks();
    }

    // Get the page object from options
    let page = this.options.pages[ pageId ];

    // If a page is found, run the event handler
    if ( page ){
        let event = {
            params: urlObject.params || {}
        };
        page[ eventId ]( event );
    }
};

