const number=37;
const array=[];
let isSorting = false; // Flag to track if sorting is in progress

for(let i=0;i<number;i++){
    array[i]=Math.random()*1.7; // store random number(0-1) in array every time.
}
showBars();

function restart(){
    stopAnimation = true; // Stop any ongoing animation
    for(let i=0;i<array.length;i++){
        array[i]=Math.random()*1.7; // store random number(0-1) in array every time.
    }
    showBars();
}

function playBubbleSort(){
    if (isSorting) return; // Prevent starting another sort if already sorting
    isSorting = true; // Set sorting flag to true
    const copy=[...array];
    const swaps=bubbleSort(copy);
    stopAnimation = false; // Allow new animation
    animate(swaps);
}

function playInsertionSort() {
    if (isSorting) return; // Prevent starting another sort if already sorting
    isSorting = true; // Set sorting flag to true
    const copy = [...array];
    const swaps = InsertionSort(copy);
    stopAnimation = false; // Allow new animation
    animate(swaps);
}

function playSelectionSort() {
    if (isSorting) return; // Prevent starting another sort if already sorting
    isSorting = true; // Set sorting flag to true
    const copy = [...array];
    const swaps = selectionSort(copy);
    stopAnimation = false; // Allow new animation
    animate(swaps);
}

function playMergeSort() {
    if (isSorting) return; // Prevent starting another sort if already sorting
    isSorting = true; // Set sorting flag to true
    const copy = [...array];
    const swaps = mergeSort(copy);
    stopAnimation = false; // Allow new animation
   animateMerge(swaps);
}



function animate(swaps){
    if (stopAnimation || swaps.length === 0) {
        showBars(); //to remove the yellow bar as we are not giving any parameter if will check if(index && index.includes(i))
        isSorting = false;
        return;
    }

    const [i,j]=swaps.shift();
    let temp;
    [array[i],array[j]]=[array[j],array[i]];
    
    playNote(array[i] *500);
    playNote(array[j]*100 / 40);

    showBars([i,j]);
    setTimeout(function(){
        animate(swaps);
    },67);
}


//for merge only
function animateMerge(swaps) {
    if (stopAnimation || swaps.length === 0) {
        showBarsMerge(); // to remove the yellow bar as we are not giving any parameter if will check if(index && index.includes(i))
        isSorting = false;
        return;
    }

    const [k, i, j, newValue] = swaps.shift();
    array[k] = newValue;

    playNote(array[k] *500);
    playNote(array[k]*100 / 40);
    

    showBarsMerge(k, i, j);
    setTimeout(function () {
       animateMerge(swaps);
    }, 80);
}

function showBars(index){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");

        if(index && index.includes(i)){
            bar.style.backgroundColor="yellow";
        }
        container.appendChild(bar);
    }
}

//for merge only
function showBarsMerge(k, i, j) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    for (let index = 0; index < array.length; index++) {
        const bar = document.createElement("div");
        bar.style.height = array[index] * 100 + "%";
        bar.classList.add("bar");

        if (index === k) {
            bar.style.backgroundColor = "yellow";
        } else if (index === i) {
            bar.style.backgroundColor = "red";
        } else if (index === j) {
            bar.style.backgroundColor = "white";
        } else {
            bar.style.backgroundColor = "#1388f5";
        }

        container.appendChild(bar);
    }
}


let audio=null;
function playNote(freq){
    if(audio==null){
        audio=new(
            AudioContext || webkitAudioContext )();
    }
    const dur=.1;    // duration of the node
    const osc=audio.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audio.currentTime+dur);
    const node=audio.createGain();
    node.gain.value=0.1;
    osc.connect(node);
    node.connect(audio.destination)
}



    //bubble sorting
    function bubbleSort(array){
        const swaps=[];
        do{
            var swapped = false;
            for(let i=1;i<array.length;i++){
                if(array[i-1]>array[i]){
                    swapped=true;
                    swaps.push([i-1,i]); // to show which element is swaped or sorted
                    let temp;                    
                    temp=array[i-1];
                    array[i-1]=array[i];
                    array[i]=temp;
                    }
            }
        }while(swapped);
        return swaps;
    }
    
    
    // Insertion sorting
    function InsertionSort(array) {
        const swaps = [];
        for (let i = 1; i < number; i++) { // Start from 1 since the first element is considered sorted
            let current = array[i]; // Store the current element
            let j = i - 1;
    
            // Shift elements of the sorted portion to the right if they are greater than the current element
            while (j >= 0 && array[j] > current) {
                array[j + 1] = array[j];
                swaps.push([j + 1, j]);
                j--;
                
            }
            array[j + 1] = current; // Insert the current element into its correct position
        }
        return swaps;
    }

    
    //Selection sorting
    function selectionSort(array) {
        const swaps = [];
        const n = array.length;
    
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }
    
            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                swaps.push([i, minIndex]);
            }
        }
    
        return swaps;
    }


    // Merge sort
    function mergeSort(array) {
        const swaps = [];
        if (array.length < 2) return swaps;
        const auxiliaryArray = array.slice();
        mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, swaps);
        return swaps;
    }

    function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, swaps) {
        if (startIdx === endIdx) return;
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, swaps);
        mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, swaps);
        doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, swaps);
    }

    function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, swaps) {
        let k = startIdx;
        let i = startIdx;
        let j = middleIdx + 1;

        while (i <= middleIdx && j <= endIdx) {
            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                swaps.push([k, i, j, auxiliaryArray[i]]);
                mainArray[k++] = auxiliaryArray[i++];
            } else {
                swaps.push([k, i, j, auxiliaryArray[j]]);
                mainArray[k++] = auxiliaryArray[j++];
            }
        }
        while (i <= middleIdx) {
            swaps.push([k, i, j, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx) {
            swaps.push([k, i, j, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    