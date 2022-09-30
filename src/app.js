/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
let arrTypes = ["card-spade", "card-heart", "card-trevol", "card-diamond"];
let cardArr = [];
let cardHtmlContainer = "cardContainer";

const drawbutton = document.querySelector("#draw");
const sortbutton = document.querySelector("#sort");
const clearbutton = document.querySelector("#clear");
drawbutton.addEventListener("click", draw);
sortbutton.addEventListener("click", sort);
clearbutton.addEventListener("click", clear);

function clear() {
  location.reload();
}
class Card {
  constructor(cardNumber, cardType) {
    this.cardNumber = cardNumber;
    this.cardType = cardType;
  }
}

//Generador de numero aleatorio
function genRandomCardNumber(maxCardNumber) {
  return Math.floor(Math.random() * maxCardNumber) + 1;
}

//Asignacion valor de array a letra de carta//
function getCardType(cardNumber) {
  return cardNumber === 11
    ? "J"
    : cardNumber === 12
    ? "Q"
    : cardNumber === 13
    ? "K"
    : cardNumber === 1
    ? "A"
    : cardNumber;
}

//generar el tipo de carta aleatorio
function getRandomCardType() {
  return Math.floor(Math.random() * 4);
}

//Insertar una nueva fila en el HTML//
function drawCard(newCell, card) {
  newCell.innerHTML =
    `<div class="card ` +
    arrTypes[card.cardType] +
    `" id="cardNumber" value="` +
    getCardType(card.cardNumber) +
    `">
        <div class="card_inner card_inner-centered">
            <div class="card_column">
                <div class="card_symbol"></div>
            </div>
        </div>
    </div>`;
}

//Insertar las filas necesarias
function drawRow(newRow) {
  for (let i = 0; i < cardArr.length; i++) {
    let newCell = newRow.insertCell(-1);
    drawCard(newCell, cardArr[i]);
  }
}

//Generar el numero de la carta y su tipo
function genInitialRandomCards(cardNumbers) {
  for (let i = 0; i < cardNumbers; i++) {
    let cardNumber = genRandomCardNumber(13);
    let cardType = getRandomCardType();

    let card = new Card(cardNumber, cardType);
    cardArr.push(card);
  }
}

//Insertar filas con el numero insertado por el usuario
function draw() {
  let cardNumbers = document.querySelector("#numberCard").value;
  genInitialRandomCards(cardNumbers);
  let newRow = createRow();
  drawRow(newRow);
}

function createRow() {
  let cardContainer = document.getElementById(cardHtmlContainer);
  return cardContainer.insertRow(-1);
}

// Algoritmo Bubble Sort
function sort() {
  bubbleSort(cardArr);
}

const bubbleSort = arr => {
  let wall = arr.length - 1;

  while (wall > 0) {
    let index = 0;

    while (index < wall) {
      if (arr[index].cardNumber > arr[index + 1].cardNumber) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
      }
      index++;
    }

    wall--;

    if (wall > 0) {
      drawRow(createRow());
    }
  }
};
