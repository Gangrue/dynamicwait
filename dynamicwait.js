function waitForElement(elementQuery, callBack, elementCount = 1) {
	let timeToWait = 1000;
	let timeBetweenCheckIntervals = 10;
	waitForElementExtended(callBack, elementQuery, timeToWait, timeBetweenCheckIntervals, elementCount);
}
function waitForElementExtended(executeFunction, selectorToWaitFor, timeToWait = 1000, timeBetweenCheckIntervals = 30, elementCount = 1) {
	setTimeout(function() {
		if (!ExecuteIfElementLoaded(executeFunction, selectorToWaitFor, elementCount) && timeToWait >= 0) {
			waitForElementExtended(executeFunction, selectorToWaitFor, timeToWait-timeBetweenCheckIntervals, timeBetweenCheckIntervals, elementCount);
		}
	}, timeBetweenCheckIntervals);
}
function ExecuteIfElementLoaded(executeFunction, selectorToWaitFor, elementCount = 1) {
	var elementQueryResult = jQuery(selectorToWaitFor);
	if (elementQueryResult != undefined && elementQueryResult.length >= elementCount) {
		executeFunction();
		return true;
	}
	return false;
}
