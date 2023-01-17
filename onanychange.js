function linkChangeEvents(triggeringObjectQuery, reactingObjectQuery) {
	var triggerObject = jQuery(triggeringObjectQuery);
	var reactingObject = jQuery(reactingObjectQuery);
	if (triggerObject.length == 0 || reactingObject.length == 0)
		return;

	jQuery.each(jQuery._data(reactingObject[0], "events"), function(i, event) {
	  jQuery.each(event, function(j, h) {
	    triggerObject.on(i, () => {
	    	reactingObject.trigger(i);
	    });
	  });
	});
}

function copyChangeEvents(sourceOneQuery, sourceTwoQuery) {
	var sourceOne = jQuery(sourceOneQuery);
	var sourceTwo = jQuery(sourceTwoQuery);
	if (sourceOne.length == 0 || sourceTwo.length == 0)
		return;

	var sourceTwoOldEvents = jQuery._data(sourceTwo[0], "events");
	jQuery.each(jQuery._data(sourceOne[0], "events"), function(i, event) {
	  jQuery.each(event, function(j, h) {
	    sourceTwo.on(i, h.handler);
	  });
	});
	jQuery.each(sourceTwoOldEvents, function(i, event) {
	  jQuery.each(event, function(j, h) {
	    sourceOne.on(i, h.handler);
	  });
	});
}

function onAnyChange(source, inputHandler) {	
	source.addEventListener('input', inputHandler);
	source.addEventListener('propertychange', inputHandler); // for IE8
	source.addEventListener('paste', inputHandler);
	source.addEventListener('click', inputHandler);
}