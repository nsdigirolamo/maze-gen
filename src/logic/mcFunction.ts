import Block from "../models/block";

export function exportToMcFunction(maze: Block[][]) {
  const content = JSON.stringify(maze, null, 2);
  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "maze.txt";
  link.click();
  window.URL.revokeObjectURL(url);
}
