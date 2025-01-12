import Maze from "../models/maze";

export function exportToMcFunction(maze: Maze) {
  const content = JSON.stringify(maze, null, 2);
  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "maze.txt";
  link.click();
  window.URL.revokeObjectURL(url);
}
