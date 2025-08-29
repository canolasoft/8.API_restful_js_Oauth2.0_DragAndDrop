<?php
    include 'main_top.html';
?>
    <main>
        <p>Turno: <span id="turno"></span></p>
        <div class="msg-container hide">
            <p id="msg">Winner</p>
        </div>
        <div>
            <div id="fichaO" class="draggable" draggable="true">O</div>
            <div id="fichaX" class="draggable" draggable="true">X</div>
        </div>
        <div class="container">
            <div class="game">
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
            </div>
        </div>
        <button id="reset">Reset Game</button>
    </main>

    <script src="js/juego.js"></script>

<?php
    include 'main_bot.html';
?>

</body>
</html>