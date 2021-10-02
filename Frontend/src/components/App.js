import React,{useState} from "react"
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
function App() {

  return (
    <>
    <AuthProvider>
     <Topbar />
    </AuthProvider>
    
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh",backgroundColor:'#F3F4F6' }}
    >
      <div className="w-100" >
      
        <Router>
       

          <AuthProvider>

            <Switch>
               
              
              <PrivateRoute exact path="/" component={JoinedCourses} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/home/:course_code" component={Home} />
              <Route path="/signup" component={Signup} />
              {/* <Route path="/fillup-info/:email" component={Fillup_info} /> */}
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/join-course" component={JoinCourse} />
              {/* Attendance routes */}
              <Route exact path="/attendance-sheet/:course_code" component={Attendance_sheet} />
              <Route exact path="/attendance-report-by-id/:course_code" component={Attendance_report_by_id} />
              <Route exact path="/attendance-report-by-date/:course_code" component={Attendance_report_by_date} />
              <Route exact path="/attendance-report-by-course/:course_code" component={Attendance_report_by_course} />
              <Route exact path="/dash" component={Dashboard} />
              <Route exact path="/add-course" component={add_course} />
              <Route exact path="/not-found" component={NotFound} />

            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
    </>
  )
}

export default App
