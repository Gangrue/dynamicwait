# dynamicwait
Dynamically wait for a wanted element to appear. Access it immediatly with a call back.

## Installation:
Copy paste the code at https://gangrue.github.io/dynamicwait/dynamicwait.js, and include it in javascript.


## Asynchronous Javascript has it's downsides.
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

# onanychange
Quickly make objects reactive to many different input types
## Different elements have different triggering events
Naive programmers will try to add useless events to elements.
To quickly avoid overcomplicating this stumbling block, developers can use
 the following:

onAnyChange(".inputClass", function() {
  //Calls this function on any type of change!
});

Reactively called on click, input, keyup, paste, etc!!
To further use this functionality, you can duplicate the events onto another
element by doing the following:

copyChangeEvents(".inputClass", ".inputClass2");

Now all triggerable events on ".inputClass" react the same way on ".inputClass2"

Finally, let's say you have an input that needs to trigger an event on another reacting input.
Use this:

linkChangeEvents(".inputClass", ".inputClass2");

This function will trigger any event on ".inputClass2" when ".inputClass" completes the action.
For example. If ".inputClass2" disappears on click, you can linkChangeEvents and have the click of 
 ".inputClass" make ".inputClass2" disappear as if it had been clicked.
 Beware of this function however, if linkChangeEvents and copyChangeEvents are called consecutively,
  the events may begin an infinite casade of triggers.
