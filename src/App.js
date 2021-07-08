import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register'
import Footer from './components/footer/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/nav/Navbar';
import {Switch,Route} from 'react-router-dom'
import Home from './components/home/Home'
import RegistComplete from './components/register/RegistComplete'
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscrib= auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult=await user.getIdTokenResult();
        console.log(user)
        dispatch({
          type:'LOGED_IN_USER',
          payload:{
            name:user.name,
            email:user.email,
            token:idTokenResult.token
          }
        })
      }
    })
    return ()=>unsubscrib()
  },[])
  return (
    <>
    <Navbar/>
    <ToastContainer/>
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route exact path='/login'>
        <Login/>
      </Route>
      <Route exact path='/signup'>
        <Register/>
      </Route>
      <Route exact path='/signup/complete'>
        <RegistComplete/>
      </Route>
    </Switch>
    {/* <Login/>
    <Register/>
    <Footer/> */}

    </>
  );
}

export default App;
