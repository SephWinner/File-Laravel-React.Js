import React, { useEffect, useState } from 'react'
import './RightBox.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RightBox({ groupSelection }) {

    const [email, setEmail] = useState();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading_add, setIsLoading_add] = useState(false);

    useEffect(() => { usersRequestFunction() }, [groupSelection]);

    const usersRequestFunction = async (e) => {
        const users = async () => {
            const allusersResponse = await axios.get('http://127.0.0.1:8000/api/v1.0.0/showUers', {
                headers: { 'Authorization': `Bearer ` + localStorage.getItem('token') }
            })
            console.log(allusersResponse.data);

            setUsers(() => allusersResponse.data)

            setIsLoading(() => false);
        }
        users();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading_add(() => true)
        setTimeout(function () {
            if (!isLoading_add) {
                setIsLoading_add(() => false);
                // toast.error('erreur lors de l\'envoie de l\'invitation');
            }
        }, 10000);

        const inviteFormData = new FormData();
        inviteFormData.set('email', email);
        const inviteResponse = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/invitation/${groupSelection.id}`, inviteFormData, {
            headers: { 'Authorization': `Bearer ` + localStorage.getItem('token') }
        })

        console.log(inviteResponse.data.message);
        console.log(inviteResponse.data);
        setEmail(() => '');
        toast(inviteResponse.data.message);
        setIsLoading_add(() => false)

    }

    const handleSubmit2 = async (id) => {
        const addResponse = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/addMember/${id}/${groupSelection.id}`, [], {
            headers: { 'Authorization': `Bearer ` + localStorage.getItem('token') }
        })

        console.log(addResponse.data.message);
        console.log(addResponse.data);
        toast('addResponse.data.message');
    }

    return (
        <div className='right_css'>
            <ToastContainer />
            <form onSubmit={handleSubmit} action="" className='invite_form_css'>
                <input
                    type="email"
                    placeholder='Inviter par email...'
                    className='invite_input_css'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <button type='submit' className='button'>{
                    !isLoading_add ? (
                        <div>Envoyer</div>
                    ) : (
                        <div className='loader5'></div>
                    )
                }</button>
            </form>
            <div className='users_zone'>
                {
                    !isLoading ? (
                        users && users.length > 0 ? (
                            users.map(user => (
                                <form
                                    className='users'
                                    key={user.id}
                                    onSubmit={
                                        (e) => {
                                            e.preventDefault();
                                            handleSubmit2(user.id);
                                        }
                                    }
                                >
                                    {user.name}
                                    <button type='submit' style={{ width: '60px' }}>Ajouter</button>
                                </form>
                            ))
                        ) : (null)
                    ) : (null)
                }
            </div>
        </div>
    )
}
