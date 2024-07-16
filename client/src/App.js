import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar/Navbar.jsx';
import Home from './component/home/Home.jsx';
import Signup from './component/signup/Signup.jsx';
import Signin from './component/signin/Signin.jsx';
import Course from './component/course/Course.jsx';
import Track from './component/track/Track.jsx';
import Step from './component/track/step/Step.jsx';
import Admin from './component/admin/Admin.jsx';
import CourseAdmin from './component/admin/CourseAdmin.jsx';
import UpdateCourse from './component/admin/UpdateCourse.jsx';
import AddCourse from './component/admin/AddCourse.jsx';
import AddStep from './component/admin/AddStep.jsx';
import UpdateStep from './component/admin/UpdateStep.jsx';
import StepAdmin from './component/admin/StepAdmin.jsx';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/user/userContext.js';














function App() {


  const { token, decode, setDecode, setToken } = useContext(UserContext);



  // logout 
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    setDecode(null);


    return '/signin';





  };






  /* -------------------------------------------------------------------------- */
  /*                                protect route                               */
  /* -------------------------------------------------------------------------- */
  function ProtectedRoute({ children }) {
    const { token, decode } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (token && decode) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }, [token, decode]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (!token) {
      return <Navigate to="/signin" />;
    } else {
      return children;
    }
  }
  
  function ProtectedAdminRoute({ children }) {
    const { token, decode } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      if (token && decode) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }, [token, decode]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (token) {
      if (decode.role === "admin") {
        return children;
      } else {
        return <Navigate to="/signin" />;
      }
    } else {
      return <Navigate to="/signin" />;
    }
  } 







  return (


    <div className='container'>

      <Navbar logOut={logOut} />



      <Routes>

        <Route path='home' element={<Home />} />
        <Route path='' element={<Home />} />


        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />


        {!token && decode ? '' : (<>

          <Route path='course' element={<ProtectedRoute><Course /></ProtectedRoute>} />
          <Route path='track/:cid' element={<ProtectedRoute><Track /></ProtectedRoute>}>
            <Route path='step' element={<ProtectedRoute><Step /></ProtectedRoute>}>
              <Route path=':tid' element={<ProtectedRoute><Step /></ProtectedRoute>} />

            </Route>
          </Route>




          <Route path='admin' element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
          <Route path='courseadmin/:id' element={<ProtectedAdminRoute><CourseAdmin /></ProtectedAdminRoute>} />
          <Route path='updatecourse/:id' element={<ProtectedAdminRoute><UpdateCourse /></ProtectedAdminRoute>} />
          <Route path='addcourse' element={<ProtectedAdminRoute><AddCourse /></ProtectedAdminRoute>} />

          <Route path='stepadmin/:id' element={<ProtectedAdminRoute><StepAdmin /></ProtectedAdminRoute>} />
          <Route path='addstep/:id' element={<ProtectedAdminRoute><AddStep /></ProtectedAdminRoute>} />
          <Route path='updatestep/:id' element={<ProtectedAdminRoute><UpdateStep /></ProtectedAdminRoute>} />


        </>)}

        <Route path='*' element={<h1>404</h1>} />

      </Routes>



    </div>


  );
}

export default App;
