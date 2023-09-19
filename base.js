class TakeaGuess {
    constructor() {
        this.scoreTip = document.getElementById('scoreTip');
        this.ins = document.getElementById('ins');
        this.btnSubmit = document.getElementById('btnSubmit');
        this.friendlyReminder = document.getElementById('friendlyReminder');
        this.gameResult = document.getElementById('gameResult');
        this.resultContainer = document.getElementById('resultContainer');
        this.scW = document.getElementById('sw');
        this.total;
        this.wordsList;
        this.word;
    }

    initGame() {
        this.scoreTip.innerText = 'Start Now';
        this.ins.value = '';
        this.total = 10;
        this.friendlyReminder.innerText = '';
        this.gameResult.innerText = '';
        this.resultContainer.className = 'item item-6';
        this.wordsList = this.readCSV();
        this.word = this.chooseRandomWord(words);
        this.scW.innerText = this.scrambleWord(word);
        console.log(this.gameNumber);
        this.gameEvent();
    }

    readCSV() {
        const fs = require('fs');
        
        const fileContent = fs.readFileSync('../english-words.csv', 'utf-8');

        const lines = fileContent.split('\n');

        const words = [];

        lines.forEach(function (line) {
            const word = line.trim();
            words.push(word);
        });

        return words;
    }

    chooseRandomWord(words) {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    scrambleWord(word) {
        var letters = word.split('');

        for (var i = letters.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = letters[i];
            letters[i] = letters[j];
            letters[j] = temp;
        }

        var scrambledWord = letters.join('');
        return scrambledWord;
    }

    judgeUserInp() {
        let val = this.ins.value;
        if (val != this.word) {
            this.this.notEqualForNum();;
        } else {
            this.equalWord();
        }
    }

    equalWord() {
        this.total--;
        let resNum = 10 - this.total;
        this.friendlyReminder.innerText = 'You are right';
        this.scoreTip.innerText = `You have ${this.total} opportunities`;
        this.winGame();
    }

    notEqualWord() {
        if (this.total <= 1) {
            this.gameOver();
        }
        this.total--;
        this.friendlyReminder.innerText = 'You are wrong';
        this.scoreTip.innerText = `You have ${this.total} opportunities.`;
    }

    gameOver() {
        this.resultContainer.classList.add('failure');
        this.gameResult.innerText = `Game Over`;
        this.playAgain();
    }

    winGame() {
        let resNum = 10 - this.total;
        this.resultContainer.classList.add('win');
        this.gameResult.innerText = `You are amazing, you used ${resNum} opportunities`;
        this.playAgain();
    }

    playAgain() {
        setTimeout(() => {
            let val = confirm('again?');
            if (val) {
                this.initGame();
            }
        }, 1);
    }

    gameEvent() {
        this.btnSubmit.onclick = () => {
            this.judgeUserInp();
        };
    }
};


(() => {
    document.getElementById('btnAction').onclick = () => {
        var takeaGuess = new TakeaGuess();
        takeaGuess.initGame();
    }
})();