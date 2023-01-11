## dynamicwait
Dynamically wait for a wanted element to appear. Access it immediatly with a call back.
# Asynchronous Javascript has it's downsides.
It takes ages for elements to appear on the DOM and you can never truly know when they are loaded.
The worst way to work with this is using a native "setTimeout" function.
If the setTimeout call ends too early, the element might not be ready.
If the setTimeout call ends too late, the user is unimpressed with long load times.
The work around? Try the following:

waitForElement(".inputClass", function() {
  //instantaneous callback!
});

The above code will instantly look for an element with class "inputClass"
 and within 10 milliseconds of it appearing, the callback is ran.
 It's as simple as that, say goodbye to useless long "setTimeout"s!
