import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"
import swal from "sweetalert"
import {useForm} from "react-hook-form"

function Entry(){

  const {register,handleSubmit,reset}=useForm();
  const onSubmit = async(data) => {
    console.log(data);
    const response =await axios.post("http://localhost:4000/entry",data)
    swal({
      title: `Slot Alloted: ${response.data.slot}`,
      text: `Entry Time:  ${response.data.entry}`,
      icon: "success",
      button: "Aww yiss!",
    }).then(async()=>{
      const res=await axios.get('http://localhost:4000')
      console.log(res.data.availSlots);
      for(let i=0;i<res.data.bookedSlots.length;i++){
        document.getElementById(res.data.bookedSlots[i]).style.background="red";
      }
      for(let i=0;i<res.data.availSlots.length;i++){
        document.getElementById(res.data.availSlots[i]).style.background="lightgreen";
      }
    });  
    reset() 
    // document.getElementById(response.data.slot).style.background="red"
    setModalShow(false)
  }


  const [modalShow, setModalShow] = React.useState(false);
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Entry Gate Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" {...register('name',{required:true})} />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="mail" {...register('mail',{required:true})}  />
            </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="contactNo">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="number" placeholder="Enter contact number" name="contactNo" {...register('contactNo',{required:true})} />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="vehicleNo">
                <Form.Label>Vehicle No.</Form.Label>
                <Form.Control type="text" placeholder="Enter Vehicle No." name="vehiceNo" {...register('vehicleNo',{required:true})} />
            </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="category" >
              <Form.Label>Vehicle Category</Form.Label>
              <Form.Select name="category" {...register('category',{required:true})}>
                <option value="2">Two Wheeler</option>
                <option value="3">Three Wheeler</option>
                <option value="4">Four Wheeler</option>
              </Form.Select>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="remarks">
                <Form.Label>Remarks</Form.Label>
                <Form.Control type="text" placeholder="Remarks (if any)" name="remarks" {...register('remarks',{required:true})} />
            </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
        </Modal.Body>
      </Modal>
    );
  }
    return(
        <div>
            <Card style={{ width: '25rem' ,height:'10rem',   background: "linear-gradient(to right, #3494e6, #ec6ead)"}} className="mt-5" onClick={() => setModalShow(true)}>
              <Card.Body>
                <Card.Title className="text-center p-5 text-white" style={{fontSize:"30px",cursor:"pointer"}}>Entry Gate</Card.Title>
              </Card.Body>
            </Card>
            <>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
        </div>
    )
}
export default Entry;