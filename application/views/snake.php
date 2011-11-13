<canvas id="canvas" width="1000" height="500"></canvas>

<div id="score">
    <div style="display: inline;">Score:</div>
    <div id="count" style="display: inline;">0</div>
    <br>
    <div style="display: inline;">High Score:</div>
    <div id="high-score" style="display: inline;">0</div>
</div>

<h1>Use your WASD or arrow keys to move</h1>

<?php if( isset( $scores ) ) : ?>
<ul>
<?php foreach( $scores as $score ) : ?>
<li><?php echo $score->name; ?> scored <?php echo $score->score; ?> points</li>
<?php endforeach; ?>
</ul>
<?php else : ?>
<h3>No one has entered in their scores yet</h3>
<?php endif; ?>
