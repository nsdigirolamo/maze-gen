import "bootstrap/dist/css/bootstrap.min.css";
import Generator from "./pages/Generator";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <h1 className="text-center my-4">Minecraft Maze Generator</h1>
      <Container className="mx-4">
        <Generator />
      </Container>
    </>
  );
}

export default App;
