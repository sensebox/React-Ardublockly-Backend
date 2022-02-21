define({
  "name": "Blockly for senseBox API",
  "version": "0.0.0",
  "description": "",
  "title": "Blockly for senseBox API documentation",
  "url": "https://api.blockly.sensebox.de",
  "order": [
    "Tutorial",
    "postTutorial",
    "putTutorial",
    "getTutorials",
    "getTutorial",
    "deleteTutorial",
    "Project",
    "postProject",
    "putProject",
    "getProjects",
    "getProject",
    "deleteProject",
    "Gallery",
    "postGallery",
    "putGallery",
    "getGalleries",
    "getGallery",
    "deleteGallery",
    "Share",
    "postShare",
    "getShare",
    "User",
    "signIn",
    "getDetails",
    "updateStatus",
    "connect",
    "disconnect"
  ],
  "template": {
    "withCompare": false,
    "forceLanguage": "en"
  },
  "header": {
    "title": "Introduction",
    "content": "<p><br />Documentation of the routes and methods to manage <a href=\"#api-Tutorial\">tutorials</a>, <a href=\"#api-Project\">projects</a>, <a href=\"#api-Gallery\">galleries</a>, <a href=\"#api-Share\">sharing-content</a> and <a href=\"#api-User\">users</a> in the Blockly for senseBox API. You can find the API running at <a href=\"https://api.blockly.sensebox.de\">https://api.blockly.sensebox.de</a>.</p>\n<h2>IDs</h2>\n<p>All users, tutorials, projects, galleries and sharing content receive a unique public identifier. These identifiers are exactly 24 character long and only contain digits and characters a to f.</p>\n<p>Example:</p>\n<pre><code>5e1b0bafeafe4a84c4ac31a9\n</code></pre>\n<h2>Parameters</h2>\n<p>All requests assume the payload encoded as JSON with <code>Content-type: application/json</code> header. Parameters prepended with a colon (<code>:</code>) are parameters which should be specified through the URL.</p>\n<h2>Source code</h2>\n<p>You can find the whole source code of the API at GitHub in the <a href=\"https://github.com/sensebox/React-Ardublockly-Backend\">React-Ardublockly</a> repository.</p>\n<p>If there is something unclear or there is a mistake in this documentation please open an <a href=\"https://github.com/sensebox/React-Ardublockly-Backend/issues/new\">issue</a> in the <a href=\"https://github.com/sensebox/React-Ardublockly-Backend\">GitHub</a> repository.</p>\n"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2021-07-27T12:44:23.291Z",
    "url": "https://apidocjs.com",
    "version": "0.28.1"
  }
});
