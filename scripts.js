$( document ).ready( function() {

    var app = function() {

        /**
         * canvas
         *
         * Selects canvas element via ID canvas.
         * Canvas holds our drawing pane.
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
         * Array holds x + y coordinates for rectangle
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
         * WASD, up left down right
         */
        var keys = [ [ 87, 38 ], [ 37, 65 ], [ 40, 83 ], [ 39, 68 ] ];

        /**
         * velocity
         *
         * Int that is used to modify x and y coordinates.
         */
        var velocity = 1;

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
         * Calculate Velocity
         *
         * Calculates velocity based on current velocity and whether keys are
         * currently pressed.
         *
         * @return int
         */
        function calcVelocity( e ) {
            if( e.type != 'keyup' ) {
                for( i = 0; i < 4; i ++ ) {
                    if( e.which == keys[0][i] || e.which == keys[1][i] ) { // If key is pressed
                        if( velocity < maxVelocity ) {
                            velocity ++;
                        }
                    }
                }
            } else {
                if( velocity > minVelocity ) {
                    velocity --;
                }
            }

            return velocity;
        }

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
         * Moves snake based on direction
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
         * Paint Rectangle
         *
         * Draws a rectangle onto the canvas when given x and y coords in an
         * array.
         *
         * @param array[x] : int
         * @param array[y] : int
         */
        function paintSnake( origin ) {
            draw.fillRect( origin[0], origin[1], 20, 20 );
        }

        /**
         * Speed
         *
         * The speed at which the tick() function is called. The higher the
         * speed value, the slower the 'ticks'.
         */
        function speed() {
            return 100;
        }

        /**
         * tick
         *
         * Everything that needs to go onto the canvas should be called in this
         * function. This is may possibly be changed in future.
         */
        function tick() {
            tock = true;
            draw.clearRect( 0, 0, canvas.width, canvas.height );

            $( document ).keydown( function( e ) {
                changeDirection( e );
            });

            moveHead( coords );
            paintSnake( coords );

            setTimeout( function() { tick() }, speed() );
        }

        return {

            init : function() {
                tick(); // Set clock ticking
            }

        };

    }();

    app.init();

});
