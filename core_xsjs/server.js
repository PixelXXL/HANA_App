/*This server.js is the Node.js bootstrap for XSJS compatibility mode. It uses the SAP provided xsjs module and starts it with a few basic parameters. 
However, remember all the HANA database connectivity options come from the HDI container which you bound to this service via the mta.yaml file. 
You want to make a few changes to what the wizard has generated. You want authentication on your service, so comment out the anonymous: true line*/

/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port = process.env.PORT || 3000;

var options = {
	//	anonymous : true, // remove to authenticate calls
	redirectUrl: "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({
		hana: {
			tag: "hana"
		}
	}));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({
		uaa: {
			tag: "xsuaa"
		}
	}));
} catch (err) {
	console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);

console.log("Server listening on port %d", port);