// Detecting Button Press
const buttons = document.querySelectorAll(".drum");
const activeButtons = new Set();

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonInnerHTML = button.innerHTML.toLowerCase();
    if (!activeButtons.has(buttonInnerHTML)) {
      makeSound(buttonInnerHTML);
      buttonAnimation(buttonInnerHTML);
      activeButtons.add(buttonInnerHTML);
      setTimeout(() => activeButtons.delete(buttonInnerHTML), 200);
    }
  });
});

// Detecting Keyboard Press
document.addEventListener("keypress", event => {
  const key = event.key.toLowerCase();
  if (!activeButtons.has(key)) {
    makeSound(key);
    buttonAnimation(key);
    activeButtons.add(key);
    setTimeout(() => activeButtons.delete(key), 200);
  }
});

function playAudio(src) {
  const audio = new Audio(src);
  audio.play().catch(e => console.error("Audio play error:", e));
}

function makeSound(key) {
  switch (key) {
    case "w": playAudio("sounds/tom-1.mp3"); break;
    case "a": playAudio("sounds/tom-2.mp3"); break;
    case "s": playAudio("sounds/tom-3.mp3"); break;
    case "d": playAudio("sounds/tom-4.mp3"); break;
    case "j": playAudio("sounds/snare.mp3"); break;
    case "k": playAudio("sounds/kick-bass.mp3"); break;
    case "l": playAudio("sounds/crash.mp3"); break;
    default: console.log("Unrecognized key:", key);
  }
}

function buttonAnimation(currentKey) {
  const activeButton = document.querySelector("." + currentKey);
  if (!activeButton) return;

  activeButton.classList.add("pressed");

  // Flash effect: change background color temporarily
  activeButton.style.backgroundColor = "#ff4757";
  setTimeout(() => {
    activeButton.classList.remove("pressed");
    activeButton.style.backgroundColor = ""; // revert to original style
  }, 150);
}
