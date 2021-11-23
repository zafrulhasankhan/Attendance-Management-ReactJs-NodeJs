import React from "react"
import { Card, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { facebookProvider, githubProvider, googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/auth';
import axios from '../config/axios';
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import './social.css/style.css';



export default function Signup() {

  const history = useHistory()

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //     return setError("Passwords do not match")
  //   }

  //   try {
  //     console.log(emailRef.current.value);
  //     setError("")
  //     setLoading(true)
  //     await signup(emailRef.current.value, passwordRef.current.value)
  //     history.push("/joinedCourses")
  //   } catch {
  //     setError("Failed to create Account")
  //   }

  //   setLoading(false)
  // }

  const handleOnclick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res?.providerData[0].email);
    axios.post('/register', {
      name: res?.providerData[0]?.displayName,
      email: res?.providerData[0]?.email,
      profile_photo: res?.providerData[0]?.photoURL
    }).then((result) => {
      console.log("result" + result.data.length);
      if (result.data.length) {
        history.push("/");
      }
      else {
        history.push("/signup")
      }

    }).catch((err) => console.log(err))



  }


  return (
    <>
      <h4 style={{fontFamily:'cursive',textAlign:'center',position:'relative',top:'-70px'}}> Welcome to Attendance Management System </h4>
      <Container className="text-center p-20" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>

        <Card className=" h-600 card text-center bg-white">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <a className="button button--social-login button--google" onClick={() => handleOnclick(googleProvider)}><FaGoogle className="icon fa fa-google" />Login with Google</a>
            <a className="button button--social-login button--github" onClick={() => handleOnclick(githubProvider)}><FaGithub className="icon fa fa-github" />Login with GitHub</a>
            <a className="button button--social-login button--facebook" onClick={() => handleOnclick(facebookProvider)}><FaFacebookF className="icon fa fa-facebook" />Login with Facebook</a>

          </Card.Body>
        </Card>
        <br></br>
      </Container>
    </>
  )
}
