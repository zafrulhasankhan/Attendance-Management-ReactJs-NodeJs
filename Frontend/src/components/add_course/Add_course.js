import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from '../../config/axios';


export default function Add_course() {

  const course_name_ref = useRef()
  const course_code_ref = useRef()
  // const passwordConfirmRef = useRef()
  const { signup,currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // if (course_code_ref.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    try {
      
      setError("")
      setLoading(true)
      axios.post("/course/add",{
        course_name : course_name_ref.current.value,
        course_code : course_code_ref.current.value,
        course_pin  :  Math.random().toString(36).substring(7),
        course_owner_email : currentUser.email
      }).then((res)=>{
        console.log(res.status);
        if(res.status){
          history.push("/")
        }
      })
      
    } catch {
      setError("Failed to create Account")
    }

    setLoading(false)
  }



  return (
    <>
      <Card style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Add Course</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="course_name">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" ref={course_name_ref} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Course code </Form.Label>
              <Form.Control type="text" ref={course_code_ref} required />
            </Form.Group><br/>
            {/* <Form.Group id="password-confirm">
              <Form.Label>Course photo</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group> */}
            <Form.Group id="button">
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
              </Form.Group>
          </Form>
        </Card.Body>
    </Card>
    </>
  )
}
