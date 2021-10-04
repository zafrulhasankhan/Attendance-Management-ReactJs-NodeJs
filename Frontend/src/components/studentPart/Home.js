import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import axios from '../../config/axios';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import '../social.css/style.css';
function Home({ match }) {
    const { currentUser } = useAuth();
    const history = useHistory();
    const course_code = match.params?.course_code;
    const [msg, setMsg] = useState("");

    useEffect(() => {

        axios.get(`/course/joinedCourses/${currentUser.email}`)
            .then((res) => {
                let courses = [];
                for (let i = 0; i < res.data.length; i++) {
                    courses.push(res.data[i].course_code);
                }


                //check course exists as your under 
                if (!(courses.indexOf(course_code) !== -1)) {
                    history.push("/not-found")
                    setMsg("")
                }
                else {


                    axios.get(`/course/info/${course_code}`).then((result) => {
                        if ((result.data[0].email === currentUser.email)) {
                            history.push(`/attendance-sheet/${course_code}`)
                            setMsg("")
                        }
                        else {
                            setMsg("Found")
                        }
                    })
                }

            })

    }, [])
    return (
        <div>

            {msg ? (

                <Container className="text-center p-20" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    
                    <Card className=" h-600 card text-center bg-white">
                        <Card.Body>
                        <h3 className="text-center mb-4">Attendance report</h3>
                            <Link to={`/attendance-report-by-id/${course_code}`}><button className="button button--social-login button--id" >Attendance report by id</button></Link>&ensp;
                            <Link to={`/attendance-report-by-date/${course_code}`}><button className="button button--social-login button--date">Attendance report by date</button></Link>&ensp;
                            <Link to={`/attendance-report-by-course/${course_code}`}><button className="button button--social-login button--course">Attendance report by course</button></Link>&ensp;
                            <br/><br/>
                        </Card.Body>
                    </Card>
                    
                </Container>) : ""}
        </div>
    );
}

export default Home;