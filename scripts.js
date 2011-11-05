$( document ).ready( function() {

    var snake = function() {

        /**
         * canvas
         *
         * Selects canvas element via ID canvas.
         * Canvas holds our drawing plane.
         *
         * @type DOM object
         */
        var canvas = document.getElementById( 'canvas' );

        /**
         * draw
         *
         * The drawing plane for canvas. This is what we manipulate when
         * drawing/clearing stuff. Example:
         *
         *      draw.fillRect( 20, 20, 100, 100 );
         *
         *      Draws a rectangle at x:20, y:20 with a width of 100px and a height
         *      of 100px.
         */
        var draw = canvas.getContext( '2d' );

        /**
         * coordinates
         *
         * Array holds x + y coordinates for snake's head
         */
        var coords = new Array();
        coords[0] = 0;
        coords[1] = 0;

        /**
         * tock
         *
         * Bool that helps keep track of whether coords have been modified but
         * tick hasn't updated yet.
         */
        var tock = true;

        /**
         * keys
         *
         * Array holds a list of keycodes
         *
         * [ w, up arr ], [ a, left arr ], [ s, down arr ], [ d, right arr ]
         */
        var keys = [ [ 87, 38 ], [ 37, 65 ], [ 40, 83 ], [ 39, 68 ] ];

        /**
         * direction
         *
         * String keeps track of direction.
         *
         * Up    : 'up'
         * Left  : 'left'
         * Down  : 'down'
         * Right : 'right'
         *
         */
        var direction = 'right';

        /**
         * length
         *
         * Int refers to length of snake. Is incremented by single integers
         */
        var length = 1;

        /**
         * segments
         *
         * Array used to keep track of the number of body segments the snake
         * has.
         */
        var segments = new Array();
        segments.push( '1' ); // Initial body
        segments.push( '2' ); // Initial body

        /**
         * tick speed
         *
         * Int controls how fast the game "ticks". Default is 100.
         */
        var tickSpeed = 100;

        /**
         * fruit exists
         *
         * If fruit exists: bool should be true.
         */
        var fruitExists = false;

        /**
         * fruit coordinates
         *
         * Array contains the fruit's coordinates.
         *
         * @values array[ x, y ];
         */
        var fruitCoords = new Array();

        /**
         * Change Direction
         *
         * Modifies direction based on key press. Only listens to one keypress
         * per tock (reset in tick()).
         *
         * @access private
         */
        function changeDirection( e ) {
            if( tock ) {

                if( e.which == keys[0][0] || e.which == keys[0][1] ) { // Up
                    direction = 'up';
                } else if( e.which == keys[1][0] || e.which == keys[1][1] ) { // Left
                    direction = 'left';
                } else if( e.which == keys[2][0] || e.which == keys[2][1] ) { // Down
                    direction = 'down';
                } else if( e.which == keys[3][0] || e.which == keys[3][1] ) { // Right
                    direction = 'right';
                }

                tock = false;
            }
        }

        /**
         * Move Snake
         *
         * Moves snake's head based on direction. Also moves snake's head to the
         * other side of the canvas if new coordinates cause it to go off
         * screen.
         *
         * @access private
         * @param array[x, y]
         */
        function moveHead( origin ) {
            var moveDistance = 10;

            if( direction == 'up' ) {
                origin[1] -= moveDistance;
            } else if( direction == 'left' ) {
                origin[0] -= moveDistance;
            } else if( direction == 'down' ) {
                origin[1] += moveDistance;
            } else if( direction == 'right' ) {
                origin[0] += moveDistance;
            }

            // Reset snakes head if it has gone out of bounds
            if( origin[0] < 0 ) {
                origin[0] = canvas.width - moveDistance;
            } else if( origin[0] > canvas.width ) {
                origin[0] = 0; // No need to add moveDistance because head is drawn from topLeft
            }

            if( origin[1] < 0 ) {
                origin[1] = canvas.height - moveDistance;
            } else if( origin[1] > canvas.height ) {
                origin[1] = 0; // No need to add moveDistance because head is drawn from topLeft
            }
        }

        /**
         * Paint Snake
         *
         * Draws rectangle(s) onto the canvas when given x and y coords in an
         * array.
         *
         * @access private
         * @param array[x, y]
         */
        function paintSnake( origin ) {
            // head
            draw.fillStyle = "orange";
            draw.fillRect( origin[0], origin[1], 20, 20 );

            draw.fillStyle = "blue";
            for( i = 1; i <= segments.length; i++ ) {

                if( direction == 'up' ) {
                    draw.fillRect( origin[0], origin[1] + i * 20, 20, 20 );
                } else if( direction == 'left' ) {
                    draw.fillRect( origin[0] + i * 20, origin[1], 20, 20 );
                } else if( direction == 'right' ) {
                    draw.fillRect( origin[0] - i * 20, origin[1], 20, 20 );
                } else if( direction == 'down' ) {
                    draw.fillRect( origin[0], origin[1] - i * 20, 20, 20 );
                }
            }
        }

        /**
         * Hit Check
         *
         * Checks whether snake's head and fruit are hitting each other
         */
        function hitCheck( coords, fruitCoords ) {
            var oneHit = coords[0] < fruitCoords[0] ? coords : fruitCoords;
            var twoHit = coords[0] < fruitCoords[0] ? fruitCoords : coords;

            return oneHit[1] > twoHit[0] || oneHit[0] === twoHit[0] ? true : false;
        }

        /**
         * Fruit Handler
         *
         * Function checks whether snake has eaten fruit and calls generation of
         * fruit when it there is no fruit on page.
         */
        function fruitHandler() {
            if( ! fruitExists ) {
                generateFruit();
            } else {
                draw.fillStyle = "green"; // It's an apple!
                draw.fillRect( fruitCoords[0], fruitCoords[1], 20, 20 );
            }

            var snakeHead = [ [ coords[0], coords[0] + 20 ], [ coords[1], coords[1] + 20 ] ];
            var fruit = [ [ fruitCoords[0], fruitCoords[0] + 20 ], [ fruitCoords[1], fruitCoords[1] + 20 ] ];

            var hitX = hitCheck( snakeHead[0], fruit[0] );
            var hitY = hitCheck( snakeHead[1], fruit[1] );

            var hit = hitX && hitY;

            if( hit ) {
                draw.clearRect( fruitCoords[0], fruitCoords[1], 20, 20 );
                fruitExists = false;
                segments.push( toString( segments.length + 1 ) );
                if( tickSpeed > 40 ) {
                    tickSpeed -= 10;
                }
            }
        }

        /**
         * Generate Fruit
         *
         * Generates fruit at a random location in the canvas.
         */
        function generateFruit() {
            var x = Math.floor( Math.random() * ( canvas.width + 1 ) );
            var y = Math.floor( Math.random() * ( canvas.height + 1 ) );

            // Record new coordinates
            fruitCoords[0] = x;
            fruitCoords[1] = y;

            draw.fillStyle = "green"; // It's an apple!
            draw.fillRect( x, y, 20, 20 );

            fruitExists = true;
        }

        /**
         * Speed
         *
         * The speed at which the tick() function is called. The higher the
         * speed value, the slower the 'ticks'.
         */
        function speed() {
            return tickSpeed;
        }

        /**
         * tick
         *
         * This acts as the game loop. If it's in the game, it's called here.
         */
        function tick() {
            tock = true;
            draw.clearRect( 0, 0, canvas.width, canvas.height );

            $( document ).keydown( function( e ) {
                changeDirection( e );
            });

            moveHead( coords );
            paintSnake( coords );
            fruitHandler();

            setTimeout( function() { tick() }, speed() );
        }

        return {

            /**
             * Init
             *
             * Accessed via snake.init(), this function is a handle for the
             * snake namespace
             */
            init : function() {
                tick(); // Set clock ticking
            }

        };

    }();

    snake.init();

});
