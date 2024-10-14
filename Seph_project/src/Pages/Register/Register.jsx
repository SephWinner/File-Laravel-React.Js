import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('password_confirmation', password_confirmation);
        // const loginResponse = null;

        try {
            const registerResponse = await axios.post('http://127.0.0.1:8000/api/v1.0.0/register', formData);

            if (registerResponse.data.success) {
                toast.success('Inscription réussie');
                setIsLoading(false);
                setTimeout(function () {
                    navigate("/");
                }, 2000);
            } else {
                // console.log(loginResponse);
                setIsLoading(false);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Erreur:", error.response.data);
            if (error.response.data.name != null) {
                // console.log(error.response.data.name[0]);
                toast.error(error.response.data.name[0]);
            }
            if (error.response.data.email != null) {
                // console.log(error.response.data.email[0]);
                toast.error(error.response.data.email[0]);
            }
            if (error.response.data.password != null) {
                // console.log(error.response.data.password[0]);
                toast.error(error.response.data.password[0]);
            }
            if (error.response.data.password_confirmation != null) {
                // console.log(error.response.data.password_confirmation[0]);
                toast.error(error.response.data.password_confirmation[0]);
            }
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
                    type="text"
                    placeholder="Nom et prénom"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
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
                <input
                    className='text_input'
                    placeholder="Confirmation du mot de passe"
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => {
                        setPassword_confirmation(e.target.value)
                    }}
                />
                <div>
                    Vous avez déjà de compte ?<br />
                    Connectez-vous <Link to="/" className=''>ici</Link>
                </div>
                <button type='submit' className='logo button circle_form'>
                    {isLoading ? <div className='loader'></div> : "Register"}
                </button>
            </form>
        </div>
    )
}
