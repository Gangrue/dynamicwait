<script>
	/*
	////////////////////////////////////////////////////////////////////////////////////
	USE EXAMPLE, the following script will log the text "Hi!" after the cart is loaded:

	function scriptToRunAfterWait()
	{
		console.log("Hi!");
	}

	waitForCart(scriptToRunAfterWait);

	////////////////////////////////////////////////////////////////////////////////////
	USE EXAMPLE, the following script will log the text "Hi!" after the element with id "#buy_block" is found:

	function scriptToRunAfterWait()
	{
		console.log("Hi!");
	}

	waitForElement("#buy_block", scriptToRunAfterWait);

	///////////////////////////////////////////////////////////////////////////////////
	USE EXAMPLE, the following script will log the text "All is Loaded!" after
	a cart item is found, the custom field "Cost Center" is on the scope and
	 the specification "size" are all found:

	function scriptToRunAfterAllIsLoaded()
	{
		console.log("All is Loaded!");
	}

	waitForScreen(".cart_item", "Cost Center", "size", scriptToRunAfterAllIsLoaded)

	///////////////////////////////////////////////////////////////////////////////////
	*/

	//Some basic implementations.
	function waitForProductDetails(callBack) {
		var productDetailQuery = "#buy_block";
		waitForElement(productDetailQuery, callBack);
	}
	function waitForShippingAndBillingDropdowns(callBack) {
		var shippingQuery = "#id_address_delivery,#id_address_invoice";
		//Two elements in selector. We need both. So we add "2" for the "elementCount" parameter.
		waitForElement(shippingQuery, callBack, 2);
	}
	function waitForShipping(callBack) {
		var shippingQuery = "#shippingAddressContainer";
		waitForElement(shippingQuery, callBack);
	}
	function waitForBilling(callBack) {
		var billingQuery = "#billingAddressContainer";
		waitForElement(billingQuery, callBack);
	}
	function waitForPayment(callBack) {
		var paymentQuery = ".creditCardPayment";
		waitForElement(paymentQuery, callBack);
	}
	function waitForCart(callBack) {
		var cartQuery = ".cart_item";
		waitForElement(cartQuery, callBack);
	}

	//Here is the amalgamation of this script. You can query elements, custom field name or spec name.
	// If any of those fields are left out they will be ignored and call the "callBack" function after
	// all specified queries elements/scope variables are found.
	//TODO: Add an array checker and wait for all elements of array to appear.
	function waitForScreen(elementQuery, customFieldKey, specificationKey, callBack)
	{
		if (elementQuery == undefined || elementQuery == null || elementQuery == "")
		{
			waitForScopeFields(customFieldKey, specificationKey, callBack);
			return;
		}
		waitForElement(elementQuery, (customFieldKey, specificationKey, callBack) => {
			waitForScopeFields(customFieldKey, specificationKey, callBack);
		});
	}

	function waitForScopeFields(customFieldKey, specificationKey, callBack)
	{
		if (customFieldKey == undefined || customFieldKey == null || customFieldKey == "")
		{
			waitForSpecification(specificationKey, callBack);
			return;
		}
		if (specificationKey == undefined || specificationKey == null || specificationKey == "")
		{
			waitForCustomField(customFieldKey, callBack);
			return;
		}
		waitForCustomField(customFieldKey, (specificationKey, callBack) => {
			waitForSpecification(specificationKey, callBack);
		});
	}

	function waitForCustomField(customFieldKey, callBack) {
		var timeToWait = 1000;
		var timeBetweenCheckIntervals = 10;
		waitForCustomFieldExtended(callBack, customFieldKey, timeToWait, timeBetweenCheckIntervals);
	}
	function waitForCustomFieldExtended(executeFunction, customFieldToWaitFor, timeToWait = 200, timeBetweenCheckIntervals = 10) {
	{
		setTimeout(function() {
			if (!ExecuteIfCustomFieldLoaded(executeFunction, customFieldToWaitFor) && timeToWait >= 0) {
				waitForCustomFieldExtended(executeFunction, customFieldToWaitFor, timeToWait-timeBetweenCheckIntervals);
			}
		}, timeBetweenCheckIntervals);
	}
	function ExecuteIfCustomFieldLoaded(executeFunction, customFieldToWaitFor, customFieldCount = 1) {
	    var currentScope = angular.element(".main_content_area").scope();
	    var cartResults = currentScope?.model?.CartResults;
	    if (cartResults == undefined)
	    	return false;
	    if (cartResults.length == undefined || cartResults.length <= 0)
	    	return false;

	    var customFieldResults = new Array();
	    for(var i=0; i<cartResults.length; i++)
	    {
	    	var currentCustomFields = cartResults[i].CustomFields;
	    	if (currentCustomFields==undefined)
	    		continue;
	    	if (currentCustomFields.length== undefined || currentCustomFields.length <= 0)
	    		continue;

	    	for(var ii=0; ii<currentCustomFields.length; ii++)
	    	{
	    		var currentCustomField = currentCustomFields[ii];
	    		if (currentCustomField==undefined)
	    			continue;

	    		if (currentCustomField.Key == customFieldToWaitFor)
	    		{
	    			customFieldResults.push(currentCustomField.Key);
	    		}
	    	}
	    }
		if (customFieldResults != undefined && customFieldResults.length >= customFieldCount) {
			executeFunction();
			return true;
		}
		return false;
	}

	function waitForSpecification(specificationKey, callBack) {
		var timeToWait = 1000;
		var timeBetweenCheckIntervals = 10;
		waitForSpecificationExtended(callBack, specificationKey, timeToWait, timeBetweenCheckIntervals);
	}
	function waitForSpecificationExtended(executeFunction, specificationToWaitFor, timeToWait = 200, timeBetweenCheckIntervals = 10) {
	{
		setTimeout(function() {
			if (!ExecuteIfSpecificationLoaded(executeFunction, specificationToWaitFor) && timeToWait >= 0) {
				waitForSpecificationExtended(executeFunction, specificationToWaitFor, timeToWait-timeBetweenCheckIntervals);
			}
		}, timeBetweenCheckIntervals);
	}

	function ExecuteIfSpecificationLoaded(executeFunction, specificationToWaitFor, specificationCount = 1) {
	    var currentScope = angular.element(".main_content_area").scope();
	    var cartResults = currentScope?.model?.CartResults;
	    if (cartResults == undefined)
	    	return false;
	    if (cartResults.length == undefined || cartResults.length <= 0)
	    	return false;

	    var specificationResults = new Array();
	    for(var i=0; i<cartResults.length; i++)
	    {
	    	var currentSpecifications = cartResults[i].Specifications;
	    	if (currentSpecification==undefined)
	    		continue;
	    	if (currentSpecifications.length== undefined || currentSpecifications.length <= 0)
	    		continue;

	    	for(var ii=0; ii<currentSpecifications.length; ii++)
	    	{
	    		var currentSpecification = currentSpecifications[ii];
	    		if (currentSpecification==undefined)
	    			continue;

	    		if (currentSpecification.Key == specificationToWaitFor)
	    		{
	    			specificationResults.push(currentSpecification.Key);
	    		}
	    	}
	    }
		if (specificationResults != undefined && specificationResults.length >= specificationCount) {
			executeFunction();
			return true;
		}
		return false;
	}

	function waitForElement(elementQuery, callBack, elementCount = 1) {
		let timeToWait = 1000;
		let timeBetweenCheckIntervals = 10;
		waitForElementExtended(callBack, elementQuery, timeToWait, timeBetweenCheckIntervals, elementCount);
	}
	function waitForElementExtended(executeFunction, selectorToWaitFor, timeToWait = 200, timeBetweenCheckIntervals = 10, elementCount = 1) {
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
</script>