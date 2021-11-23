import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Success({ match }) {

    const attend_success_msg = match.params.msg;
    const course_code = match.params.course_code;
    return (
        <div>
            {attend_success_msg === "attend" ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '17px'

                }}>
                    <Alert className="alert col-md-6 text-center br-5" variant="dark">
                        Sucessfully Attendance Submitted <br />
                        <Alert.Link href="#"><Link to={`/attendance-sheet/${course_code}`}><span>Back to attendance Sheet {course_code}</span></Link></Alert.Link>
                    </Alert>
                </div>
            ) : (
                ""
            )}

            {attend_success_msg === "remove" ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '17px'

                }}>
                    <Alert className="alert col-md-6 text-center br-5" variant="dark">
                        Sucessfully Unerolled '{course_code}' course  <br />
                        <Alert.Link href="#"><Link to="/"><span>Back to Home</span></Link></Alert.Link>
                    </Alert>
                </div>
            ) : (
                ""
            )}

            {attend_success_msg === "delete" ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '17px'

                }}>
                    <Alert className="alert col-md-6 text-center br-5" variant="dark">
                        Sucessfully deleted '{course_code}' course  <br />
                        <Alert.Link href="#"><Link to="/"><span>Back to Home</span></Link></Alert.Link>
                    </Alert>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Success;