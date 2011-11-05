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
