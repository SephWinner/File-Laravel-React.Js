import React, { useState } from 'react'
import './CreateGroup.css'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function CreateGroup({ setGroupScreen, setRefresh, refresh }) {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', desc);
        // const groupResponse = null;

        try {
            const groupResponse = await axios.post('http://127.0.0.1:8000/api/v1.0.0/create/', formData, {
                headers: { 'Authorization': `Bearer ` + localStorage.getItem('token') }
            });

            console.log(groupResponse)
            toast.success(groupResponse.data.message);
            setIsLoading(false);
            setDesc(() => '')
            setName(() => '')
            setRefresh(() => refresh + 1);

        } catch (error) {
            // toast.error(error.response.data.message);
            console.error("Erreur:", error);
            console.error("Erreur message:", error.message);
            setIsLoading(false);

        }

    }

    const backgroundClick = () => { setGroupScreen(() => false) }

    return (
        <div
            className='group_screen'
            onClick={() => (
                backgroundClick()
            )}
        >
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                action=""
                className='group_form'
                onClick={e => e.stopPropagation()}
            >
                <input
                    type="text"
                    placeholder='Nom du groupe'
                    className='group_input'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <textarea
                    name=""
                    id=""
                    type="text"
                    placeholder='Description du groupe'
                    className='group_textarea'
                    value={desc}
                    onChange={(e) => {
                        setDesc(e.target.value)
                    }}
                ></textarea>
                {/* <button className='group_button' type='submit'>Créer</button> */}
                <button type='submit' className='logo button circle_form'>
                    {isLoading ? <div className='loader'></div> : "Créer"}
                </button>
            </form>
        </div>
    )
}
