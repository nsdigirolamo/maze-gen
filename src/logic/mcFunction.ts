import Block from "../models/block";

export function exportToMcFunction(maze: Block[][]) {
  const rowReducer = (prevString: string, row: boolean[], rowIndex: number) => {
    let nextString = "";

    let startColIndex = 0;
    for (let colIndex = 2; colIndex < row.length; colIndex++) {
      const currBlockExists = row[colIndex];
      const prevBlockExists = row[colIndex - 1];

      if (currBlockExists && !prevBlockExists) {
        startColIndex = colIndex;
      } else if (!currBlockExists && prevBlockExists) {
        nextString += `\nfill ~${startColIndex} ~0 ~${rowIndex} ~${colIndex - 1} ~1 ~${rowIndex} stone`;
      } else if (colIndex === row.length - 1) {
        nextString += `\nfill ~${startColIndex} ~0 ~${rowIndex} ~${colIndex} ~1 ~${rowIndex} stone`;
      }
    }

    return prevString + nextString;
  };

  const content =
    `\nfill ~0 ~0 ~0 ~0 ~1 ~${maze.length - 1} stone` +
    maze.reduce(rowReducer, "") +
    `\nfill ~${maze[0].length - 1} ~0 ~0 ~${maze[0].length - 1} ~1 ~${maze.length - 1} stone`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "maze.mcfunction";
  link.click();
  window.URL.revokeObjectURL(url);
}
