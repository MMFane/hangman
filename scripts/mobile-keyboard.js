class mobileKeyboard {
  constructor() {
    this.statuses = ["unused", "used"];
    this.keyboard = document.querySelector("#mobile-keyboard");
    this.keys = [];
    this.letters = [..."abcdefghijklmnopqrstuvwxyz"];
    this.letters = this.letters.map((letter) => {
      return {
        letter: letter,
        status: this.statuses[0],
      };
    });
    this.print();
  }

  print() {
    // To Do print by making dom elements with different styling for letters and useda
    this.letters.forEach((letter) => {
      const key = document.createElement("button");
      key.textContent = letter.letter;
      const keyClass =
        letter.status === this.statuses[0]
          ? this.statuses[0]
          : this.statuses[1];
      key.classList.add(keyClass);
      key.onclick = () => {
        this.useLetter(letter.letter);
        window.dispatchEvent(
          new CustomEvent("mobile-keyboard-press", {
            detail: { letter: letter.letter },
          })
        );
      };
      this.keys.push(key);
      this.keyboard.appendChild(key);
    });
  }

  useLetter(letter) {
    const index = this.letters.findIndex((elem) => elem.letter === letter);
    this.letters[index].status = this.statuses[1];
    this.keys[index].classList.remove(this.statuses[0]);
    this.keys[index].classList.add(this.statuses[1]);
    this.keys[index].disabled = true;
  }

  reset() {
    this.letters.forEach((letter) => {
      letter.status = this.statuses[0];
    });
    this.keys.forEach((key) => {
      key.classList = this.statuses[0];
      key.disabled = false;
    });
  }
}
