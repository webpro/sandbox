var oContext = this;

oContext.addEventListener('message', function(event) {

	oContext.postMessage('Message received' + ' (' + event.data + ')');

}, false);


oContext.postMessage('Message from web worker');
