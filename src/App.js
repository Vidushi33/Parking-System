import React from "react";
import Col from "react-bootstrap/Col";
import Slots from "./components/Slots";
import Row from "react-bootstrap/Row"
import Entry from "./components/Entry";
import Exit from "./components/Exit";

import "./index.css"
function App() {
  return (
    <div>
      <Row>
        <Col md={7}>
          <Slots/>
        </Col>
        <Col md={5}>
          <div className="d-flex flex-column align-items-center justify-content-evenly h-100 w-50 mx-auto" >
            <Entry />
            <Exit />
          
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
