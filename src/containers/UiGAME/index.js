import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { createGrid } from "../../functions/grid";
import { center, random } from "../../functions/location";
import { run } from "../../functions/run";

const UiGAME = () => {
  const [grid, setGrid] = useState([]);
  const [food, setFood] = useState({});
  const [snake, setSnake] = useState({
    head: {},
    tail: [],
  });
  const [currentDirection, setCurrentDirection] = useState("");

  const handleKeyPress = (e) => {
    let direction = "";

    switch (e.keyCode) {
      case 37:
        direction = "left";
        break;

      case 38:
        direction = "up";
        break;

      case 39:
      default:
        direction = "right";
        break;

      case 40:
        direction = "down";
        break;
    }
    setCurrentDirection(direction);
  };

  useEffect(() => {
    const init = () => {
      window.addEventListener("keydown", handleKeyPress);
      const state = {
        food: random(),
        snake: {
          head: center(),
          tail: snake.tail,
        },
      };
      const grid = createGrid(state);
      setGrid(grid);
      setFood(state.food);
      setSnake(state.snake);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    const state = run(food, snake, currentDirection);
    setFood(state.food);
    setSnake(state.snake);
    setGrid(state.grid);
  }, 200);

  return (
    <div className="canvas">
      {grid.map((grid, i) => (
        <div
          key={i}
          className={
            grid.isFood
              ? "item-isFood"
              : grid.isHead
              ? "item-isHead"
              : grid.isTail
              ? "item-isTail"
              : "item"
          }
        ></div>
      ))}
    </div>
  );
};

export default UiGAME;
