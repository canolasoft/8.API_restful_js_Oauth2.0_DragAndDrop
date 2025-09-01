<?php
    include 'main_top.html';
?>
<div id="inicio" class="px-4 pt-5 my-5 text-center">
    <main>
        <span id="usr_badge" class="badge bg-warning">
            <h3 id="usr_name"></h3>
        </span>
        <strong class="text-danger"> VS </strong>
        <span id="opponent_badge" class="badge bg-light">
            <h3 id="nombre_oponente"></h3>
        </span>
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
</div>

<?php
    include 'main_bot.html';
?>

    <script src="js/partida.js"></script>
    <script src="js/juego.js"></script>

</body>
</html>