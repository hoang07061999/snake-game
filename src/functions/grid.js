export const rows = 10;
export const cols = 10;

export const createGrid = (state = {}) => {
  let grid = [];

  let food = state.food;
  let snake = state.snake;

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const isFood = food.row === row && food.col === col;
      const isHead = snake.head.row === row && snake.head.col === col;
      let isTail = false;
      snake.tail.forEach((t) => {
        if (t.row === row && t.col === col) {
          isTail = true;
        }
      });
      grid.push({
        row,
        col,
        isFood,
        isHead,
        isTail,
      });
    }
  }
  return grid;
};
