qpversion = "2026.1 Pre-Release";

/*
Theme keys:
name
text (Notepad text color)
back (Notepad background)
bg (Background)
*/
themes = [
  {
    name: "Light",
    text: "#000",
    back: "#ddd",
      bg: "rgba(0,0,0,0.8)"
  },
  {
    name: "Dark",
    text: "#fff",
    back: "#222",
      bg: "rgba(0,0,0,0.8)"
  },
  {
    name: "Onyx",
    text: "#fff",
    back: "#000",
      bg: "rgba(0,0,0,1)"
  },
];

arts = {
  shrug: "¯\\_(ツ)_/¯",
  lenny: "( ͡° ͜ʖ ͡°)",
  yay: "\\ (•◡•) /",
  tableflip: "(╯°□°）╯︵ ┻━┻",
  tableflipmax: "┻━┻︵ \\(°□°)/ ︵ ┻━┻ ",
  unflip: "┏━┓ ︵ /(^.^/)",
    dance: "♪└(⊙ಎ⊚)┐♪",
    bob: "(･ิ_･ิ)"
};


// Main panel
panel = document.createElement("div");
panel.style.borderRadius = "10px";
panel.style.width = "500px";
panel.style.height = "500px";
panel.style.backgroundColor = "rgba(0,0,0,0.8)";
panel.style.border = "5px solid rgba(0,0,0,0.5)";
panel.style.position = "fixed";
panel.style.zIndex = "99999999";
panel.style.top = "2%";
panel.style.left = "2%";
panel.style.transition =
  "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s";
panel.style.opacity = "0";
panel.style.visibility = "hidden";
panel.style.transform = "translateY(-20px)"; // Start slightly higher up

statpanel = document.createElement("div");
statpanel.style.borderRadius = "10px";
statpanel.style.width = "50%";
statpanel.style.height = "50%";
statpanel.style.backgroundColor = "rgba(0,0,0,0.8)";
statpanel.style.border = "5px solid rgba(0,0,0,0.5)";
statpanel.style.position = "fixed";
statpanel.style.zIndex = "100000000";
statpanel.style.top = "25%";
statpanel.style.left = "25%";
statpanel.style.transition =
  "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s";
statpanel.style.opacity = "0";
statpanel.style.visibility = "hidden";
statpanel.style.transform = "translateY(-20px)";

panel.appendChild(statpanel)

function toggleStats() {
    if (statpanel.style.visibility === "hidden") {
        statpanel.style.visibility = "visible";
        statpanel.style.opacity = "1";
        statpanel.style.transform = "translateY(0)";
    } else {
        statpanel.style.visibility = "hidden";
        statpanel.style.opacity = "0";
        statpanel.style.transform = "translateY(-20px)";
    }
}

textarea = document.createElement("textarea");
textarea.style.backgroundColor = "rgb(255,255,255)";
textarea.style.width = "95%";
textarea.style.height = "340px";
textarea.style.top = "130px";
textarea.style.left = "2%";
textarea.style.resize = "none";
textarea.style.position = "absolute";
textarea.style.outline = "none";
textarea.style.borderRadius = "10px";
textarea.style.fontSize = "12px";
if (localStorage.getItem("quillpad-fontscale")) {
  textarea.style.fontSize = localStorage.getItem("quillpad-fontscale");
}

tutorial = `TUTORIAL:

Buttons:
 - Copy: Copies the text inside your notepad
 - Paste: Pastes from your clipboard into the notepad
 - Export: Saves your notes to a .txt file
 - Import: Appends a .txt file to your notes
 - Grab: Takes the highlighted text on the current website and pastes it into the notepad
 - Grab & Source: Does the same thing as Grab, but also writes the website.
 - Timestamp: Pastes the current time
 - Format: Capitalizes the first letter of sentences and lines.
 - Clear: Clears the text inside of the notepad
 - Wipe: Clears the notepad and your saved notes
 - Sort A-Z:
 - Save: Saves your notes for later. Notes are only saved per website, and cannot be opened from anywhere else.
 - Restore: Restores your previously saved notes.
 
Keybinds:
 - ALT+Q: Shows and hides Quillpad
 - ALT+SHIFT+Q: Shows Quillpad and instantly focuses on the notepad
 - ALT+G: Grabs text without having to open Quillpad
 - ALT+SHIFT+G: Grabs text without having to open Quillpad, and automatically sites the source. (DOES NOT FORMAT APA OR MLA, JUST SITES THE WEBSITE!)`

// Tutorial placeholder
textarea.placeholder = "QuillPad is ready!";

panel.appendChild(textarea);

function setTheme(id) {
  textarea.style.color = themes[id].text;
  textarea.style.backgroundColor = themes[id].back;
    panel.style.backgroundColor = themes[id].bg
}

setTheme(0);

version = document.createElement("p");
version.style.fontSize = "10px";
version.style.color = "#888";
version.textContent = qpversion;
version.style.top = "5px";
version.style.right = "10px";
version.style.position = "absolute";
version.style.margin = "0";

panel.appendChild(version);

title = document.createElement("p");
title.style.fontSize = "25px";
title.style.color = "#fff";
title.textContent = "QuillPad";
title.style.top = "5px";
title.style.left = "10px";
title.style.position = "absolute";
title.style.margin = "0";

panel.appendChild(title);

function createBtn(text, x, y, action) {
    let btn = document.createElement("button");
    btn.textContent = text;
    btn.style.position = "absolute";
    btn.style.top = y * 20 + 40 + "px";
    btn.style.left = x * 96 + 10 + "px";
    btn.style.width = "96px";
    btn.style.height = "20px";
    btn.style.borderRadius = "10px";
    btn.style.fontSize = "12px";
    btn.onclick = action;
    panel.appendChild(btn);
}

function grabText() {
  // 1. Get the highlighted text from the webpage
  var selectedText = window.getSelection().toString();

  if (selectedText.length > 0) {
    // 2. Add it to the textarea (plus a newline so they don't bunch up)
    textarea.value += (textarea.value ? "\n\n" : "") + selectedText;
  } else {
    alert("Highlight some text on the page first!");
  }
}

function grabTextCite() {
  // 1. Get the highlighted text from the webpage
  var selectedText = window.getSelection().toString();

  if (selectedText.length > 0) {
    // 2. Add it to the textarea (plus a newline so they don't bunch up)
    textarea.value += (textarea.value ? "\n\n" : "") + selectedText;
    textarea.value += `\n\n[Source: ${document.title} | ${
      window.location.href
    }]`;
  } else {
    alert("Highlight some text on the page first!");
  }
}

createBtn("Copy", 0, 0, () => {
  textarea.select();
  textarea.setSelectionRange(0, 99999);

  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      alert("Copied to clipboard! Paste it somewhere safe :)");
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
});

createBtn("Paste", 1, 0, function() {
  navigator.clipboard
    .readText()
    .then(text => {
      textarea.value += text;
    })
    .catch(err => {
      alert("Permission denied. Use Ctrl+V instead!");
    });
});

createBtn("Export", 2, 0, () => {
  const blob = new Blob([textarea.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Quillpad_Notes.txt";
  link.click();
});

// Add this button to your grid (e.g., at x=2, y=1)
createBtn("Import", 3, 0, () => {
  // 1. Create a temporary input element
  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt"; // Limit to text-based files

  // 2. What happens when the user selects a file
  fileInput.onchange = e => {
    let file = e.target.files[0];
    if (!file) return;

    let reader = new FileReader();

    // 3. What happens when the file is finished loading
    reader.onload = event => {
      let content = event.target.result;
      // Add to notepad with a header
      textarea.value += `\n\n--- Imported File: ${file.name} ---\n` + content;

      // Trigger your charcount update manually
      textarea.oninput();
    };

    reader.readAsText(file);
  };

  // 4. Trigger the "Browse" window
  fileInput.click();
});

createBtn("Stats",4,0, toggleStats)

createBtn("Grab", 0, 1, grabText);

createBtn("Grab & Source", 1, 1, grabTextCite);

createBtn("Timestamp", 2, 1, () => {
  textarea.value += `\n[Log: ${new Date().toLocaleTimeString()}]\n`;
  textarea.oninput();
});

createBtn("Format", 3, 1, () => {
  let processing = textarea.value.split("\n");
  textarea.value = "";
  for (let i = 0; i < processing.length; i++) {
    function capitalizeFirstLetter(str) {
      if (!str) return str; // Handle empty strings
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    processing[i] = processing[i].toLowerCase();
    processing[i] = processing[i] + "\n";
    processing[i] = capitalizeFirstLetter(processing[i]);
    textarea.value += processing[i];
  }
});

createBtn("Clear", 0, 2, () => {
  if (
    prompt("ARE YOU SURE? (Type 'clear' to confirm)").toLowerCase() == "clear"
  ) {
    textarea.value = "";
  }
});

createBtn("Wipe", 1, 2, () => {
  if (
    prompt("ARE YOU SURE? (Type 'wipe' to confirm)").toLowerCase() == "wipe"
  ) {
    textarea.value = "";
    localStorage.removeItem("quillpad-saved");
  }
});

createBtn("Sort A-Z", 2, 2, () => {
  let lines = textarea.value.split("\n").filter(l => l.trim() !== "");
  textarea.value = lines.sort().join("\n");
});

createBtn("Theme", 3, 2, () => {
  setTheme(prompt(`Theme: (0-${themes.length - 1})`));
});

createBtn("Save", 0, 3, () => {
  localStorage.setItem("quillpad-saved", textarea.value);
  alert("Saved!");
});

createBtn("Restore", 1, 3, () => {
  textarea.value = localStorage.getItem("quillpad-saved");
  alert("Restored!");
});

fontsize = document.createElement("button");
fontsize.style.fontSize = "15px";
fontsize.textContent = `Font Size: ${textarea.style.fontSize}`;
fontsize.style.bottom = "2px";
fontsize.style.left = "10px";
fontsize.style.position = "absolute";
fontsize.style.margin = "0";
fontsize.style.borderRadius = "10px";
fontsize.onclick = () => {
  textarea.style.fontSize = prompt("Change font size to:") + "px";
  fontsize.textContent = `Font Size: ${textarea.style.fontSize}`;
  localStorage.setItem("quillpad-fontscale", textarea.style.fontSize);
};

panel.appendChild(fontsize);

document.body.appendChild(panel);

document.addEventListener(
  "keydown",
  function(e) {
    const key = e.key.toLowerCase();

    if (e.altKey) {
      // --- ALT + Q Logic ---
      if (key === "q") {
        e.preventDefault();
        e.stopPropagation();

        if (panel.style.visibility === "hidden") {
          panel.style.visibility = "visible";
          panel.style.opacity = "1";
          panel.style.transform = "translateY(0)"; // Slide down to original position
          if (e.shiftKey) textarea.focus();
        } else {
          panel.style.visibility = "hidden";
          panel.style.opacity = "0";
          panel.style.transform = "translateY(-50px)"; // Slide back up
        }
      }

      // --- ALT + G Logic ---
      else if (key === "g") {
        e.preventDefault();
        e.stopPropagation();

        if (!e.shiftKey) {
          grabText();
        } else {
          grabTextCite();
        }
      }
    }
  },
  true
); // The 'true' captures the event before the website can react

setTimeout(() => {
    panel.style.visibility = "visible";
    panel.style.opacity = "1";
    panel.style.transform = "translateY(0)";
}, 10)





charcount = document.createElement("p");

charcount.style.fontSize = "15px";
charcount.style.color = "#fff";
charcount.defaulttext = "Start typing to see your char count!";
charcount.textContent = charcount.defaulttext;
charcount.style.top = "5px";
charcount.style.left = "10px";
charcount.style.position = "absolute";
charcount.style.margin = "0";

statpanel.appendChild(charcount);

wordcount = document.createElement("p");

wordcount.style.fontSize = "15px";
wordcount.style.color = "#fff"
wordcount.defaulttext = "Start typing to see your word count!";
wordcount.textContent = wordcount.defaulttext;
wordcount.style.top = "20px";
wordcount.style.left = "10px";
wordcount.style.position = "absolute";
wordcount.style.margin = "0";

statpanel.appendChild(wordcount);

editcount = document.createElement("p");

editcount.style.fontSize = "15px";
editcount.style.color = "#fff"
editcount.defaulttext = "Start typing to see your edit count!";
editcount.textContent = editcount.defaulttext;
editcount.style.top = "35px";
editcount.style.left = "10px";
editcount.style.position = "absolute";
editcount.style.margin = "0";

statpanel.appendChild(editcount);

edits = 0
textarea.oninput = () => {
    edits++
    editcount.textContent =
      "Edits: " + edits;
  if (textarea.value.length == 0) {
    charcount.textContent = 
        charcount.defaulttext;
    wordcount.textContent = 
        wordcount.defaulttext;
  } else {
    words = textarea.value.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].split("\n");
    }
    words = words.flat(Infinity);
    wordcounter = 0;
    for (let i = 0; i < words.length; i++) {
      if (words[i] != "") {
        wordcounter++;
      }
    }
    charcount.textContent =
      "Characters: " + textarea.value.length;
    wordcount.textContent =
      "Words: " + wordcounter;
  }
  artNames = Object.keys(arts);
  for (let i = 0; i < artNames.length; i++) {
    textarea.value = textarea.value.replaceAll(
      ":" + artNames[i] + ":",
      arts[artNames[i]]
    );
  }
};
