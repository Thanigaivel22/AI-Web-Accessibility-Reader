let hoverTimeout = null;
let currentSpeech = null;

function describeElement(element) {
    if (!element) return "";

    let role = element.getAttribute("role");
    let ariaLabel = element.getAttribute("aria-label");
    let title = element.getAttribute("title");
    let tag = element.tagName.toLowerCase();
    let text = element.innerText?.trim();

    let description = "";

    if (ariaLabel) {
        description += ariaLabel + ". ";
    } else if (title) {
        description += title + ". ";
    } else if (text && text.length < 80) {
        description += text + ". ";
    }

    if (tag === "button" || role === "button") {
        description += "This is a button. Clicking it performs an action.";
    }

    if (tag === "a") {
        description += "This is a link. Clicking it will navigate to another page.";
    }

    if (tag === "input") {
        description += "This is an input field. You can type information here.";
    }

    if (!description) return "";

    return description;
}

function speak(text) {
    stopSpeech();
    currentSpeech = new SpeechSynthesisUtterance(text);
    currentSpeech.rate = 1;
    speechSynthesis.speak(currentSpeech);
}

function stopSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
}

document.addEventListener("mouseover", (event) => {
    clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(() => {
        let element = event.target;
        let description = describeElement(element);

        if (description) {
            speak(description);
        }
    }, 800); // 800ms delay so it doesn’t spam while moving
});