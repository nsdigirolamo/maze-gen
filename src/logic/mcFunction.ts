import Block from "../models/block";

export function exportToMcFunction(maze: Block[][]) {
  const content = maze.reduce(
    (rowAccum, row, rowIndex) =>
      rowAccum +
      row.reduce(
        (colAccum, blockExists, colIndex) =>
          blockExists
            ? colAccum +
              `\nfill ~${colIndex} ~0 ~${rowIndex} ~${colIndex} ~1 ~${rowIndex} stone`
            : colAccum,
        "",
      ),
    "",
  );
  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "maze.mcfunction";
  link.click();
  window.URL.revokeObjectURL(url);
}
