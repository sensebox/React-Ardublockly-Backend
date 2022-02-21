define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "/Users/mariopesch/Documents/GitHub/React-Ardublockly-Backend/docs/main.js",
    "groupTitle": "/Users/mariopesch/Documents/GitHub/React-Ardublockly-Backend/docs/main.js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/gallery/:galleryId",
    "title": "Delete gallery",
    "name": "deleteGallery",
    "description": "<p>Delete a specific gallery.</p>",
    "group": "Gallery",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "galleryId",
            "description": "<p>the ID of the gallery you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Gallery deleted successfully.</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission deleting the gallery project.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "404",
            "description": "<p><code>{&quot;message&quot;: Gallery not found.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/gallery/deleteGallery.js",
    "groupTitle": "Gallery"
  },
  {
    "type": "get",
    "url": "/gallery/",
    "title": "Get galleries",
    "name": "getGalleries",
    "description": "<p>Get all galleries.</p>",
    "group": "Gallery",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Galleries found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "galleries",
            "description": "<p><code>[   { \t\t&quot;_id&quot;: &quot;5fd8a66cb40982332c400bc4&quot;, \t\t&quot;title&quot;: &quot;flimsy-cougar&quot;, \t\t&quot;description&quot;: &quot;Beschreibung&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;__v&quot;: 0 \t} ]</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/gallery/getGalleries.js",
    "groupTitle": "Gallery"
  },
  {
    "type": "get",
    "url": "/gallery/:galleryId",
    "title": "Get gallery",
    "name": "getGallery",
    "description": "<p>Get a specific gallery.</p>",
    "group": "Gallery",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "galleryId",
            "description": "<p>the ID of the gallery you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Gallery found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "gallery",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a66cb40982332c400bc4&quot;, \t\t&quot;title&quot;: &quot;flimsy-cougar&quot;, \t\t&quot;description&quot;: &quot;Beschreibung&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/gallery/getGallery.js",
    "groupTitle": "Gallery"
  },
  {
    "type": "post",
    "url": "/gallery",
    "title": "Create gallery",
    "name": "postGallery",
    "description": "<p>Create a gallery.</p>",
    "group": "Gallery",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>name of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>further information about the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xml",
            "description": "<p>XML-String of the blockly-content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Gallery is successfully created.</code></p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "gallery",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a66cb40982332c400bc4&quot;, \t\t&quot;title&quot;: &quot;flimsy-cougar&quot;, \t\t&quot;description&quot;: &quot;Beschreibung&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission creating the gallery project.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/gallery/postGallery.js",
    "groupTitle": "Gallery"
  },
  {
    "type": "put",
    "url": "/gallery/:galleryId",
    "title": "Update gallery",
    "name": "putGallery",
    "description": "<p>Update a specific gallery.</p>",
    "group": "Gallery",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "galleryId",
            "description": "<p>the ID of the gallery you are referring to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>name of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>further information about the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "xml",
            "description": "<p>XML-String of the blockly-content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Gallery is updated successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "gallery",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a66cb40982332c400bc4&quot;, \t\t&quot;title&quot;: &quot;flimsy-cougar&quot;, \t\t&quot;description&quot;: &quot;Beschreibung&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T12:05:00.662Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p><code>{&quot;message&quot;: Gallery not found.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission updating the gallery project.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/gallery/putGallery.js",
    "groupTitle": "Gallery"
  },
  {
    "type": "delete",
    "url": "/project/projectId",
    "title": "Delete project",
    "name": "deleteProject",
    "description": "<p>Delete specific project.</p>",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "projectId",
            "description": "<p>the ID of the project you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Project deleted successfully.</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission deleting the project.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "404",
            "description": "<p><code>{&quot;message&quot;: Project not found.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/project/deleteProject.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/project/projectId",
    "title": "Get project",
    "name": "getProject",
    "description": "<p>Get specific project.</p>",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "projectId",
            "description": "<p>the ID of the project you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Project found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a3f4715f9945b85c18f9&quot;, \t\t&quot;title&quot;: &quot;thirsty-catfish&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;__v&quot;: 0,     &quot;shared&quot;: null \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission getting the project.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/project/getProject.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/project",
    "title": "Get projects",
    "name": "getProjects",
    "description": "<p>Get all projects.</p>",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Projects found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "projects",
            "description": "<p><code>[   { \t\t&quot;_id&quot;: &quot;5fd8a3f4715f9945b85c18f9&quot;, \t\t&quot;title&quot;: &quot;thirsty-catfish&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;__v&quot;: 0,     &quot;shared&quot;: null \t} ]</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/project/getProjects.js",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/project",
    "title": "Create project",
    "name": "postProject",
    "description": "<p>Create a project.</p>",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>name of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xml",
            "description": "<p>XML-String of the blockly-content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Project is successfully created.</code></p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a3f4715f9945b85c18f9&quot;, \t\t&quot;title&quot;: &quot;thirsty-catfish&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/project/postProject.js",
    "groupTitle": "Project"
  },
  {
    "type": "put",
    "url": "/project/projectId",
    "title": "Update project",
    "name": "putProject",
    "description": "<p>Update specific project.</p>",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "projectId",
            "description": "<p>the ID of the project you are referring to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>name of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "xml",
            "description": "<p>XML-String of the blockly-content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Project is updated successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a3f4715f9945b85c18f9&quot;, \t\t&quot;title&quot;: &quot;thirsty-catfish&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:54:28.897Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p><code>{&quot;message&quot;: Project not found.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission putting the project.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/project/putProject.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/share/:shareId",
    "title": "Create sharing content",
    "name": "getShare",
    "description": "<p>Create a sharing link with referenced content. Link expires after 30 days. If you want to share a project, you have to specify the Project-Id, otherwise you have to submit the XML-String. XML-String or Project-Id is required.</p>",
    "group": "Share",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "shareId",
            "description": "<p>the ID of the sharing-content you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Sharing-Content found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "content",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a18cd21fca5b98bec4ec&quot;, \t\t&quot;title&quot;: &quot;plant-elk&quot;, \t\t&quot;expiresAt&quot;: &quot;2021-01-14T11:44:12.131Z&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:44:12.143Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:44:12.143Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/share/getShare.js",
    "groupTitle": "Share"
  },
  {
    "type": "post",
    "url": "/share",
    "title": "Create sharing content",
    "name": "postShare",
    "description": "<p>Create a sharing link with referenced content. Link expires after 30 days. If you want to share a project, you have to specify the Project-Id, otherwise you have to submit the XML-String. XML-String or Project-Id is required.</p>",
    "group": "Share",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>name of the sharing content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "xml",
            "description": "<p>XML-String of the blockly-content</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "projectId",
            "description": "<p>the ID of the project you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Sharing-Content is successfully created.</code></p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "content",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd8a18cd21fca5b98bec4ec&quot;, \t\t&quot;title&quot;: &quot;plant-elk&quot;, \t\t&quot;expiresAt&quot;: &quot;2021-01-14T11:44:12.131Z&quot;, \t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:44:12.143Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:44:12.143Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: Project is already shared.&quot;}</code> or <code>{&quot;message&quot;: &quot;Project not found.&quot;}</code> or <code>{&quot;message&quot;: &quot;XML-String or Project-Id is required.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/share/postShare.js",
    "groupTitle": "Share"
  },
  {
    "type": "delete",
    "url": "/tutorial/:tutorialId",
    "title": "Delete tutorial",
    "name": "deleteTutorial",
    "description": "<p>Delete a specific tutorial.</p>",
    "group": "Tutorial",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "tutorialId",
            "description": "<p>the ID of the tutorial you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Tutorial deleted successfully.</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "404",
            "description": "<p><code>{&quot;message&quot;: Tutorial not found.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission deleting the tutorial.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/tutorial/deleteTutorial.js",
    "groupTitle": "Tutorial"
  },
  {
    "type": "get",
    "url": "/tutorial/:tutorialId",
    "title": "Get tutorial",
    "name": "getTutorial",
    "description": "<p>Get specific tutorial.</p>",
    "group": "Tutorial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "tutorialId",
            "description": "<p>the ID of the tutorial you are referring to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Tutorial found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tutorial",
            "description": "<p><code>{ \t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e85&quot;, \t\t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t\t&quot;title&quot;: &quot;Test&quot;, \t\t\t&quot;steps&quot;: [ \t\t\t\t{ \t\t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e87&quot;, \t\t\t\t\t&quot;type&quot;: &quot;instruction&quot;, \t\t\t\t\t&quot;headline&quot;: &quot;Einführung&quot;, \t\t\t\t\t&quot;text&quot;: &quot;In diesem Tutorial lernst du wie man die senseBox mit dem Internet verbindest.&quot;, \t\t\t\t\t&quot;hardware&quot;: [ \t\t\t\t\t\t&quot;senseboxmcu&quot;, \t\t\t\t\t\t&quot;wifi-bee&quot; \t\t\t\t\t] \t\t\t\t}, \t\t\t\t{ \t\t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e88&quot;, \t\t\t\t\t&quot;type&quot;: &quot;task&quot;, \t\t\t\t\t&quot;headline&quot;: &quot;Aufgabe 1&quot;, \t\t\t\t\t&quot;text&quot;: &quot;Stelle eine WLAN-Verbindung mit einem beliebigen Netzwerk her.&quot;, \t\t\t\t\t&quot;xml&quot;: &quot;&lt;xml xmlns='https://developers.google.com/blockly/xml'&gt;&lt;block type='arduino_functions' id='QWW|$jB8+*EL;}|#uA' deletable='false' x='27' y='16'&gt;&lt;statement name='SETUP_FUNC'&gt;&lt;block type='sensebox_wifi' id='W}P2Y^g,muH@]|@anou}'&gt;&lt;field name='SSID'&gt;SSID&lt;/field&gt;&lt;field name='Password'&gt;Password&lt;/field&gt;&lt;/block&gt;&lt;/statement&gt;&lt;/block&gt;&lt;/xml&gt;&quot; \t\t\t\t} \t\t\t], \t\t\t&quot;createdAt&quot;: &quot;2020-12-08T13:16:26.722Z&quot;, \t\t\t&quot;updatedAt&quot;: &quot;2020-12-13T19:25:40.529Z&quot;, \t\t\t&quot;__v&quot;: 0 \t\t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/tutorial/getTutorial.js",
    "groupTitle": "Tutorial"
  },
  {
    "type": "get",
    "url": "/tutorial",
    "title": "Get tutorials",
    "name": "getTutorials",
    "description": "<p>Get all tutorials.</p>",
    "group": "Tutorial",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Tutorials found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tutorials",
            "description": "<p><code>[     { \t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e85&quot;, \t\t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t\t&quot;title&quot;: &quot;Test&quot;, \t\t\t&quot;steps&quot;: [ \t\t\t\t{ \t\t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e87&quot;, \t\t\t\t\t&quot;type&quot;: &quot;instruction&quot;, \t\t\t\t\t&quot;headline&quot;: &quot;Einführung&quot;, \t\t\t\t\t&quot;text&quot;: &quot;In diesem Tutorial lernst du wie man die senseBox mit dem Internet verbindest.&quot;, \t\t\t\t\t&quot;hardware&quot;: [ \t\t\t\t\t\t&quot;senseboxmcu&quot;, \t\t\t\t\t\t&quot;wifi-bee&quot; \t\t\t\t\t] \t\t\t\t}, \t\t\t\t{ \t\t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e88&quot;, \t\t\t\t\t&quot;type&quot;: &quot;task&quot;, \t\t\t\t\t&quot;headline&quot;: &quot;Aufgabe 1&quot;, \t\t\t\t\t&quot;text&quot;: &quot;Stelle eine WLAN-Verbindung mit einem beliebigen Netzwerk her.&quot;, \t\t\t\t\t&quot;xml&quot;: &quot;&lt;xml xmlns='https://developers.google.com/blockly/xml'&gt;&lt;block type='arduino_functions' id='QWW|$jB8+*EL;}|#uA' deletable='false' x='27' y='16'&gt;&lt;statement name='SETUP_FUNC'&gt;&lt;block type='sensebox_wifi' id='W}P2Y^g,muH@]|@anou}'&gt;&lt;field name='SSID'&gt;SSID&lt;/field&gt;&lt;field name='Password'&gt;Password&lt;/field&gt;&lt;/block&gt;&lt;/statement&gt;&lt;/block&gt;&lt;/xml&gt;&quot; \t\t\t\t} \t\t\t], \t\t\t&quot;createdAt&quot;: &quot;2020-12-08T13:16:26.722Z&quot;, \t\t\t&quot;updatedAt&quot;: &quot;2020-12-13T19:25:40.529Z&quot;, \t\t\t&quot;__v&quot;: 0 \t\t}   ]</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/tutorial/getTutorials.js",
    "groupTitle": "Tutorial"
  },
  {
    "type": "post",
    "url": "/tutorial",
    "title": "Create tutorial",
    "name": "postTutorial",
    "description": "<p>Create a tutorial.</p>",
    "group": "Tutorial",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>name of the tutorial</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "steps",
            "description": "<p>an array of all steps of the tutorial. Every step has to be an object.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Tutorial is successfully created.</code></p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "tutorial",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd89de648ccd57688c77d3b&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;title&quot;: &quot;WLAN einrichten&quot;, \t\t&quot;steps&quot;: [ \t\t\t{ \t\t\t\t&quot;_id&quot;: &quot;5fd89de648ccd57688c77d3d&quot;, \t\t\t\t&quot;type&quot;: &quot;instruction&quot;, \t\t\t\t&quot;headline&quot;: &quot;Einführung&quot;, \t\t\t\t&quot;text&quot;: &quot;In diesem Tutorial lernst du wie man diesenseBox mit dem Internet verbindet.&quot;, \t\t\t\t&quot;hardware&quot;: [ \t\t\t\t\t&quot;senseboxmcu&quot; \t\t\t\t] \t\t\t}, \t\t\t{ \t\t\t\t&quot;_id&quot;: &quot;5fd89de648ccd57688c77d3e&quot;, \t\t\t\t&quot;type&quot;: &quot;task&quot;, \t\t\t\t&quot;headline&quot;: &quot;Aufgabe 1&quot;, \t\t\t\t&quot;text&quot;: &quot;Stelle eine WLAN-Verbindung mit einembeliebigen Netzwerk her.&quot;, \t\t\t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\r\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\r\\n&lt;/xml&gt;&quot; \t\t\t} \t\t], \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:28:38.300Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:28:38.300Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission creating the tutorial.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/tutorial/postTutorial.js",
    "groupTitle": "Tutorial"
  },
  {
    "type": "put",
    "url": "/tutorial/:tutorialId",
    "title": "Update tutorial",
    "name": "putTutorial",
    "description": "<p>Update a specific tutorial. All the information of the tutorial must be provided: only the data provided will be stored.</p>",
    "group": "Tutorial",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "tutorialId",
            "description": "<p>the ID of the tutorial you are referring to</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>name of the tutorial</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "steps",
            "description": "<p>an array of all steps of the tutorial. Every step has to be an object.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Tutorial is updated successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tutorial",
            "description": "<p><code>{ \t\t&quot;_id&quot;: &quot;5fd89de648ccd57688c77d3b&quot;, \t\t&quot;creator&quot;: &quot;em@il.de&quot;, \t\t&quot;title&quot;: &quot;WLAN einrichten&quot;, \t\t&quot;steps&quot;: [ \t\t\t{ \t\t\t\t&quot;_id&quot;: &quot;5fd89de648ccd57688c77d3d&quot;, \t\t\t\t&quot;type&quot;: &quot;instruction&quot;, \t\t\t\t&quot;headline&quot;: &quot;Einführung&quot;, \t\t\t\t&quot;text&quot;: &quot;In diesem Tutorial lernst du wie man diesenseBox mit dem Internet verbindet.&quot;, \t\t\t\t&quot;hardware&quot;: [ \t\t\t\t\t&quot;senseboxmcu&quot; \t\t\t\t] \t\t\t}, \t\t\t{ \t\t\t\t&quot;_id&quot;: &quot;5fd89de648ccd57688c77d3e&quot;, \t\t\t\t&quot;type&quot;: &quot;task&quot;, \t\t\t\t&quot;headline&quot;: &quot;Aufgabe 1&quot;, \t\t\t\t&quot;text&quot;: &quot;Stelle eine WLAN-Verbindung mit einembeliebigen Netzwerk her.&quot;, \t\t\t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\r\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;&lt;/block&gt;\\r\\n&lt;/xml&gt;&quot; \t\t\t} \t\t], \t\t&quot;createdAt&quot;: &quot;2020-12-15T11:28:38.300Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T11:28:38.300Z&quot;, \t\t&quot;__v&quot;: 0 \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p><code>{&quot;message&quot;: Tutorial not found.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: No permission creating the tutorial.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/tutorial/putTutorial.js",
    "groupTitle": "Tutorial"
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "Get details",
    "name": "getDetails",
    "description": "<p>Get details about currently logged in user.</p>",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>User found successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p><code>{ \t\t&quot;name&quot;: &quot;nickanme&quot;, \t\t&quot;email&quot;: &quot;em@il.de&quot;, \t\t&quot;role&quot;: &quot;user&quot;, \t\t&quot;language&quot;: &quot;de_DE&quot;, \t\t&quot;boxes&quot;: [ \t\t\t{ \t\t\t\t&quot;createdAt&quot;: &quot;2020-12-03T11:14:27.537Z&quot;, \t\t\t\t&quot;exposure&quot;: &quot;indoor&quot;, \t\t\t\t&quot;model&quot;: &quot;homeV2WifiFeinstaub&quot;, \t\t\t\t&quot;name&quot;: &quot;Test&quot;, \t\t\t\t&quot;updatedAt&quot;: &quot;2020-12-03T11:14:27.537Z&quot;, \t\t\t\t&quot;currentLocation&quot;: { \t\t\t\t\t&quot;timestamp&quot;: &quot;2020-12-03T11:14:27.532Z&quot;, \t\t\t\t\t&quot;coordinates&quot;: [ \t\t\t\t\t\t7.607942, \t\t\t\t\t\t51.976097 \t\t\t\t\t], \t\t\t\t\t&quot;type&quot;: &quot;Point&quot; \t\t\t\t}, \t\t\t\t&quot;sensors&quot;: [ \t\t\t\t\t{ \t\t\t\t\t\t&quot;title&quot;: &quot;Temperatur&quot;, \t\t\t\t\t\t&quot;unit&quot;: &quot;°C&quot;, \t\t\t\t\t\t&quot;sensorType&quot;: &quot;HDC1080&quot;, \t\t\t\t\t\t&quot;icon&quot;: &quot;osem-thermometer&quot;, \t\t\t\t\t\t&quot;_id&quot;: &quot;5fc8c893fab469001ce0b3c0&quot; \t\t\t\t\t} \t\t\t\t], \t\t\t\t&quot;_id&quot;: &quot;5fc8c893fab469001ce0b3b0&quot;, \t\t\t\t&quot;loc&quot;: [ \t\t\t\t\t{ \t\t\t\t\t\t&quot;geometry&quot;: { \t\t\t\t\t\t\t&quot;timestamp&quot;: &quot;2020-12-03T11:14:27.532Z&quot;, \t\t\t\t\t\t\t&quot;coordinates&quot;: [ \t\t\t\t\t\t\t\t7.607942, \t\t\t\t\t\t\t\t51.976097 \t\t\t\t\t\t\t], \t\t\t\t\t\t\t&quot;type&quot;: &quot;Point&quot; \t\t\t\t\t\t}, \t\t\t\t\t\t&quot;type&quot;: &quot;Feature&quot; \t\t\t\t\t} \t\t\t\t], \t\t\t\t&quot;integrations&quot;: { \t\t\t\t\t&quot;mqtt&quot;: { \t\t\t\t\t\t&quot;enabled&quot;: false \t\t\t\t\t} \t\t\t\t}, \t\t\t\t&quot;access_token&quot;: &quot;3d2e24edd9196b8ca4b29f88547b085f441d9e76810ba80046232490debec91e&quot;, \t\t\t\t&quot;useAuth&quot;: true \t\t\t} \t\t], \t\t&quot;emailIsConfirmed&quot;: false, \t\t&quot;blocklyRole&quot;: &quot;user&quot;, \t\t&quot;status&quot;: [ \t\t\t{ \t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e85&quot;, \t\t\t\t&quot;tasks&quot;: [ \t\t\t\t\t{ \t\t\t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e88&quot;, \t\t\t\t\t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;\\n    &lt;statement name=\\&quot;SETUP_FUNC\\&quot;&gt;\\n      &lt;block type=\\&quot;sensebox_display_show\\&quot; id=\\&quot;4nsbNC7n~EqM3pAN5flc\\&quot;&gt;&lt;/block&gt;\\n    &lt;/statement&gt;\\n  &lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t\t\t\t\t&quot;type&quot;: &quot;error&quot; \t\t\t\t\t} \t\t\t\t] \t\t\t} \t\t] }</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "401",
            "description": "<p><code>{&quot;message&quot;: &quot;Unauthorized&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/user/user/me.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/",
    "title": "Sign in",
    "name": "signIn",
    "description": "<p>Sign in the user.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email or nickname of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Successfully signed in</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>valid JSON Web Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>valid refresh token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p><code>{ \t\t&quot;name&quot;: &quot;nickanme&quot;, \t\t&quot;email&quot;: &quot;em@il.de&quot;, \t\t&quot;role&quot;: &quot;user&quot;, \t\t&quot;language&quot;: &quot;de_DE&quot;, \t\t&quot;boxes&quot;: [ \t\t\t{ \t\t\t\t&quot;createdAt&quot;: &quot;2020-12-03T11:14:27.537Z&quot;, \t\t\t\t&quot;exposure&quot;: &quot;indoor&quot;, \t\t\t\t&quot;model&quot;: &quot;homeV2WifiFeinstaub&quot;, \t\t\t\t&quot;name&quot;: &quot;Test&quot;, \t\t\t\t&quot;updatedAt&quot;: &quot;2020-12-03T11:14:27.537Z&quot;, \t\t\t\t&quot;currentLocation&quot;: { \t\t\t\t\t&quot;timestamp&quot;: &quot;2020-12-03T11:14:27.532Z&quot;, \t\t\t\t\t&quot;coordinates&quot;: [ \t\t\t\t\t\t7.607942, \t\t\t\t\t\t51.976097 \t\t\t\t\t], \t\t\t\t\t&quot;type&quot;: &quot;Point&quot; \t\t\t\t}, \t\t\t\t&quot;sensors&quot;: [ \t\t\t\t\t{ \t\t\t\t\t\t&quot;title&quot;: &quot;Temperatur&quot;, \t\t\t\t\t\t&quot;unit&quot;: &quot;°C&quot;, \t\t\t\t\t\t&quot;sensorType&quot;: &quot;HDC1080&quot;, \t\t\t\t\t\t&quot;icon&quot;: &quot;osem-thermometer&quot;, \t\t\t\t\t\t&quot;_id&quot;: &quot;5fc8c893fab469001ce0b3c0&quot; \t\t\t\t\t} \t\t\t\t], \t\t\t\t&quot;_id&quot;: &quot;5fc8c893fab469001ce0b3b0&quot;, \t\t\t\t&quot;loc&quot;: [ \t\t\t\t\t{ \t\t\t\t\t\t&quot;geometry&quot;: { \t\t\t\t\t\t\t&quot;timestamp&quot;: &quot;2020-12-03T11:14:27.532Z&quot;, \t\t\t\t\t\t\t&quot;coordinates&quot;: [ \t\t\t\t\t\t\t\t7.607942, \t\t\t\t\t\t\t\t51.976097 \t\t\t\t\t\t\t], \t\t\t\t\t\t\t&quot;type&quot;: &quot;Point&quot; \t\t\t\t\t\t}, \t\t\t\t\t\t&quot;type&quot;: &quot;Feature&quot; \t\t\t\t\t} \t\t\t\t], \t\t\t\t&quot;integrations&quot;: { \t\t\t\t\t&quot;mqtt&quot;: { \t\t\t\t\t\t&quot;enabled&quot;: false \t\t\t\t\t} \t\t\t\t}, \t\t\t\t&quot;access_token&quot;: &quot;3d2e24edd9196b8ca4b29f88547b085f441d9e76810ba80046232490debec91e&quot;, \t\t\t\t&quot;useAuth&quot;: true \t\t\t} \t\t], \t\t&quot;emailIsConfirmed&quot;: false, \t\t&quot;blocklyRole&quot;: &quot;user&quot;, \t\t&quot;status&quot;: [ \t\t\t{ \t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e85&quot;, \t\t\t\t&quot;tasks&quot;: [ \t\t\t\t\t{ \t\t\t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e88&quot;, \t\t\t\t\t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;\\n    &lt;statement name=\\&quot;SETUP_FUNC\\&quot;&gt;\\n      &lt;block type=\\&quot;sensebox_display_show\\&quot; id=\\&quot;4nsbNC7n~EqM3pAN5flc\\&quot;&gt;&lt;/block&gt;\\n    &lt;/statement&gt;\\n  &lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t\t\t\t\t&quot;type&quot;: &quot;error&quot; \t\t\t\t\t} \t\t\t\t] \t\t\t} \t\t] }</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p><code>{&quot;message&quot;: &quot;User and or password not valid.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database or creating a JWT.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/user/user/login.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/status",
    "title": "Update status",
    "name": "updateStatus",
    "description": "<p>Update status about submitted solutions in the tutorials.</p>",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>allows to send a valid JSON Web Token along with this request with <code>Bearer</code> prefix.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header Example",
          "content": "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "status",
            "description": "<p>Array of the updated complete status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p><code>Status is updated successfully.</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p><code>{ \t\t&quot;status&quot;: [ \t\t\t{ \t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e85&quot;, \t\t\t\t&quot;tasks&quot;: [ \t\t\t\t\t{ \t\t\t\t\t\t&quot;_id&quot;: &quot;5fcf7caabd63e209146d3e88&quot;, \t\t\t\t\t\t&quot;xml&quot;: &quot;&lt;xml xmlns=\\&quot;https://developers.google.com/blockly/xml\\&quot;&gt;\\n  &lt;block type=\\&quot;arduino_functions\\&quot; id=\\&quot;QWW|$jB8+*EL;}|#uA\\&quot; deletable=\\&quot;false\\&quot; x=\\&quot;27\\&quot; y=\\&quot;16\\&quot;&gt;\\n    &lt;statement name=\\&quot;SETUP_FUNC\\&quot;&gt;\\n      &lt;block type=\\&quot;sensebox_display_show\\&quot; id=\\&quot;4nsbNC7n~EqM3pAN5flc\\&quot;&gt;&lt;/block&gt;\\n    &lt;/statement&gt;\\n  &lt;/block&gt;\\n&lt;/xml&gt;&quot;, \t\t\t\t\t\t&quot;type&quot;: &quot;error&quot; \t\t\t\t\t} \t\t\t\t]       } \t\t], \t\t&quot;role&quot;: &quot;user&quot;, \t\t&quot;_id&quot;: &quot;5fce51c6b958a8ea6066c969&quot;, \t\t&quot;email&quot;: &quot;em@il.de&quot;, \t\t&quot;__v&quot;: 0, \t\t&quot;createdAt&quot;: &quot;2020-12-07T16:01:10.586Z&quot;, \t\t&quot;updatedAt&quot;: &quot;2020-12-15T10:57:01.510Z&quot; \t}</code></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "On error": [
          {
            "group": "On error",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p><code>{&quot;message&quot;: &quot;Status is required and has to be an array.&quot;}</code></p>"
          },
          {
            "group": "On error",
            "type": "Obejct",
            "optional": false,
            "field": "500",
            "description": "<p>Complications during querying the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/user/status/putStatus.js",
    "groupTitle": "User"
  }
] });
