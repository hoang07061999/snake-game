import { cols, createGrid, rows } from "./grid";
import { random } from "./location";

export const run = (food, snake, currentDirection) => {
  if (snake.head.row && snake.head.col) {
    let head = {
      row: snake.head.row,
      col: snake.head.col,
    };

    let f = food;
    let tail = [...snake.tail];

    tail.unshift({
      row: head.row,
      col: head.col,
    });

    switch (currentDirection) {
      case "left":
        head.col--;
        break;

      case "up":
        head.row--;
        break;

      case "down":
        head.row++;
        break;

      case "right":
      default:
        head.col++;
        break;
    }

    if (head.row === f.row && head.col === f.col) {
      f = random();
      tail.forEach((t) => {
        if (t.row === f.row && t.col === f.col) {
          f = random();
        }
      });
    } else {
      tail.pop();
    }

    if (head.col >= cols) {
      head.col -= cols;
    }
    if (head.col <= 0) {
      head.col = cols;
    }
    if (head.row >= rows) {
      head.row -= rows;
    }
    if (head.row <= 0) {
      head.row = rows;
    }

    const state = {
      food: f,
      snake: {
        head: head,
        tail: tail,
      },
    };

    const grid = createGrid(state, true);
    return {
      grid,
      snake: state.snake,
      food: f,
    };
  }
};
