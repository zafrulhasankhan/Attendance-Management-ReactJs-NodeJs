import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import axios from '../../config/axios';


export default function Add_course() {

  const course_name_ref = useRef()
  const course_code_ref = useRef()
  const { currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [msg, setMsg] = useState("");
  async function handleSubmit(e) {
    e.preventDefault()

    // if (course_code_ref.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    try {

      setError("")
      setLoading(true)
      axios.post("/course/add", {
        course_name: course_name_ref.current.value,
        course_code: course_code_ref.current.value,
        course_pin: Math.random().toString(36).substring(7),
        course_owner_email: currentUser.email
      }).then((res) => {
        console.log(res.status);
        if (!res.data.msg) {
          history.push("/")
        }
        else {
          setMsg(res.data.msg)
        }
      })

    } catch {
      setError("Failed to create Account")
    }

    setLoading(false)
  }



  return (
    <>
      {msg ? (
        <div style={{
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
        <Card className="card bg-white" style={{ borderRadius: '10px' }}>
          <Card.Body style={{ borderRadius: '10px', textAlign: 'left' }}>
            <h4 className="text-center mb-4">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; Add Course&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp;</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="course_name">
                <Form.Label style={{ fontWeight: 'bold' }}>Course name</Form.Label>
                <Form.Control type="text" ref={course_name_ref} placeholder="Enter Course Name" required />
              </Form.Group><br />
              <Form.Group id="password">
                <Form.Label style={{ fontWeight: 'bold' }}>Course code </Form.Label>
                <Form.Control style={{ textTransform: 'uppercase' }} type="text" ref={course_code_ref} placeholder="Enter Course Code" required />
              </Form.Group><br />
              {/* <Form.Group id="password-confirm">
              <Form.Label>Course photo</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group> */}
              <Form.Group id="button">
                <Button disabled={loading} type="submit">
                  &ensp;Add&ensp;
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
