import React from 'react';
import {Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Success({match}) {
   
   const attend_success_msg = match.params.msg;
   const course_code = match.params.course_code;
    return (
        <div>
            {attend_success_msg === "done" ? (
                    <div  style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '17px'

                    }}>
                        <Alert className="alert col-md-6 text-center br-5" variant="dark">
                            Sucessfully Attendance Submitted <br/>
                            <Alert.Link href="#"><Link to={`/attendance-sheet/${course_code}`}><span>Back to attendance Sheet {course_code}</span></Link></Alert.Link>
                        </Alert>
                    </div>
                ) : (
                    <h1>404 | Not Found</h1>
                )}
        </div>
    );
}

export default Success; 