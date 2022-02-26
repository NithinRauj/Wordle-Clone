const words = [
    'ADIEU',
    'ACUTE',
    'ARISE',
    'AUDIO',
    'AHEAD',
    'ALLOW',
    'ARGUE',
    'BREAK',
    'BRIEF',
    'BAKER',
    'COLOR',
    'COUNT',
    'CLAIM',
    'DELAY',
    'DOING',
    'DREAM',
    'DRESS',
    'ELDER',
    'EIGHT',
    'EQUAL',
    'EXACT',
    'FAITH',
    'FINAL',
    'FRAME',
    'FIELD',
    'GRADE',
    'GRANT',
    'GLOBE',
    'HUMOR',
    'HEART',
    'HOUSE',
    'IDEAS',
    'INDEX',
    'INPUT',
    'JUDGE',
    'LIVES',
    'MAGIC',
    'MAJOR',
    'NOISE',
    'ORDER',
    'PIECE',
    'QUITE',
    'REACT',
    'SOARE',
    'SOUND',
    'TEAMS',
    'THOSE',
    'WATER',
    'WASTE',
    'YOUNG'
];

const state = {
    rowIndex: 0,
    columnIndex: 0,
    guesses: [[], [], [], [], [], []],
    targetWord: words[Math.floor(Math.random() * words.length)],
    streak: 0,
    plays: 0,
    canType: true
};

const addKeyListeners = () => {
    console.log(state.targetWord);
    const arr = Array.from(document.getElementsByClassName('key'))
    for (let index = 0; index < arr.length; index++) {
        arr[index].addEventListener('click', (e) => {
            inputGuess(arr[index].id.split('_')[1]);
        });
    }
}

window.addEventListener('keydown', (e) => {
    inputGuess(e.key);
});

const inputGuess = (key) => {
    if (!state.canType) {
        return;
    }
    if (isAlphabet(key)) {
        if (state.guesses[state.rowIndex].length !== 5) {
            state.guesses[state.rowIndex].push(key.toUpperCase());
            document.getElementById(`tile_${state.rowIndex}${state.columnIndex}`).textContent = key.toUpperCase();
            document.getElementById(`tile_${state.rowIndex}${state.columnIndex}`).classList.add('shake-tile');
            state.columnIndex += 1;
        }
    } else if (key.toLowerCase() === 'enter' && state.guesses[state.rowIndex].length === 5) {
        compareGuess();
    } else if (key.toLowerCase() === 'backspace' && state.columnIndex !== 0) {
        state.columnIndex -= 1;
        state.guesses[state.rowIndex].pop()
        console.log(state.guesses[state.rowIndex])
        document.getElementById(`tile_${state.rowIndex}${state.columnIndex}`).textContent = '';
    }
}

const compareGuess = () => {
    let correctCount = 0;
    state.canType = false;
    const { guesses, targetWord, rowIndex } = state;

    guesses[rowIndex].forEach((letter, index) => {
        const tile = document.getElementById(`tile_${rowIndex}${index}`);
        tile.classList.remove('shake-tile');
        const key = document.getElementById(`key_${letter}`);
        if (letter === targetWord.charAt(index)) {
            setTimeout(() => {
                tile.classList.add('rotate-tile');
                tile.style.backgroundColor = '#538D4E';
                key.style.backgroundColor = '#538D4E';
            }, 500 * index);
            correctCount += 1;
        } else if (targetWord.indexOf(letter) > -1) {
            setTimeout(() => {
                tile.classList.add('rotate-tile');
                tile.style.backgroundColor = '#D8D508';
                key.style.backgroundColor = '#D8D508';
            }, 500 * index);
        } else {
            setTimeout(() => {
                tile.classList.add('rotate-tile');
                tile.style.backgroundColor = '#BE3535';
                key.style.backgroundColor = '#BE3535';
            }, 500 * index);
        }
    });
    setTimeout(() => {
        if (correctCount === 5) {
            document.getElementById('modal-title').textContent = 'YOU WIN 😄';
            document.getElementById('target-word').textContent = state.targetWord;
            document.getElementById('streak-count').textContent = `${state.streak}`;
            document.getElementById('plays-count').textContent = `${state.plays}`;
            document.getElementsByClassName('overlay')[0].style.display = 'block';

            state.canType = false;
        } else if (correctCount !== 5 && state.rowIndex === 5) {
            document.getElementById('modal-title').textContent = 'YOU LOSE 😔';
            document.getElementById('target-word').textContent = state.targetWord;
            document.getElementById('streak-count').textContent = `${state.streak}`;
            document.getElementById('plays-count').textContent = `${state.plays}`;
            document.getElementsByClassName('overlay')[0].style.display = 'block';
            state.canType = false;
        } else {
            state.canType = true;
        }
        state.rowIndex += 1;
        state.columnIndex = 0;
    }, 2100);
}

const isAlphabet = (key) => {
    return key.length < 2 && (/[A-Z]/).test(key.toUpperCase());
}

addKeyListeners();

