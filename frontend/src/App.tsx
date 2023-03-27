import { Container } from "react-bootstrap";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import DataTabs from "./components/DataTabs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Container fluid>
        <DataTabs />
      </Container>
    </ApolloProvider>
  );
}

export default App;
