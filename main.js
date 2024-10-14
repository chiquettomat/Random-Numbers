// Selecionando os inputs e elementos
const allinputs = document.getElementById("allinputs");
const inputs = document.querySelectorAll(".inputss");
const numberInput = document.getElementById("numbers");
const intervalInput = document.getElementById("interval");
const intervalInput2 = document.getElementById("interval2");

const btnPlay = document.getElementById("sortear");
const results = document.getElementById("results");
const toggleBtn = document.getElementById("btnToggle");

const text0 = document.getElementById("text0");
const text1 = document.getElementById("text1");
const resultText1 = document.getElementById("resultH2");
const resultText2 = document.getElementById("resultP");

const btnPlayAgain = document.getElementById("playAgain");

const result1 = document.getElementById("results1");

const container = document.getElementById("container");

inputs.forEach((input) => {
  // Captura o valor do de cada input e valida se tem apenas números.
  input.oninput = (value) => {
    value = input.value;
    if (!validateNumber(value)) {
      input.value = "";
    }
  };
});

function generateRandomNumbers(noRepeat) {
  const numbers = numberInput.value;
  const interval1 = intervalInput.value;
  const interval2 = intervalInput2.value;

  const sortedNumbers = [];
  const usedNumbers = new Set();

  for (let i = 0; i < numbers; i++) {
    let randomNumber =
      Math.floor(Math.random() * (Math.abs(interval1 - interval2) + 1)) +
      Math.min(interval1, interval2);

    if (noRepeat && usedNumbers.has(randomNumber)) {
      continue;
    }

    sortedNumbers.push(randomNumber);
    usedNumbers.add(randomNumber);
  }

  return sortedNumbers;
}

function uploadDisplay(number) {
  container.classList.remove("hide");
  container.classList.add("container");

  const square = document.createElement("div");
  square.classList.add("active");
  square.classList.add("square");
  square.classList.remove("hide");
  square.classList.add("randomNumbers");
  square.textContent = "";

  container.appendChild(square);

  setTimeout(() => {
    square.textContent = number;
  }, 2000);

  setTimeout(() => {
    square.textContent = number;
    square.style.background = "none";
    square.style.color = "#C58DE7";

    btnPlayAgain.style.display = "flex";
    btnPlayAgain.classList.add("active");
  }, 3000);

  allinputs.classList.add("hide");
  toggleBtn.classList.add("hide");
  btnPlay.style.display = "none";

  text0.classList.add("hide");
  text1.classList.add("hide");
  resultText1.classList.remove("hide");
  resultText2.classList.remove("hide");

  // let counter = 1;
  // for (counter; counter <= 1; counter++) {
  //   resultText2.textContent = `${counter}° RESULTADO`;
  // }
}

function displayNumbers(numbers) {
  results.classList.remove("hide");
  results.classList.add("randomNumbers");
  results.classList.add("active");

  results.innerHTML = "";

  numbers.forEach((number) => {
    const span = document.createElement("span");
    span.textContent = number;
    results.appendChild(span);
  });
}

function generateAndDisplay() {
  const numbers = parseInt(numberInput.value);
  const interval1 = parseInt(intervalInput.value);
  const interval2 = parseInt(intervalInput2.value);
  const noRepeat = toggleBtn.checked;

  if (
    isNaN(numbers) ||
    isNaN(interval1) ||
    isNaN(interval2) ||
    numbers < 1 ||
    interval1 > interval2
  ) {
    alert("Por favor preencha os campos");
    return;
  }

  const numb = generateRandomNumbers(noRepeat);

  results.classList.add("hide");
  container.innerHTML = "";

  numb.forEach((number) => {
    uploadDisplay(number);
  });

  setTimeout(() => {
    displayNumbers(numb);
  }, 2000);
}

let counter = 0;
btnPlay.addEventListener("click", () => {
  counter++;
  resultText2.textContent = `${counter}° RESULTADO`;
  resultText2.classList.remove("hide");
});

btnPlay.addEventListener("click", generateAndDisplay);

function playAgainBtn() {
  btnPlayAgain.addEventListener("click", () => {
    container.classList.add("hide");
    container.classList.remove("container");

    allinputs.classList.remove("hide");
    toggleBtn.classList.remove("hide");
    btnPlay.style.display = "flex";

    text0.classList.remove("hide");
    text1.classList.remove("hide");
    resultText1.classList.add("hide");
    resultText2.classList.add("hide");
    results.classList.add("hide");

    btnPlayAgain.style.display = "none";

    numberInput.value = "";
    intervalInput.value = "";
    intervalInput2.value = "";
  });
}
playAgainBtn();

function validateNumber(number) {
  const regexOnlyNumbers = /^\d+$/;
  return regexOnlyNumbers.test(number);
}
