/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable quotes */

const buttonHeader = document.querySelector(".buttonHeader");
const head = document.querySelector(".head");
const greetingsEN = document.querySelector(".greetingsEN");
const greetingsRUS = document.querySelector(".greetingsRUS");
const conteinerBody = document.querySelector(".conteinerBody");

// соездаем новое РУС. слово по клику и Enter'y

buttonHeader.addEventListener("click", addNewWordRus);
head.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewWordRus();
  }
});

function addNewWordRus() {
  // создание нового РУС. слова + индекс

  const newIndex = document.createElement("span");
  const indexesAll = document.querySelectorAll(".index");
  const newWordRus = document.createElement("div");
  newWordRus.className = "greetingRusWord";
  newIndex.className = "index";
  newWordRus.innerText = head.value;
  newIndex.innerText = indexesAll.length + 1;
  newWordRus.style.borderTop = "1px solid #111111";
  newWordRus.style.position = "relative";
  greetingsRUS.append(newWordRus);

  let lastWordRus;

  // сокращение рус слова, если оно свыше 7 букв

  if (newWordRus.innerText.length >= 8) {
    lastWordRus = newWordRus.innerText;
    newWordRus.innerText = `${newWordRus.innerText.slice(0, 7)}...`;
    newWordRus.prepend(newIndex);

    // появление подсказки рус. яз

    const fullTextRus = document.createElement("div");
    fullTextRus.className = "tooltipRus";
    fullTextRus.innerText = lastWordRus;

    newWordRus.addEventListener("mouseenter", () => {
      newWordRus.append(fullTextRus);
    });

    newWordRus.addEventListener("mouseleave", () => {
      if (fullTextRus) {
        fullTextRus.remove();
      }
    });
  } else {
    newWordRus.innerText;
    newWordRus.prepend(newIndex);
  }

  // создание нового англ слова

  const newWordEn = document.createElement("div");
  newWordEn.className = "greetingEnWord";
  newWordEn.style.borderTop = "1px solid #111111";

  // обращение к функции транслита (параметр - новое рус. слово)

  const enWord = translate(head.value);
  newWordEn.innerText = enWord;
  newWordEn.style.position = "relative";
  greetingsEN.append(newWordEn);
  head.value = "";

  // сокращение англ слова, если оно свыше 7 букв

  let lastWordEn;

  if (newWordEn.innerText.length >= 8) {
    lastWordEn = newWordEn.innerText;
    newWordEn.innerText = `${newWordEn.innerText.slice(0, 7)}...`;

    // появление подсказки англ. яз

    const fullTextEn = document.createElement("div");
    fullTextEn.className = "tooltipEn";
    fullTextEn.innerText = lastWordEn;

    newWordEn.addEventListener("mouseenter", () => {
      newWordEn.append(fullTextEn);
    });

    newWordEn.addEventListener("mouseleave", () => {
      if (fullTextEn) {
        fullTextEn.remove();
      }
    });
  } else {
    newWordEn.innerText;
  }

  // кнопка удаления слова

  const BtnDeleteWord = document.createElement("img");
  BtnDeleteWord.className = "signDeleteWord";
  BtnDeleteWord.src = "./icons/Group1.svg";
  BtnDeleteWord.alt = "cross";
  BtnDeleteWord.style.marginRight = "10px";
  newWordEn.appendChild(BtnDeleteWord);

  // запуск удаления слова и переиндексация

  BtnDeleteWord.addEventListener("click", () => {
    newWordEn.remove();
    newWordRus.remove();
    const indexesAll = document.querySelectorAll(".index");
    for (let i = 1; i < indexesAll.length; i += 1) {
      indexesAll[i].innerText = i + 1;
    }
  });

  // удаление всех новых слов из библиотеки

  const BtnDeleteAll = document.querySelector(".deleteAll");
  conteinerBody.append(BtnDeleteAll);

  function btnAllWordrr() {
    location.reload();
  }

  BtnDeleteAll.addEventListener("click", btnAllWordrr);
}

// создание транслита слова

function translate(newWordRus) {
  // const newWordRus = head.value;
  let engStr = "";
  for (let i = 0; i < newWordRus.length; i += 1) {
    if (dictionary[newWordRus[i]]) {
      engStr += dictionary[newWordRus[i]];
    } else {
      engStr += newWordRus[i];
    }
  }
  return engStr;
}

const dictionary = {
  а: "a",
  А: "A",
  б: "b",
  Б: "B",
  в: "v",
  В: "V",
  г: "g",
  Г: "G",
  д: "d",
  Д: "D",
  е: "e",
  Е: "E",
  ё: "yo",
  Ё: "YO",
  ж: "zh",
  Ж: "ZH",
  з: "z",
  З: "Z",
  и: "i",
  И: "I",
  й: "j",
  Й: "J",
  к: "k",
  К: "K",
  л: "l",
  Л: "L",
  м: "m",
  М: "M",
  н: "n",
  Н: "N",
  о: "o",
  О: "O",
  п: "p",
  П: "P",
  р: "r",
  Р: "R",
  с: "s",
  С: "S",
  т: "t",
  Т: "T",
  у: "u",
  У: "U",
  ф: "f",
  Ф: "F",
  х: "kh",
  Х: "KH",
  ц: "ts",
  Ц: "TS",
  ч: "ch",
  Ч: "CH",
  ш: "sh",
  Ш: "SH",
  щ: "shch",
  Щ: "SHCH",
  ъ: '"',
  Ъ: '"',
  ы: "y",
  Ы: "Y",
  ь: "'",
  Ь: "'",
  э: "e",
  Э: "E",
  ю: "yu",
  Ю: "YU",
  я: "ya",
  Я: "YA",
};
