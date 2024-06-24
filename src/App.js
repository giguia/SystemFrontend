import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import LeadGenDashboard from './pages/leadgen/LeadGenDashboard'
import LeadGenLeads from './pages/leadgen/LeadGenLeads'
import AddForm from './pages/leadgen/AddForm'
import EditForm from './pages/leadgen/EditForm'
import ReadForm from './pages/leadgen/ReadForm'
import LoginLG from './pages/leadgen/LoginLG'
import AgentDashboard from './pages/agent/AgentDashboard'
import AgentAnalytics from './pages/agent/AgentAnalytics'
import AgentEditForm from './pages/agent/AgentEditForm'
import AgentReadForm from './pages/agent/AgentReadForm'
import AgentLeads from './pages/agent/AgentLeads'
import AgentEmails from './pages/agent/AgentEmails'
import AgentReadEmail from './pages/agent/AgentReadEmail'
import AddEmail from './pages/agent/AddEmail'
import AdminLeads from './pages/admin/AdminLeads'
import AdminUsers from './pages/admin/AdminUsers'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminSignup from './pages/admin/AdminSignup'
import AdminEmails from './pages/admin/AdminEmails'
import AdminBookings from './pages/admin/AdminBookings'
import AdminStaff from './pages/admin/AdminStaff'
import ReadLead from './pages/admin/ReadLead'
import ReadEmail from './pages/admin/ReadEmail'
import AssignPage from './pages/admin/AssignPage'
import ReadProfile from './pages/admin/ReadProfile'
import ReadUserInfo from './pages/profile/ReadUserInfo'
import EditUserInfo from './pages/profile/EditUserInfo'
import ReadUserLG from './pages/profile/ReadUserLG'
import EditUserLG from './pages/profile/EditUserLG'
import ReadUserAG from './pages/profile/ReadUserAG'
import EditUserAG from './pages/profile/EditUserAG'

function App() {
  const { userLG } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>

        <div className="pages">
          <Routes>
            <Route path="/" element={userLG ? (
              userLG.role === "Lead Generation" ? <LeadGenDashboard /> : (
                userLG.role === "Telemarketer" ? <AgentDashboard /> :
                  userLG.role === "Team Leader" ? <AdminDashboard /> : <Navigate to="/loginLG" />
              )
            ) : <Navigate to="/loginLG" />} />

            <Route path="/viewuser/:id" element={userLG ? (
              userLG.role === "Lead Generation" ? <ReadUserLG /> : (
                userLG.role === "Telemarketer" ? <ReadUserAG /> :
                  userLG.role === "Team Leader" ? <ReadUserInfo /> : <Navigate to="/loginLG" />
              )
            ) : <Navigate to="/loginLG" />} />

            <Route
              path="/viewemail/:id" element={userLG ? (
                userLG.role === "Telemarketer" ? (<AgentReadEmail />
                ) : userLG.role === "Team Leader" ? (<ReadEmail />
                ) : null) : (<Navigate to="/loginLG" />
                )} />

            <Route path="/useredit/:id" element={userLG ? (
              userLG.role === "Lead Generation" ? <EditUserLG /> : (
                userLG.role === "Telemarketer" ? <EditUserAG /> :
                  userLG.role === "Team Leader" ? <EditUserInfo /> : <Navigate to="/loginLG" />
              )
            ) : <Navigate to="/loginLG" />} />

            <Route path="/LeadGenAdd" element={userLG ? <AddForm /> : <Navigate to="/loginLG" />} />
            <Route path="/edit/:id" element={userLG ? <EditForm /> : <Navigate to="/loginLG" />} />
            <Route path="/agentedit/:id" element={userLG ? <AgentEditForm /> : <Navigate to="/loginLG" />} />
            <Route path="/view/:id" element={userLG ? <ReadForm /> : <Navigate to="/loginLG" />} />
            <Route path="/agentview/:id" element={userLG ? <AgentReadForm /> : <Navigate to="/loginLG" />} />
            <Route path="/LeadGenLeads" element={userLG ? <LeadGenLeads /> : <Navigate to="/loginLG" />} />
            <Route path="/AgentLeads" element={userLG ? <AgentLeads /> : <Navigate to="/loginLG" />} />
            <Route path="/AgentEmails" element={userLG ? <AgentEmails /> : <Navigate to="/loginLG" />} />
            <Route path="/AgentAdd" element={userLG ? <AddEmail /> : <Navigate to="/loginLG" />} />
            <Route path="/AgentService" element={userLG ? <AgentAnalytics /> : <Navigate to="/loginLG" />} />

            <Route path="/AdminLeads" element={userLG ? <AdminLeads /> : <Navigate to="/loginLG" />} />
            <Route path="/AdminUsers" element={userLG ? <AdminUsers /> : <Navigate to="/loginLG" />} />
            <Route path="/AdminSignup" element={userLG ? <AdminSignup /> : <Navigate to="/loginLG" />} />
            <Route path="/AdminEmails" element={userLG ? <AdminEmails /> : <Navigate to="/loginLG" />} />
            <Route path="/AdminBookings" element={userLG ? <AdminBookings /> : <Navigate to="/loginLG" />} />
            <Route path="/AdminStaff" element={userLG ? <AdminStaff /> : <Navigate to="/loginLG" />} />
            <Route path="/viewprofile/:id" element={userLG ? <ReadProfile /> : <Navigate to="/loginLG" />} />
            <Route path="/TLview/:id" element={userLG ? <ReadLead /> : <Navigate to="/loginLG" />} />
            <Route path="/TLedit/:id" element={userLG ? <AssignPage /> : <Navigate to="/loginLG" />} />

            {/* Login Route */}
            <Route path="/loginLG" element={!userLG ? <LoginLG /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
