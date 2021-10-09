import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Button, Form, Card, Container,Alert } from 'react-bootstrap';
import $ from 'jquery';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useScrollTrigger } from '@material-ui/core';


function JoinCourse() {

    const { currentUser,alertTimer } = useAuth();
    const history = useHistory();
    const [msg, setMsg] = useState("");
  
     
    
    function handleSubmit(e) {
        e.preventDefault()
        $(document).ready(function () {

            var pin = $('#search').val();
            var student_Id = $('#ID').val();
            axios.post(`/course/join`, {
                pin: pin,
                student_name: currentUser.displayName,
                student_Id: student_Id,
                student_email: currentUser.email
            })
                .then((res) => {
                    console.log(res);
                    if (res.data === "yes") {
                        history.push("/")
                        setMsg("")
                    } else {
                        history.push("/join-course")
                        setMsg(res.data.msg)
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
    }
    return (
        <div>
            {msg ? (
                    <div  style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '17px'

                    }}>
                        <Alert className="alert col-md-3 text-center br-5" variant="dark">
                            {msg}
                        </Alert>
                    </div>
                ) : ""}
            <Container className=" text-center p-20" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                
                <Card className="card col-md-4 bg-white" style={{ borderRadius: '10px' }}>
                    <Card.Body style={{ borderRadius: '10px', textAlign: 'left' }}>
                        <h5 className="text-center mb-2"> Join Course</h5>
                        <form id="attend_sheet_form" onSubmit={handleSubmit}><br />
                            {/* <input type="text" required id="search" placeholder="Enter Course pin" /><br></br><br />
                            <input type="text" required id="ID" placeholder="Enter student id" style={{ textTransform: 'uppercase' }} /><br></br><br /> */}

                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label for="search" style={{ fontWeight: 'bold' }}>Course Pin: </Form.Label>
                                <Form.Control type="text" required id="search" placeholder="Enter Course Pin" /><br />

                                <Form.Label for="ID" style={{ fontWeight: 'bold' }}>Student ID: </Form.Label>
                                <Form.Control type="text" required id="ID" style={{ textTransform: 'uppercase' }} placeholder="Enter Student ID" /><br />
                                <Button type="submit" id="submit_button" className="btn btn-primary">&ensp;Join&ensp;</Button>
                            </Form.Group>
                        </form>
                    </Card.Body>

                </Card>
            </Container>
        </div>
    );
}

export default JoinCourse;