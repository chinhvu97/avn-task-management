import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AITaskAssignment from './pages/AITaskAssignment';
import TaskMonitoring from './pages/TaskMonitoring';
import StaffManagement from './pages/StaffManagement';
import Leaderboard from './pages/Leaderboard';
import DWSTaskTemplates from './pages/DWSTaskTemplates';
import DWSTemplateForm from './pages/DWSTemplateForm';
import WSTaskTemplates from './pages/WSTaskTemplates';
import WSTemplateForm from './pages/WSTemplateForm';
import ShiftSchedule from './pages/ShiftSchedule';
import LeaveRequests from './pages/LeaveRequests';
import Attendance from './pages/Attendance';
import Performance from './pages/Performance';
import StoreList from './pages/StoreList';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task-assignment" element={<AITaskAssignment />} />
          <Route path="/task-monitoring" element={<TaskMonitoring />} />
          <Route path="/dws-templates" element={<DWSTaskTemplates />} />
          <Route path="/dws-templates/create" element={<DWSTemplateForm />} />
          <Route path="/dws-templates/edit/:id" element={<DWSTemplateForm />} />
          <Route path="/ws-templates" element={<WSTaskTemplates />} />
          <Route path="/ws-templates/create" element={<WSTemplateForm />} />
          <Route path="/ws-templates/edit/:id" element={<WSTemplateForm />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/shift-schedule" element={<ShiftSchedule />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}
