import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { FaHome, FaCommentMedical, FaFileInvoice } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import CreateSession from './pages/CreateSession';
import UploadReport from './pages/UploadReport';
import logo_white from "./assets/logo_white.png"

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
          <div style={{ "width": "100%", "display": "flex", "justifyContent": "center", "flexDirection": "column", "alignItems": "center", "marginBottom": "12px"}}>
            <img src={logo_white} alt="" width="120px" />
            <h2>MediLingo</h2>

          </div>
          <MenuItem icon={<FaHome />} component={<Link to="/" />} active={location.pathname === "/" ? true : undefined} >Home</MenuItem>
          <MenuItem icon={<FaCommentMedical />} component={<Link to="/new_session" />} active={location.pathname === "/new_session" ? true : undefined}>Create Session</MenuItem>
          <MenuItem icon={<FaFileInvoice />} component={<Link to="/new_report" />} active={location.pathname === "/new_report" ? true : undefined}>Analyse Report</MenuItem>
        </Menu>
      </Sidebar>
      <Routes>
        <Route
          path="/"
          element={<Home />} />
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
