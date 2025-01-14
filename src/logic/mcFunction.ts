import JSZip from "jszip";
import Block from "../models/block";

// TODO: Improve this function. An optimal version of this algorithm would have
// a single Minecraft command for each wall segment while minimizing the total
// number of commands in the *.mcfunction file.
export function mazeToMcFunction(maze: Block[][]): string {
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

  return (
    `\nfill ~0 ~0 ~0 ~0 ~1 ~${maze.length - 1} stone` +
    maze.reduce(rowReducer, "") +
    `\nfill ~${maze[0].length - 1} ~0 ~0 ~${maze[0].length - 1} ~1 ~${maze.length - 1} stone`
  );
}

export function createDatapack(
  mazeFunction: string,
  solutionFunction: string,
): Promise<Blob> {
  const zip = new JSZip();

  zip?.file(
    "pack.mcmeta",
    `{"pack":{"pack_format":48,"description":"Mazes Datapack"}}`,
  );
  const functionFolder = zip
    ?.folder("data")
    ?.folder("mazes")
    ?.folder("function");

  functionFolder?.file("load.mcfunction", "");
  functionFolder?.file("tick.mcfunction", "");
  functionFolder?.file("maze.mcfunction", mazeFunction);
  functionFolder?.file("solution.mcfunction", solutionFunction);

  return zip.generateAsync({ type: "blob" });
}
