import React from "react"
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
import Attendance_report_by_id from "./Attendance_Table/Attendance_report_by_id"

function App() {
  return (
    // <Attendance_sheet />
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" >
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              {/* Attendance routes */}
              <Route exact path="/attendance-sheet" component={Attendance_sheet} />
              <Route exact path="/attendance-report-by-id" component={Attendance_report_by_id} />

            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
