<br />Documentation of the routes and methods to manage [tutorials](#api-Tutorial), [projects](#api-Project), [galleries](#api-Gallery), [sharing-content](#api-Share) and [users](#api-User) in the Blockly for senseBox API. You can find the API running at [https://api.blockly.sensebox.de](https://api.blockly.sensebox.de).

## IDs

All users, tutorials, projects, galleries and sharing content receive a unique public identifier. These identifiers are exactly 24 character long and only contain digits and characters a to f.

Example:

    5e1b0bafeafe4a84c4ac31a9

## Parameters

All requests assume the payload encoded as JSON with `Content-type: application/json` header. Parameters prepended with a colon (`:`) are parameters which should be specified through the URL.

## Source code

You can find the whole source code of the API at GitHub in the [React-Ardublockly](https://github.com/sensebox/React-Ardublockly-Backend) repository.

If there is something unclear or there is a mistake in this documentation please open an [issue](https://github.com/sensebox/React-Ardublockly-Backend/issues/new) in the [GitHub](https://github.com/sensebox/React-Ardublockly-Backend) repository.
