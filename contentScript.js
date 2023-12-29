const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args); 
        }, wait);
    };
};

function containsForbiddenWords(value) {
    return forbiddenWords.some(words => value.toLowerCase().includes(words.toLowerCase()));
}

function updateUI(target) {
    const containsForbiddenWord = containsForbiddenWords(target.value);
    const sendButton = target.nextElementSibling;
    const parentDiv = target.parentElement;

    if (containsForbiddenWord) {
        sendButton.disabled = true;
        parentDiv.classList.add('forbidden-div');
    } else {
        sendButton.disabled = false;
        parentDiv.classList.remove('forbidden-div');
    }
}

document.body.addEventListener('keyup', debounce((event) => {
    if (event.target.id === 'prompt-textarea') updateUI(event.target);
}, 300));

document.addEventListener('keydown',(e) => {
    if(e.target.id === 'prompt-textarea' && e.key === 'Enter') {
        if (containsForbiddenWords(e.target.value)) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}, true);

document.body.addEventListener('paste',function (event) {
    const clipboardData = evwnt.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('Text').trim();

    if (containsForbiddenWords(pastedText)) {
        event.stopPropagation();
        event.preventDefault();
    }
});


