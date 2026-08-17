import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>

        {/* the '/' path redirect to avoid 1)multiple url to single page 2)back button trap */}

        <Route path="/" element={<Navigate to='/login' replace/>}/>
        
      </Routes>
    </BrowserRouter> 
  );
}

export default App;