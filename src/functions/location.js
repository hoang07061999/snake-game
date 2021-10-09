import { cols, rows } from "./grid";

export const random = () => ({
  row: Math.ceil(Math.random() * rows),
  col: Math.ceil(Math.random() * cols),
});

export const center = () => ({
  row: rows / 2,
  col: cols / 2,
});
