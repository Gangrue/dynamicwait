function onAnyChange(source, inputHandler) {	
	source.addEventListener('input', inputHandler);
	source.addEventListener('propertychange', inputHandler); // for IE8
	source.addEventListener('paste', inputHandler);
	source.addEventListener('click', inputHandler);
}