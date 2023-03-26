import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DataTabs from "./components/DataTabs";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <DataTabs />
      </Container>
    </div>
  );
}

export default App;
