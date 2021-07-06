import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { facebookProvider, githubProvider, googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/auth';
import axios from '../config/axios';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      console.log(emailRef.current.value);
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create Account")
    }

    setLoading(false)
  }

  //const [data,setData] = useState([]);
  const handleOnclick = async (provider) => {
    const res = await socialMediaAuth(provider);
    //  setData(res?.providerData[0]);
   // console.log(res?.providerData[0].displayName);
    axios.post('/register',{
      name: res?.providerData[0].displayName,
      email:res?.providerData[0].email,
      profile_photo: res?.providerData[0].photoURL
  }).then((result)=>{
     
  }).catch((err)=>console.log(err))
    history.push("/")
    
  }

  return (
    <>
      <Card style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <h2>Or</h2>
      <Button className="w-100" onClick={() => handleOnclick(googleProvider)}>Google</Button><br /><br />
      <Button className="w-100" onClick={() => handleOnclick(facebookProvider)}>Facebook</Button><br /><br />
      <Button className="w-100" onClick={() => handleOnclick(githubProvider)}>Github</Button><br /><br />
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
