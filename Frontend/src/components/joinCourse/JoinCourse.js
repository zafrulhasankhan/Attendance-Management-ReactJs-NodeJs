import React from 'react';
import axios from '../../config/axios';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import { Link, useHistory } from "react-router-dom";



function JoinCourse() {

    const history = useHistory();
    function handleSubmit(e) {
        e.preventDefault()
        $(document).ready(function () {

            var pin = $('#search').val();
            console.log(pin);
            axios.get(`/course/${pin}`)
                .then((res) => {
                    if(res.status){
                        history.push("/")
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
    }
    return (
        <div>
            <form id="attend_sheet_form" onSubmit={handleSubmit}><br />
                <input type="text"  required id="search" placeholder="Enter Course pin" /><br></br><br />
                <Button type="submit" id="submit_button">Submit</Button>
            </form>
        </div>
    );
}

export default JoinCourse;