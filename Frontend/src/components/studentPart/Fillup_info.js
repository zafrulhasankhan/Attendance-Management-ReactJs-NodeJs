import React from 'react';
import $ from 'jquery';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import axios from '../../config/axios';
import { Button } from 'react-bootstrap';

function Fillup_info({match}) {
    const email = match.params.email;
    const history = useHistory();
    let SearchHandle = (e) => {
        e?.preventDefault();
        $(document).ready(function () {
            var IdValue = $('#ID').val();
            axios.post("/update-info",{
                student_id : IdValue,
                student_email:email
            }).then((res)=>{
                history.push("/"); 
            })
        })

    }
    return (
        <div>
            <form id="attend_sheet_form" onSubmit={SearchHandle}><br />
                <input type="text" required id="ID" style={{ textTransform: 'uppercase' }} placeholder="Enter Student ID" /><br></br><br />
                <Button type="submit" id="submit_button">Submit</Button>
            </form>
        </div>
    );
}

export default Fillup_info;