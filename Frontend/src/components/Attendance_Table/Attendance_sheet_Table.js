import React, { useState, useEffect } from 'react';
import { useHistory,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from "jquery";
import { Button, Form, Row, Container, Col, Dropdown, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import axios from '../../config/axios';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Height } from '@material-ui/icons';

const Table = ({ tableData, headingColumns, title, breakOn = 'medium', course_code, course_name }) => {

  const [classNo, setClassNo] = useState(0);
  const history = useHistory()

  let tableClass = 'table-container__table';
  if (breakOn === 'small') {
    tableClass += ' table-container__table--break-sm';
  } else if (breakOn === 'medium') {
    tableClass += ' table-container__table--break-md';
  } else if (breakOn === 'large') {
    tableClass += ' table-container__table--break-lg';
  }


  //attendance data make to array of objects
  useEffect(() => {
    document.getElementById('submit_button').click();
    axios.post("/attend/check_classNum", {
      course_code: course_code
    }).then((res) => {
      setClassNo(res.data.length);
    }).catch((err) => {
      console.log(err);
    })



  }, [])



  let handleSubmit = (e) => {

    e.preventDefault();
    $.fn.serializeObject = function (data) {
      var els = $(this).find(':input').get();
      if (typeof data != 'object') {
        // return all data
        data = {};

        $.each(els, function () {
          if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
            data[this.placeholder] = $(this).val();
          }
        });
        return data;
      }
    };


    $(document).ready(function () {
      $("#attend_sheet_form").on("submit", function (event) {
        document.getElementById('date').valueAsDate = new Date();
        var date = $('#date').val();


        var data = [];
        $(this).find(".inputContainer tr").each(function () {
          data[data.length] = $(this).serializeObject();
        })
        var carDataString = JSON.stringify(data);

        //get last class from db 
        axios.post("/attend/check_classNum", {
          course_code: course_code
        }).then((res) => {

          axios.post('/attend/submit', {
            course_code: course_code,
            class_num: res.data.length + 1,
            attendance_data: carDataString,
            date: date
          }
          ).then((res) => {
            console.log(res);
            history.push("/");
          }).catch((err) => {
            console.log(err);
          })

        })
          .catch((err) => console.log(err))


        $("input[name='AllCarData']").val(carDataString);
        return false
      });

    })


  }

  return (
    <div className="table-container" style={{ backgroundColor: 'white' }}>
      <div className="table-container__title">
        <h5>{course_name}({title})</h5>
      </div>

      <br />


      <Container>
        <Row>
          <Col>Today's class No. : <span style={{ fontWeight: 'bold' }}>{classNo + 1}</span></Col>
          <Col style={{ textAlign: 'center',padding:'10px' }}>
            <Dropdown>
              <Dropdown.Toggle  variant="default" style={{backgroundColor:'#FAEBD7'}} bsPrefix="p-0">
                <span style={{padding:'17px',fontWeight:'bold'}}>Attendance report</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item ><Link style={{textDecoration:'inherit',color:'inherit'}} to={`/attendance-report-by-id/${course_code}`}>Report by ID</Link></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item > <Link style={{textDecoration:'inherit',color:'inherit'}} to={`/attendance-report-by-date/${course_code}`}>Report by date</Link></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item ><Link style={{textDecoration:'inherit',color:'inherit'}} to={`/attendance-report-by-course/${course_code}`}>Report by All </Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Form.Group className="offset-md-4" controlId="exampleForm.ControlInput1">
              {/* <Form.Label ><b>Enter Date:</b></Form.Label> */}
              <Form.Control type="date" required id="date" />
            </Form.Group>
          </Col>
        </Row>
      </Container>

      <form id="attend_sheet_form" onSubmit={handleSubmit}><br />

        <table striped bordered hover className={tableClass} >
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th data-heading={index} key={index}>{col}</th>

              ))}

            </tr>
          </thead>
          <tbody className="inputContainer">

            {tableData.map((data, index) => (

              <tr key={data}>

                <td data-heading="Student ID">
                  {data.student_id}
                  <input type="text" hidden name="student_id" placeholder="student_id" value={data.student_id} />
                </td>
                <td data-heading="Student Name" >
                  {data.student_name}
                  <input type="text" hidden name="student_name" placeholder="student_name" value={data.student_name} />
                </td>
                <td data-heading="Student Email" >
                  <span style={{ fontSize: '12px' }}>{data.email}</span>
                  <input type="text" hidden name="student_email" placeholder="student_email" value={data.email} />
                </td>
                <td data-heading="Present"  >
                  <input type="radio" name={index} placeholder="present" value="present" required required />
                </td>
                <td data-heading="Absent" >
                  <input type="radio" name={index} placeholder="absent" value="absent" required required />
                </td>
              </tr>


            ))}
          </tbody>
        </table><br />
        <div style={{ textAlign: 'center', paddingBottom: '5px' }}>
          <Button type="submit" id="submit_button">&ensp;Submit&ensp;</Button><br />
        </div>
      </form>
    </div>
  );
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large'])
}

export default Table;

