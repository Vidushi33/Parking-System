import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function Slots() {
  const [data, setData] = useState([]);
  const{register,handleSubmit,reset}=useForm();
  const [modalShow,setModalShow]=React.useState(false)
  const [parkerData,setParkerData]=React.useState([])
  useEffect(async() => {
    let arr = [];
    for (let i = 1; i <= 60; i++) {
      arr.push(i);
    }
    setData(arr);
    const response=await axios.get('http://localhost:4000')
    console.log(response.data.bookedSlots);
    for(let i=0;i<response.data.bookedSlots.length;i++){
      document.getElementById(response.data.bookedSlots[i]).style.background="red";
      console.log(response.data)
    }
  }, []);


  function MyVerticallyCenteredModal(props) {
    if(parkerData){
      return (
        <Modal
          {...props}
          size="md"
          animation
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Parker's Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <Row className="text-white">
              <h4 className="text-center p-2">Name: {parkerData.name}</h4>
              <h4 className="text-center p-2">Email: {parkerData.mail}</h4>
              <h4 className="text-center p-2">Contact No: {parkerData.contactNo}</h4>
              <h4 className="text-center p-2">Vehicle No: {parkerData.vehicleNo}</h4>
              <h4 className="text-center p-2">Entry Time: {parkerData.entryTime}</h4>
            </Row>
          </Modal.Body>
        </Modal>
      );
    }
    else{
      return (
        <Modal
          {...props}
          size="md"
          animation
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Parker's Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <Row className="text-white">
              <h4 className="text-center p-2">No vehicle parked at this slot</h4>
            </Row>
          </Modal.Body>
        </Modal>
      );
    }
  }

 async function getParker(id){
    const res=await axios.post("http://localhost:4000/slot",{id:id})
    setModalShow(true)
    setParkerData(res.data.parkerDetails[0])
    console.log("SeetParkers",parkerData)
  }
  return (
    <div className="hidden md:block">
      <Container fluid>
        <Row className="p-4">
          {data.map((num) => (
            <Col md={2} xs={3}className=" text-center">
              <Card style={{ width: '4rem'}}   className="mt-4">
                    <Card.Body className="bg-green-400 cursor-pointer " id={num} onClick={()=>getParker(num)}>
                        <Card.Title className="text-center">{num}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
          ))}
        </Row>
          <>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
      </Container>
    </div>
  );
}
export default Slots;