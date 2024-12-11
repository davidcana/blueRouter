// Sample

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
<h1>Blue router sample</h1>

<div class="page-content">
    <h3>Home page</h3>
    <p>
        This is the Home page
    </p>

    <ul id="home_links">
        <li>
            <a href="!links">Links</a>. Go to links page.
        </li>
        <li>
            <a href="!textWriter">Text writer</a>. Go to text writer.
        </li>
        <li>
            <a href="!textWriter?text1=copyThis">Text writer</a>. Go to text writer using 1 parameter.
        </li>
        <li>
            <a href="!textWriter?text1=copyThis&text2=copyThisToo2">Text writer</a>. Go to text writer using 2 parameters.
        </li>
    </ul>
</div>
`
    },
    // Links page
    {
        'path': 'links',
        'content': `
<h1>Blue router sample</h1>

<div>
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Links page</h3>
    <p>
        This is the links page
    </p>

    <ul>
        <li>
            <a href="https://github.com/davidcana/blueRouter">Blue router</a>.
            A simple router component to make it easy build Single Page Applications.
        </li>
        <li>
            <a href="https://davidcana.github.io/ZPT-JS/">ZPT-JS</a>.
            Zenon Page Templates - JS (ZPT-JS) is a Javascript implementation of Zope Page Templates (ZPT).
        </li>
        <li>
            <a href="https://github.com/davidcana/ZPT-Java">ZPT-Java</a>.
            JPT is a Java implementation of Zope Page Templates (ZPT).
        </li>
        <li>
            <a href="https://github.com/davidcana/zzDOM">zzDOM</a>.
            A tiny javascript API that implements only the DOM functions of jquery including chaining.
        </li>
    </ul>
</div>
`
    },
    // Text writer page
    {
        'path': 'textWriter',
        'keepAlive': true,
        'content': `
<h1>Blue router sample</h1>

<div>
    <a href="!">Home</a>
</div>

<div class="page-content">
    <h3>Text writer page</h3>
    <p>
        This is the text writer page. Write text and click 'Add text' button or press 'Enter' to add text.
    </p>

    <div class="field">
        <div>Text</div>
        <div>
            <input type="text" id="textWriter_textToAdd" name="textWriter_textToAdd" required>
            <button id="textWriter_addTextButton">Add text</button>
        </div>
    </div>

    <div class="field">
        <div>History</div>
        <div id="textWriter_history"></div>
    </div>
</div>
`
    },
    // Default route (404 page)
    {
        'path': '[404]',
        'content': `
<h1>Blue router sample</h1>

<nav>
    <a href="!">Home</a> |
    <a href="!links">Links</a> |
    <a href="!textWriter">Text writer</a>
</nav>

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
let router = buildBlueRouter( options );

