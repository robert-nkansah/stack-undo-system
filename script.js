const textInput = document.getElementById("textInput");
const saveBtn = document.getElementById("saveBtn");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");
const stackDisplay = document.getElementById("stackDisplay");
const stackCount = document.getElementById("stackCount");

// Stack for storing previous text states
let history = [];

// Get the current time, e.g. 8:16 AM
function getCurrentTime() {
    return new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

// Save the current text and its time
function saveState() {
    history.push({
        text: textInput.value,
        time: getCurrentTime()
    });

    message.textContent = "Text saved successfully.";
    displayStack();
}

// Restore the most recently saved state
function undo() {
    if (history.length === 0) {
        message.textContent = "Nothing to undo!";
        return;
    }

    const previousState = history.pop();

    textInput.value = previousState.text;

    message.textContent =
        "Restored text saved at " + previousState.time;

    displayStack();
}

// Clear the editor while saving its previous state
function clearText() {
    if (textInput.value.trim() !== "") {
        history.push({
            text: textInput.value,
            time: getCurrentTime()
        });

        textInput.value = "";
        message.textContent =
            "Text cleared at " + getCurrentTime();
    } else {
        message.textContent = "The editor is already empty.";
    }

    displayStack();
}

// Display saved states, newest first
function displayStack() {
    stackDisplay.innerHTML = "";

    if (history.length === 0) {
        stackDisplay.textContent = "Your stack is empty.";
    } else {
        for (let i = history.length - 1; i >= 0; i--) {
            const item = document.createElement("div");
            item.className = "stack-item";

            const text = document.createElement("div");

            text.textContent =
                (i === history.length - 1 ? "TOP — " : "") +
                (history[i].text || "(Empty text)");

            const time = document.createElement("small");
            time.textContent = history[i].time;

            item.appendChild(text);
            item.appendChild(time);

            stackDisplay.appendChild(item);
        }
    }

    stackCount.textContent = "Stack size: " + history.length;
    undoBtn.disabled = history.length === 0;
}

// Connect buttons to their functions
saveBtn.addEventListener("click", saveState);
undoBtn.addEventListener("click", undo);
clearBtn.addEventListener("click", clearText);

// Display the initial state
displayStack();