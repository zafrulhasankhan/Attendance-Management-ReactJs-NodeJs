import React, { useState } from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Attendance_sheet from "./Attendance_Table/Attendance_sheet";
import Attendance_report_by_id from "./Attendance_report/Attendance_report_by_id"
import Attendance_report_by_date from "./Attendance_report/Attendance_report_by_date"
import Attendance_report_by_course from "./Attendance_report/Attendance_report_by_course"
import JoinedCourses from "./joinedCourses/JoinedCourses"
import add_course from "./add_course/Add_course"
import JoinCourse from "./joinCourse/JoinCourse"
import Home from "./studentPart/Home"
import Fillup_info from "./studentPart/Fillup_info";
import NotFound from "../NotFound";
import Topbar from './Topbar/Topbar';
import { useAuth } from "../contexts/AuthContext"
import PeopleList from "./People/PeopleList"
import UpdateCourse from "./UpdateCourse/UpdateCourse";
function App() {

  return (
    <>

      <Router>
        <AuthProvider>
          <Topbar />
        </AuthProvider>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh", backgroundColor: '#F3F4F6' }}
        >
          <div className="w-100" >


            <AuthProvider>

              <Switch>
                <Route path="/login" component={Signup} />
                <PrivateRoute exact path="/update-course/:course_code" component={UpdateCourse} />
                <PrivateRoute exact path="/people/:course_code" component={PeopleList} />
                <PrivateRoute exact path="/" component={JoinedCourses} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/home/:course_code" component={Home} />
                {/* <Route path="/fillup-info/:email" component={Fillup_info} /> */}
                <PrivateRoute path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute path="/join-course" component={JoinCourse} />
                {/* Attendance routes */}
                <PrivateRoute exact path="/attendance-sheet/:course_code" component={Attendance_sheet} />
                <PrivateRoute exact path="/attendance-report-by-id/:course_code" component={Attendance_report_by_id} />
                <PrivateRoute exact path="/attendance-report-by-date/:course_code" component={Attendance_report_by_date} />
                <PrivateRoute exact path="/attendance-report-by-course/:course_code" component={Attendance_report_by_course} />
                <PrivateRoute exact path="/dash" component={Dashboard} />
                <PrivateRoute exact path="/add-course" component={add_course} />
                <Route exact path="/not-found" component={NotFound} />

              </Switch>
            </AuthProvider>

          </div>
        </Container>
      </Router>
    </>
  )
}

export default App
