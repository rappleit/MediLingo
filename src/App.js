import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { FaHome, FaCommentMedical, FaFileInvoice   } from "react-icons/fa";
import { useLocation } from 'react-router-dom'
import Sessions from './pages/Sessions';
import Reports from './pages/Reports';
import CreateSession from './pages/CreateSession';
import UploadReport from './pages/UploadReport';

function App() {
  const location = useLocation();
  return (

      <div className="App">
        <Sidebar className='sidebar'
          rootStyles={{
            position: "fixed",
            zIndex: 999,
            width: "20vw",
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#2f5a4f',
              color: '#fff',
              fontWeight: 600
            },
          }}>
          <Menu
           menuItemStyles={{
            button: ({ active }) => {
                return {
                  background: active ? '#4b826d' : undefined,
                  '&:hover': {
                    backgroundColor: '#4b826d',
                  },
                };
            },
          }}>
            <MenuItem icon={<FaHome />}component={<Link to="/" />} active={location.pathname==="/" ? true : undefined} >Home</MenuItem>
            <MenuItem icon={<FaCommentMedical />} component={<Link to="/sessions" />} active={location.pathname==="/sessions" ? true : undefined}>My Sessions</MenuItem>
            <MenuItem icon={<FaFileInvoice />} component={<Link to="/reports" />} active={location.pathname==="/reports" ? true : undefined}> My Reports</MenuItem>
          </Menu>
        </Sidebar>
        <Routes>
          <Route
            path="/"
            element={<Home />} />
            <Route
            path="/sessions"
            element={<Sessions />} />
            <Route
            path="/reports"
            element={<Reports />} />
            <Route
            path="/new_session"
            element={<CreateSession />} />
            <Route
            path="/new_report"
            element={<UploadReport />} />
        </Routes>

      </div>

  );
}

export default App;
