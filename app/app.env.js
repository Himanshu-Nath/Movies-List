var APP = APP || {};
if(~location.host.indexOf("localhost")) {
	APP.config = {
		'serviceUrl' : 'http://'+ location.host
	};
} else {
	APP.config = {
		'serviceUrl' : 'https://'+ location.host
	};
}

