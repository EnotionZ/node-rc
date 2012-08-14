I know JavaScript is a terrible language to do this in, it's just a proof of concept, stfu.

## Usage

#####From the command line
```js
$: git clone git://github.com/EnotionZ/node-rc.git
```

#####Inside js file
```js
var rc = require("./node-rc").init({

      pinRight: GPIO_HEADER_FOR_RIGHT_TURN,
      pinLeft: GPIO_HEADER_FOR_LEFT_TURN,
      pinBackward: GPIO_HEADER_FOR_DRIVING_BACKWARD,
      pinForward: GPIO_HEADER_FOR_DRIVING_FORWARD,

      // place code to fire when headers are ready
      ready: function() {

            // driving
            rc.drive("forward");
            rc.drive("backward");
            rc.stop();

            // steering
            rc.turn("left");
            rc.turn("right");
            rc.straight();

            // shortcuts
            rc.drive("f");    // drive forward
            rc.drive("b");    // drive backward
            rc.drive();       // stops driving
            rc.turn("l");     // turn left
            rc.turn("r");     // turn right
            rc.turn();        // straighten wheels

            // When done, unexport the headers
            rc.end(function() {
                  // Fire callback once all headers export
                  process.exit();
            });
      }
});
```