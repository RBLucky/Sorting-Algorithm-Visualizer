const n = 30;
const array = [];

init();

let audioContext = null;

function playNote(freq) {
    if (audioContext == null) {
        audioContext = new(AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }
    const duration = 0.1;
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = freq;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
    const node = audioContext.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration)
    oscillator.connect(node);
    node.connect(audioContext.destination);
}

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function play() {
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length == 0) {
        showBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;

    if (move.type == "swap"){
        [array[i], array[j]] = [array[j], array[i]];
    }


    playNote(200 + array[i] * 500);
    playNote(200 + array[j] * 500);

    showBars(move);
    setTimeout(function(){
        animate(moves);
    }, 100);
}

function bubbleSort(array) {
    const moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            //moves.push({indices:[i-1,i], type: "comp"});
            if (array[i - 1] > array[i]) {
                swapped = true;
                moves.push({indices:[i-1,i], type: "swap"});
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    return moves;
}

function showBars(move) {
    container.innerHTML="";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = 
                move.type == "swap"?"red":"blue";
        }
        container.appendChild(bar);
    }
}

//(21:23)
//.createElement()
//.appendChild()
//.classList.add()
//destructuring assignment
//.shift()
//setTimeout()
//[...array]
//.includes()
//ternary operator ?: