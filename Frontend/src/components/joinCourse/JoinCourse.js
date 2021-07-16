import React, { useState } from 'react';
import axios from '../../config/axios';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useScrollTrigger } from '@material-ui/core';


function JoinCourse() {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [msg,setMsg] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        $(document).ready(function () {

            var pin = $('#search').val();
            var student_Id = $('#ID').val();
            axios.post(`/course/join`,{
                pin: pin,
                student_name : currentUser.displayName,
                student_Id : student_Id,
                student_email : currentUser.email
            })
                .then((res) => {
                    console.log(res);
                    if(res.data === "yes"){
                        history.push("/")
                        setMsg("")
                    }else{
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
            <h3>{msg}</h3>
            <form id="attend_sheet_form" onSubmit={handleSubmit}><br />
                <input type="text"  required id="search" placeholder="Enter Course pin" /><br></br><br />
                <input type="text"  required id="ID" placeholder="Enter student id" style={{ textTransform: 'uppercase' }}/><br></br><br />
                <Button type="submit" id="submit_button">Submit</Button>
            </form>
        </div>
    );
}

export default JoinCourse;