import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import axios from '../../config/axios';
import '../Attendance_Table/css/App.scss';
import { useAuth } from "../../contexts/AuthContext";

function PeopleList({ match }) {
    const course_code = match.params.course_code;
    const { currentUser } = useAuth();
    const [course_name, setcourse_name] = useState("");
    const [Total_student, setTotalStudent] = useState("");


    var breakOn = 'medium'
    let tableClass = 'table-container__table';
    if (breakOn === 'small') {
        tableClass += ' table-container__table--break-sm';
    } else if (breakOn === 'medium') {
        tableClass += ' table-container__table--break-md';
    } else if (breakOn === 'large') {
        tableClass += ' table-container__table--break-lg';
    }
    const headingColumns = ['Photo', 'Student ID', 'Name', 'Email']
    const headingColumns_with_action = ['Photo', 'Student ID', 'Name', 'Email', 'Action']
    const headingColumns2 = ['Photo', 'Name', 'Email']
    const [data, setData] = useState([]);
    const [techInfo, setTechInfo] = useState([]);



    useEffect(() => {
        axios.get(`/course/info/${course_code}`).then((result) => {
            setcourse_name(result.data[0].course_name)
        })
        SearchHandle();

    }, [])

    let SearchHandle = () => {

        axios.get(`people/${course_code}`).then((result) => {
            console.log(result.data);
            setData(result.data)

            result.data.forEach(async (item, index) => {
                try {
                    const result = await axios.get(`/user-info/${item.email}`);
                    const photo = result.data[0].profile_photo;
                    setData(data => data.map(
                        (el, i) => i === index
                            ? { ...el, photo }
                            : el)
                    )
                } catch (error) {
                    // log error, etc...
                }
            });

            //count student number
            axios.get(`/course/count/${course_code}`)
                .then((res_stu_count) => {
                    setTotalStudent(res_stu_count.data.length);
                })


            // teacher info retrieve
            axios.get(`course/info/${course_code}`)
                .then((res) => {

                    console.log(res?.data[0]?.email);
                    axios.get(`user-info/${res?.data[0]?.email}`)
                        .then((tecdata) => {
                            console.log(tecdata.data);
                            setTechInfo(tecdata.data[0]);

                        })
                })
            //close teacher retrieve

            // let student_photo = [];
            // let promises = [];
            // for (let i = 0; i < result.data.length; i++) {
            //     promises.push(

            //         axios.get(`/user-info/${result.data[i].email}`)
            //             .then((res) => {
            //                 student_photo.push(res?.data[0]?.profile_photo)
            //             })

            //     )

            // }
            // Promise.all(promises).then(() => {
            //     setStudentsPhoto(student_photo);
            // })
        }).catch((err) => console.log(err))


    }

    async function removebyTeacher(email) {
        axios.post(`/course/removebyTeacher/${course_code}/${email}`)
            .then((result) => {
                console.log(result.data);
            })
        SearchHandle();
        SearchHandle();

    }


    return (
        <div>

            <div>

                <div className="table-container" style={{ backgroundColor: 'white' }}>
                    <div className="table-container__title">
                        <h5>People -- {course_name} ({course_code})</h5>
                    </div>
                    <h5 style={{ padding: '12px', marginLeft: '5px', fontWeight: 'bold' }}>Teacher</h5>
                    <table style={{ outline: 'none', border: 'none' }} className={tableClass}>
                        <thead>
                            <tr>
                                {headingColumns2.map((col, index) => (
                                    <th data-heading={index} key={index}>{col}</th>

                                ))}

                            </tr>
                        </thead>
                        <tbody>



                            <tr>
                                <td style={{ outline: 'none' }} data-heading="Photo">
                                    {techInfo?.profile_photo ? (
                                        <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                                            src={techInfo?.profile_photo} alt="" />
                                    ) : (
                                        <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                                            src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg" alt="" />

                                    )}

                                </td>

                                <td data-heading="Teacher Name">{techInfo?.name} </td>
                                <td data-heading="Teacher Email"><span style={{ fontSize: '11.5px' }}>{techInfo?.email}</span> </td>

                            </tr>

                        </tbody>
                    </table><br />




                    <br />
                    {data.length ? (
                        <div>
                            <h5 style={{ padding: '10px', marginLeft: '5px', fontWeight: 'bold' }}>Student ({Total_student})</h5>

                            <table style={{ outline: 'none', border: 'none' }} className={tableClass}>
                                <thead>
                                    <tr>
                                        {(currentUser.email !== techInfo.email) ? (
                                            <>
                                                {headingColumns.map((col, index) => (
                                                    <th data-heading={index} key={index}>{col}</th>

                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {headingColumns_with_action.map((col, index) => (
                                                    <th data-heading={index} key={index}>{col}</th>

                                                ))}
                                            </>
                                        )}

                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((val, index) => (
                                        <tr key={val.student_name}>
                                            {console.log(data)}
                                            <td style={{ outline: 'none' }} data-heading="Photo">
                                               
                                                {val.photo && val.photo ? (
                                                    <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                                                        src={val.photo}  />
                                                ) : (
                                                    <img style={{ borderRadius: '150px', height: '40px', width: '40px' }}
                                                        src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg" alt="" />
                                                )}
                                            </td>
                                            <td style={{ outline: 'none' }} data-heading="Student ID">{val.student_id}</td>
                                            <td data-heading="Student Name">{val.student_name} </td>
                                            <td data-heading="Student Email">
                                                <span style={{ fontSize: '11.5px' }}>{val.email}</span>
                                            </td>
                                            {(currentUser.email === techInfo.email) ? (
                                                <td data-heading="Action">
                                                    <Button onClick={() => removebyTeacher(val.email)} className="btn btn-danger" style={{ fontSize: '11.5px' }}>Remove</Button>
                                                </td>
                                            ) : ""}

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <Alert className="md-4 w-100" variant="dark">
                                No Student have been added yet
                            </Alert>
                        </div>
                    )}
                    <br />
                </div>


            </div>
            {/* ) : ""} */}
        </div>

    );
}

export default PeopleList;