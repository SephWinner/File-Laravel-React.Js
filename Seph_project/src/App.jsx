import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', password);
    // const loginResponse = null;

    try {
      const loginResponse = await axios.post('http://127.0.0.1:8000/api/v1.0.0/login', formData);

      if (loginResponse.data.success) {
        toast.success(loginResponse.data.message);
        setIsLoading(false);
        // console.log(loginResponse.data.user.name)
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('username', loginResponse.data.user.name);
        setTimeout(function () {
          navigate("/dashboard");
        }, 2000);
      } else {
        // console.log(loginResponse);
        setIsLoading(false);
      }

    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Erreur:", error);
      console.error("Erreur message:", error.message);
      setIsLoading(false);

    }

  }

  return (
    <div className='body'>
      <ToastContainer />

      <form onSubmit={handleSubmit} className='login_form'>
        <input
          className='text_input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          className='text_input'
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <div>
          Vous n’avez pas de compte ?<br />
          Inscrivez-vous <Link to="/register" className=''>ici</Link>
        </div>
        <button type='submit' className='logo button circle_form'>
          {isLoading ? <div className='loader'></div> : "Login"}
        </button>
      </form>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  )
}

export default App
