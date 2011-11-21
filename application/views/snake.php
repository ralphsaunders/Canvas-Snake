<canvas id="canvas" width="400" height="300"></canvas>

<div id="score">
    <div style="display: inline;">Score:</div>
    <div id="count" style="display: inline;">0</div>
    <br>
    <div style="display: inline;">High Score:</div>
    <div id="high-score" style="display: inline;">0</div>
</div>

<h1>Use your WASD or arrow keys to move</h1>

<?php if( isset( $scores ) ) : ?>
<ul id="score-board">
<?php foreach( $scores as $score ) : ?>
<li><span class="name"><?php echo $score->name; ?></span> scored <span class="score" name="<?php echo $score->name; ?>"><?php echo $score->score; ?></span> points</li>
<?php endforeach; ?>
</ul>
<?php else : ?>
<h3>No one has entered in their scores yet</h3>
<?php endif; ?>
