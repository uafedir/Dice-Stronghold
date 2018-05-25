$(function () {

    $('#window').on('mouseenter', '.choose-dices.active .dice', highlightSelection);
    $('#window').on('mouseleave', '.choose-dices.active .dice', dehighlightSelection);

    $('#window').on('click', '.choose-dices.active .dice', runRandom);

    function highlightSelection() {
        const dice = $(this);
        const number = dice.data('number');
        const player = dice.data('player');
        const diceset = dice.prevAll().add(dice);
        diceset.addClass('highlighted');
    }

    function dehighlightSelection() {
        const diceset = $('.choose-dices.active .dice');
        diceset.removeClass('highlighted');
    }

    function runRandom() {
        const dice = $(this);
        const number = dice.data('number');
        const player = dice.data('player');
        const result = generateRandom(number);
        dehighlightSelection();
        showResult(player, result);
        changePlayer(player);
    }

    function generateRandom(number) {
        let result = [];
        for (let i = 0; i < number; i++) {
            result[i] = Math.floor(Math.random() * 6 + 1);
        }
        return result;
    }

    function showResult(player, faces) {
        const timeline = $('#timeline');
        let res = '';
        res += '<div class="result-line player-' + player + '">';
        res += '<div class = "result-dices">';
        for (let i = 0; i < faces.length; i++) {
            let type;
            switch (faces[i]) {
                case 1:
                    type = 'sword-2';
                    break;
                case 2:
                    type = 'sword-1';
                    break;
                case 3:
                    type = 'empty';
                    break;
                case 4:
                    type = 'scull';
                    break;
                case 5:
                    type = 'sword-1';
                    break;
                default:
                    type = 'sword-2';
                    break;
            }
            res += '<div class="dice ' + type + '"></div>';
        }
        res += '</div>';
        res += '</div>';
        timeline.prepend(res);
    }

    function changePlayer(player) {
        switch (player) {
            case 1:
                $('#player-1-panel .choose-dices').removeClass('active').addClass('wait');
                $('#player-2-panel .choose-dices').addClass('active').removeClass('wait');
                break;

            case 2:
                $('#player-2-panel .choose-dices').removeClass('active').addClass('wait');
                $('#player-1-panel .choose-dices').addClass('active').removeClass('wait');
                break;
        }
    }

});