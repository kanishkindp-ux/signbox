import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        {/* The '/' path redirect using Navigate to avoid 1)multiple url to single page 2)avoid back button trap using replace */}
        <Route path="/" element={<Navigate to='/login' replace/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/> 
        <Route path="/UploadPage" element={<UploadPage/>}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;