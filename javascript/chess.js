"use strict";

let game_board = document.getElementById('game-board');
let grid = null;
let turn = "";
let selectedTile = null;
let highlighted = null;
let gameWon = null;

let resetButton = document.getElementById('reset');
resetButton.addEventListener("click", resetGameBoard);

initialize();

function initialize() {
  turn = "white";
  highlighted = [];
  gameWon = false;
  document.getElementById('turn').innerHTML = "It's white's turn";

  let color = 0; // Used to alternate white and black tiles
  for (let i = 0; i < 8; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 8; j++) {
      let cell = document.createElement('td');
      if (color == 0) {
        cell.classList.add("white");
        color = 1;
      }
      else {
        cell.classList.add("grey");
        color = 0;
      }

      cell.setAttribute("row", i);
      cell.setAttribute("column", j);
      cell.addEventListener("click", clickTile);
      row.appendChild(cell);
    }
    if (color == 0) color = 1;
    else color = 0;

    game_board.appendChild(row);

  }

  // Stock the board with pieces
  grid = game_board.children;
  let row_temp = null;
  let img = null;

  // White on top
  row_temp = grid[0].children;

  img = document.createElement('img');
  img.src = "./assets/rw.svg";
  img.setAttribute("rank", "rook");
  img.setAttribute("side", "white");
  row_temp[0].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/nw.svg";
  img.setAttribute("rank", "knight");
  img.setAttribute("side", "white");
  row_temp[1].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/bw.svg";
  img.setAttribute("rank", "bishop");
  img.setAttribute("side", "white");
  row_temp[2].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/kw.svg";
  img.setAttribute("rank", "king");
  img.setAttribute("side", "white");
  row_temp[3].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/qw.svg";
  img.setAttribute("rank", "queen");
  img.setAttribute("side", "white");
  row_temp[4].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/bw.svg";
  img.setAttribute("rank", "bishop");
  img.setAttribute("side", "white");
  row_temp[5].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/nw.svg";
  img.setAttribute("rank", "knight");
  img.setAttribute("side", "white");
  row_temp[6].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/rw.svg";
  img.setAttribute("rank", "rook");
  img.setAttribute("side", "white");
  row_temp[7].appendChild(img);

  row_temp = grid[1].children;
  for (let i = 0; i < 8; i++) {
    img = document.createElement('img');
    img.src = "./assets/pw.svg";
    img.setAttribute("rank", "pawn");
    img.setAttribute("side", "white");
    row_temp[i].appendChild(img);
  }

  //Black on the bottom
  row_temp = grid[7].children;

  img = document.createElement('img');
  img.src = "./assets/rb.svg";
  img.setAttribute("rank", "rook");
  img.setAttribute("side", "black");
  row_temp[0].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/nb.svg";
  img.setAttribute("rank", "knight");
  img.setAttribute("side", "black");
  row_temp[1].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/bb.svg";
  img.setAttribute("rank", "bishop");
  img.setAttribute("side", "black");
  row_temp[2].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/kb.svg";
  img.setAttribute("rank", "king");
  img.setAttribute("side", "black");
  row_temp[3].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/qb.svg";
  img.setAttribute("rank", "queen");
  img.setAttribute("side", "black");
  row_temp[4].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/bb.svg";
  img.setAttribute("rank", "bishop");
  img.setAttribute("side", "black");
  row_temp[5].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/nb.svg";
  img.setAttribute("rank", "knight");
  img.setAttribute("side", "black");
  row_temp[6].appendChild(img);
  img = document.createElement('img');
  img.src = "./assets/rb.svg";
  img.setAttribute("rank", "rook");
  img.setAttribute("side", "black");
  row_temp[7].appendChild(img);

  row_temp = grid[6].children;
  for (let i = 0; i < 8; i++) {
    img = document.createElement('img');
    img.src = "./assets/pb.svg";
    img.setAttribute("rank", "pawn");
    img.setAttribute("side", "black");
    row_temp[i].appendChild(img);
  }
}

function clickTile() {
  if (this.classList.contains("green")) {
    // Move piece on selected tile to this one
    move(selectedTile, this);
    // Deselect
    clearSelected();
    // Clear highlighted tiles
    clearHighlighted();

    return;
  }

  if (this != selectedTile) {
    clearSelected();
    clearHighlighted();
    select(this);
    if (this.firstElementChild && (turn == this.firstElementChild.getAttribute("side")) && !gameWon) {
      calculateMoves(this);
    }
  }
  else {
    clearSelected();
    clearHighlighted();
  }
}

function calculateMoves(tile) {
  let row = Number(tile.getAttribute("row"));
  let column = Number(tile.getAttribute("column"));
  let piece = tile.firstElementChild;
  let rank = piece.getAttribute("rank");
  let side = piece.getAttribute("side");

  switch(rank) {
    case 'pawn':
      // Pawns can only move in one direction
      let direction = 0;
      if (piece.getAttribute("side") == "black") {
        direction = -1;
      }
      else {
        direction = 1;
      }

      // Can only move one tile forward at a time, except on their first move, when they can move 2
      if (!checkCollision(row + direction, column, side)) {
        highlight(row + direction, column);
        if (!piece.classList.contains("has-moved") && !checkCollision(row + (direction*2), column, side)) {
          highlight(row + (direction*2), column)
        }
      }

      // Pawns can only capture diagonally
      if (checkCollision(row + direction, column + 1, side) == 1) {
        highlight(row + direction, column + 1);
      }
      if (checkCollision(row + direction, column - 1, side) == 1) {
        highlight(row + direction, column - 1);
      }
      break;

    case "knight":
      if (checkCollision(row - 2, column - 1, side) <= 1) highlight(row - 2, column - 1);
      if (checkCollision(row - 2, column + 1, side) <= 1) highlight(row - 2, column + 1);
      if (checkCollision(row + 2, column - 1, side) <= 1) highlight(row + 2, column - 1);
      if (checkCollision(row + 2, column + 1, side) <= 1) highlight(row + 2, column + 1);
      if (checkCollision(row - 1, column - 2, side) <= 1) highlight(row - 1, column - 2);
      if (checkCollision(row + 1, column - 2, side) <= 1) highlight(row + 1, column - 2);
      if (checkCollision(row - 1, column + 2, side) <= 1) highlight(row - 1, column + 2);
      if (checkCollision(row + 1, column + 2, side) <= 1) highlight(row + 1, column + 2);
      break;

    case "king" :
      if (checkCollision(row - 1, column - 1, side) <= 1) highlight(row - 1, column - 1);
      if (checkCollision(row - 1, column, side) <= 1) highlight(row - 1, column);
      if (checkCollision(row - 1, column + 1, side) <= 1) highlight(row - 1, column + 1);
      if (checkCollision(row, column + 1, side) <= 1) highlight(row, column + 1);
      if (checkCollision(row + 1, column + 1, side) <= 1) highlight(row + 1, column + 1);
      if (checkCollision(row + 1, column, side) <= 1) highlight(row + 1, column);
      if (checkCollision(row + 1, column - 1, side) <= 1) highlight(row + 1, column - 1);
      if (checkCollision(row, column - 1, side) <= 1) highlight(row, column - 1);

      break;

    case "queen":
      // Queen is essentially a rook and bishop combined, so we will reuse the code from those pieces

    case "rook":
      let temp = null;

      // Up
      temp = row;
      while (true) {
        temp--;
        let collision = checkCollision(temp, column, side);

        if (collision == 0) {
          highlight(temp, column);
          continue;
        }
        else if (collision == 1) {
          highlight(temp, column);
          break;
        }
        else {
          break;
        }
      }

      // Down
      temp = row;
      while (true) {
        temp++;
        let collision = checkCollision(temp, column, side);

        if (collision == 0) {
          highlight(temp, column);
          continue;
        }
        else if (collision == 1) {
          highlight(temp, column);
          break;
        }
        else {
          break;
        }
      }

      // Left
      temp = column;
      while (true) {
        temp--;
        let collision = checkCollision(row, temp, side);

        if (collision == 0) {
          highlight(row, temp);
          continue;
        }
        else if (collision == 1) {
          highlight(row, temp);
          break;
        }
        else {
          break;
        }
      }

      // Right
      temp = column;
      while (true) {
        temp++;
        let collision = checkCollision(row, temp, side);

        if (collision == 0) {
          highlight(row, temp);
          continue;
        }
        else if (collision == 1) {
          highlight(row, temp);
          break;
        }
        else {
          break;
        }
      }
      if (rank != "queen") break;

    case "bishop":
      let tempr = null;
      let tempc = null;

      // Up-Left
      tempr = row;
      tempc = column;
      while (true) {
        tempr--;
        tempc--;
        let collision = checkCollision(tempr, tempc, side);

        if (collision == 0) {
          highlight(tempr, tempc);
          continue;
        }
        else if (collision == 1) {
          highlight(tempr, tempc);
          break;
        }
        else {
          break;
        }
      }

      // Up-Right
      tempr = row;
      tempc = column;
      while (true) {
        tempr--;
        tempc++;
        let collision = checkCollision(tempr, tempc, side);

        if (collision == 0) {
          highlight(tempr, tempc);
          continue;
        }
        else if (collision == 1) {
          highlight(tempr, tempc);
          break;
        }
        else {
          break;
        }
      }

      // Down-Left
      tempr = row;
      tempc = column;
      while (true) {
        tempr++;
        tempc--;
        let collision = checkCollision(tempr, tempc, side);

        if (collision == 0) {
          highlight(tempr, tempc);
          continue;
        }
        else if (collision == 1) {
          highlight(tempr, tempc);
          break;
        }
        else {
          break;
        }
      }

      // Down-Right
      tempr = row;
      tempc = column;
      while (true) {
        tempr++;
        tempc++;
        let collision = checkCollision(tempr, tempc, side);

        if (collision == 0) {
          highlight(tempr, tempc);
          continue;
        }
        else if (collision == 1) {
          highlight(tempr, tempc);
          break;
        }
        else {
          break;
        }
      }
      break;
  }
}

function move(src, dest) {
  let destPiece = dest.firstElementChild;

  if (destPiece) {
    destPiece.remove();
    if (destPiece.getAttribute("rank") == "king") {
      gameWin();
    }
  }

  let srcPiece = src.firstElementChild;
  srcPiece.remove();

  // TODO: Turn pawn into queen when it reached end of board
  if (srcPiece.getAttribute("rank") == "pawn")
  {
    if ((srcPiece.getAttribute("side") == "white") && Number(dest.getAttribute("row")) == 7)
    {
      srcPiece.setAttribute("rank", "queen");
      srcPiece.src = "./assets/qw.svg";
    }

    if ((srcPiece.getAttribute("side") == "black") && Number(dest.getAttribute("row")) == 0)
    {
      srcPiece.setAttribute("rank", "queen");
      srcPiece.src = "./assets/qb.svg";
    }
  }

  dest.appendChild(srcPiece);
  srcPiece.classList.add("has-moved");

  if (gameWon) return;

  if (turn == "white") {
    turn = "black";
    document.getElementById('turn').textContent = "It's black's turn";
  }
  else {
    turn = "white";
    document.getElementById('turn').innerHTML = "It's white's turn";
  }
}

// Return Values
// 0: No collision
// 1: Collision with enemy piece
// 2: Collision with ally piece
// 3: Collision with edge of board
function checkCollision(row, column, side) {
  if ((row < 0) || (row > 7) || (column < 0) || column > 7) {
    return 3;
  }

  let tile = grid[row].children[column];
  let piece = tile.firstElementChild;

  if (!piece) {
    // highlight(tile);
    return 0;
  }

  if (piece.getAttribute("side") === side) {
    return 2;
  }
  else {
    // highlight(tile);
    return 1;
  }
}

function gameWin() {
  gameWon = true;

  if (turn == "black") {
    document.getElementById('turn').innerHTML = "Black wins!";
  }
  else {
    document.getElementById('turn').innerHTML = "White wins!";
  }
}

function select(tile) {
  tile.classList.toggle("selected");
  selectedTile = tile;
}

function clearSelected() {
  if (selectedTile != null) {
    selectedTile.classList.toggle("selected");
    selectedTile = null;
  }
}

function highlight(row, column) {
  let tile = grid[row].children[column];
  tile.classList.toggle("green");
  highlighted.push(tile);
}

function clearHighlighted() {
  while (highlighted.length > 0) {
    let tile = highlighted.pop();
    tile.classList.toggle("green");
  }
}

function resetGameBoard() {
  // Clear game board
  while (game_board.firstChild) {
    game_board.removeChild(game_board.lastChild);
  }

  // Reset game board
  initialize();
}
