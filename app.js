const state = {
    rowIndex: 0,
    columnIndex: 0,
    guesses: [[], [], [], [], [], []],
    targetWord: 'SKILL'
};

const addKeyListeners = () => {
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
    if (isAlphabet(key)) {
        if (state.guesses[state.rowIndex].length !== 5) {
            state.guesses[state.rowIndex].push(key.toUpperCase());
            document.getElementById(`tile_${state.rowIndex}${state.columnIndex}`).textContent = key.toUpperCase();
            state.columnIndex += 1;
        }
    } else if (key.toLowerCase() === 'enter' && state.guesses[state.rowIndex].length === 5) {
        compareGuess();
        state.rowIndex += 1;
        state.columnIndex = 0;
    } else if (key.toLowerCase() === 'backspace' && state.columnIndex !== 0) {
        state.columnIndex -= 1;
        state.guesses[state.rowIndex].pop()
        console.log(state.guesses[state.rowIndex])
        document.getElementById(`tile_${state.rowIndex}${state.columnIndex}`).textContent = '';
    }
}

const compareGuess = () => {
    let correctCount = 0;

    const { guesses, targetWord, rowIndex } = state;
    guesses[rowIndex].forEach((letter, index) => {
        if (letter === targetWord.charAt(index)) {
            document.getElementById(`tile_${rowIndex}${index}`).style.backgroundColor = '#538D4E';
            document.getElementById(`key_${letter}`).style.backgroundColor = '#538D4E';
            correctCount += 1;
        } else if (targetWord.indexOf(letter) > -1) {
            document.getElementById(`tile_${rowIndex}${index}`).style.backgroundColor = '#D8D508';
            document.getElementById(`key_${letter}`).style.backgroundColor = '#D8D508';
        } else {
            document.getElementById(`tile_${rowIndex}${index}`).style.backgroundColor = '#BE3535';
            document.getElementById(`key_${letter}`).style.backgroundColor = '#BE3535';
        }
    });
    if (correctCount === 5) {
        document.getElementsByClassName('overlay')[0].style.display = 'block';
        document.getElementById('modal-title').textContent = 'YOU WIN 😄';
    }
    if (correctCount !== 5 && state.rowIndex === 5) {
        document.getElementById('modal-title').textContent = 'YOU LOSE 😔';
        document.getElementsByClassName('overlay')[0].style.display = 'block';
    }
}

const isAlphabet = (key) => {
    return key.length < 2 && (/[A-Z]/).test(key.toUpperCase());
}

addKeyListeners();

