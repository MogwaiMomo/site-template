# Motion Graphics Project
by Momoko Price, for IxD Essentials  

## PROJECT REQUIREMENTS 
1) To view this project locally, it needs to run on a web server (aka by opening up http://localhost:8000, etc., _not_ by opening index.html directly through your web browser). Without a web server, your browser will not allow the mp3 to run and the animation won't work. 

You can run a built-in web server through Python if you have Python installed on your computer. Simply navigate to the root folder of the project through the command line and type: 

$ python -m SimpleHTTPServer [press enter]

Alternatively, if running the project on localhost is not an option, you can [test a live version of the project on Github](http://mogwaimomo.github.io).

2) This project is best viewed on a desktop computer using a recent version of either Chrome or Firefox. While it has been laid out using a Responsive Grid System and is 100% resizable in the browser, its actual functionality has not been optimized for mobile yet (erm, or Safari/IE, for that matter. One step at a time!). 

## PROJECT FEATURES
This is my first real foray into JavaScript and HTML5. I didn't use any jQuery as I really wanted to get comfortable with low-level JS syntax and understand how it works. 

It might seem like the project's just one long animation from start to end, but it's actually a series of animations strung together and timed to fire in sequence. 

### The animations, in chronological order

1. Introductory text fades in on page load (CSS animation)
2. Introductory text fades out on user click (CSS animation)
3. HTML canvas "scrolls down" on user click ([RequestAnimationFrame](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) JS method)
4. Instructional copy appears once canvas has finished scrolling (JS-timed CSS animation)
5. "Dancing bar chart" animation begins once music starts playing (RequestAnimationFrame method again, this time connected to a HTML5 Audio API object - this is all JS). 
6. Canvas & instructional text disappears upon 2 events: if the user clicks the canvas to stop, or the mP3 finishes playing. (JS-timed CSS animation)
7. Final credits appear upon 2 events: if the user clicks the canvas to stop, or the mP3 finished playing. (JS-timed CSS animation, including some removal/addition of elements to the DOM.)

**Questions?** Email momoko@copy-cat.co :)


