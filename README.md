
## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer:- Below the differences:-
getElementById() 
it selects one element by id and returns a single element.

getElementsByClassName() 
it selects elements by class name and returns an HTMLCollection.

querySelector() 
it selects the first matching element using a CSS selector.

querySelectorAll() 
it selects all matching elements using a CSS selector and returns a NodeList.


we can use foreach in querySelector which returns a arraylike object nodelist.
but we cannot use getElementsByClassName()  beacuse it returns a arraylike object HTMLCollection.

CSS selector are more flexible
getElementById is faster.


### 2. How do you create and insert a new element into the DOM?
Answer:
First we create an element ----> document.createElement().

Second we add content ------>using innerText or innerHTML.

Finally insert it ------>using appendChild() or append().



### 3. What is Event Bubbling? And how does it work?
Answer:
Event Bubbling is a mechanism in the DOM where an event starts at the target element (the element on which the event occurred) and then propagates upward through its parent elements in the hierarchy until it reaches the root (document).


Example:-If a button is inside a div in a section and you click the button, the event first runs on the button, then on the div,then the section, then on the body.


### 4. What is Event Delegation in JavaScript? Why is it useful?
Answer:
Event Delegation is a technique where an event listener is added to a parent element instead of adding separate listeners to each child element. When a child element is clicked, the event bubbles up to the parent, and the parent handles the event.
it is usefull because--
1.it reduces memory usage . Here fewer event listeners are attached.

2.it handles dynamic elements and works for elements added to the DOM later.

3.it simplifies code and make easier to manage one listener on the parent than many on children.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
Answer:
preventDefault() 
–--this method prevents the browser’s default action for an event, without stopping the event from propagating.
Example: Preventing a link from navigating:
stopPropagation() 
----this method stops the event from bubbling (or capturing) to ancestor elements. It does not prevent the default browser behavior.
Example: Stopping click from bubbling:
