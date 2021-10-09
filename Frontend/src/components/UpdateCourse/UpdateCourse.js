import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from '../../config/axios';


export default function UpdateCourse({ match }) {

    const course_code = match.params.course_code;
    console.log(course_code);
    const course_name_ref = useRef()
    const course_code_ref = useRef()
    const { signup, currentUser } = useAuth()
    const { error, setError } = useState()
    const [CourseName, setCourseName] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [msg, setMsg] = useState("");

    useEffect(() => {

        axios.get(`/course/info/${course_code}`).then((result) => {
            setCourseName(result.data[0]?.course_name);
            console.log(result.data);
        })

    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        
        console.log(course_name_ref.current.value)
        axios.post("/course/update", {

            course_name: course_name_ref.current.value,
            course_code: course_code_ref.current.value,
            prev_course_code: course_code,
        }).then((res) => {
            console.log(res.data);
            
            if (res.data.successMsg) {
                history.push("/")
            }
            else {
                setMsg(res.data.errorMsg)
            }
        })
        //history.push("/");

        //     // if (course_code_ref.current.value !== passwordConfirmRef.current.value) {
        //     //   return setError("Passwords do not match")
        //     // }

        // try {

        //   setError("")
        //   setLoading(true)
        //   console.log(course_name_ref.current.value)
        //   axios.post("/course/update", {

        //     course_name: course_name_ref.current.value,
        //     course_code: course_code_ref.current.value,
        //   }).then((res) => {
        //     console.log(res.status);
        //     if (!res.data.msg) {
        //       history.push("/")
        //     }
        //     else {
        //       setMsg(res.data.msg)
        //     }
        //   })

        // } catch {
        // //   setError("Failed to create Account")
        // }

        // setLoading(false)
    }



    return (
        <>
            <h3>{msg}</h3>
            <Container className=" text-center p-20" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Card className="card bg-white" style={{ borderRadius: '10px' }}>
                    <Card.Body style={{ borderRadius: '10px', textAlign: 'left' }}>
                        <h4 className="text-center mb-4">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; Update Course&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp;</h4>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="course_name">
                                <Form.Label style={{ fontWeight: 'bold' }}>Course name</Form.Label>
                                <Form.Control type="text" ref={course_name_ref} placeholder="Enter Course Name" defaultValue={CourseName} required />
                            </Form.Group><br />
                            <Form.Group id="password">
                                <Form.Label style={{ fontWeight: 'bold' }}>Course code </Form.Label>
                                <Form.Control style={{ textTransform: 'uppercase' }} type="text" ref={course_code_ref} defaultValue={course_code} placeholder="Enter Course Code" required />
                            </Form.Group><br />
                            {/* <Form.Group id="password-confirm">
              <Form.Label>Course photo</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group> */}
                            <Form.Group id="button">
                                <Button disabled={loading} type="submit">
                                    &ensp;Update&ensp;
                                </Button>
                            </Form.Group>
                        </Form>

                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
