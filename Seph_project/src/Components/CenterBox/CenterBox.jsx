import React, { useEffect, useState } from 'react'
import './CenterBox.css'
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa'
import { MdDownloadForOffline } from 'react-icons/md'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export default function CenterBox({ groupSelection, refresh, setRefresh }) {

    const [name, setName] = useState(localStorage.getItem('username'));
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        console.log(groupSelection);
        fileRequestFunction();
    }, [groupSelection, refresh])

    const fileRequestFunction = async (e) => {
        const files = async () => {
            const allfileResponse = await axios.get(`http://127.0.0.1:8000/api/v1.0.0/show_file/${groupSelection?.id}`, {
                headers: { 'Authorization': `Bearer ` + localStorage.getItem('token') }
            })
            console.log(allfileResponse.data);

            setFiles(() => allfileResponse.data)

            setIsLoading(() => false);
        }
        files();
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadProgress(0);
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Veuillez selectionner un fichier.');
            return;
        }

        setIsLoading1(() => true);

        const fileFormData = new FormData();

        fileFormData.append('file', selectedFile);

        console.log(selectedFile);


        const fileResponse = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/send_file/${groupSelection?.id}`, fileFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
            },

            onUploadProgress: (e) => {
                const level = Math.round((e.loaded * 100) / e.total);
                setUploadProgress(level)
            }
        })


        console.log(fileResponse);

        setIsLoading1(() => false);
        setSelectedFile(() => null);
        setRefresh(() => refresh + 1);
        setUploadProgress(0);
    }

    function formatFileSize(size) {
        if (size === 0) return "0 Bytes";

        const factor = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(factor));

        return parseFloat((size / Math.pow(factor, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const formatDate = (date) => {
        return moment(date).format('HH:mm');
    }
    const formatDate2 = (date) => {
        return moment(date).format('DD/MM/YYYY HH:mm');
    }

    return (
        <div className='center_css'>
            <ToastContainer />
            <div className='top_css'>
                {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}> */}
                <div className='group_infos'>
                    <h3>Utilisateur: {name || 'Vous n\'êtes pas connecter'}</h3>
                    <h3>Groupe: {groupSelection?.name || 'Selectionnez un groupe'}</h3>
                </div>
                <form onSubmit={handleFileSubmit} action="" style={{
                    display: 'flex',
                    gap: '10px',
                    flexDirection: 'column',
                    backgroundColor: 'rgb(180, 180, 255)',
                    borderRadius: '10px',
                    minWidth: '250px',
                    padding: '10px',
                    maxWidth: '470px'
                }}>
                    <input type="file" hidden id='file' onChange={handleFileChange} />
                    <button hidden id='button'></button>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <label htmlFor="file"><FaPaperclip size={28} className='icones' /></label>
                        {
                            uploadProgress > 0 && (
                                <div>
                                    <progress value={uploadProgress} max="100"></progress>
                                    <div>{uploadProgress}%</div>
                                </div>
                            )
                        }
                        <label htmlFor="button">
                            {
                                !isLoading1 ? (
                                    <FaPaperPlane size={28} className='icones' />
                                ) : (
                                    <div className='loader1'></div>
                                )
                            }
                        </label>
                    </div>
                    {
                        selectedFile ? (
                            <ul>
                                <li>Dernière modification: {formatDate2(selectedFile.lastModified)}</li>
                                <li>Nom: {selectedFile.name}</li>
                                <li>Taile: {formatFileSize(selectedFile.size)}</li>
                                <li>Type: {selectedFile.type}</li>
                            </ul>
                        ) : (null)
                    }
                </form>
            </div>
            <div className='file_zone'>
                {
                    !isLoading ? (
                        files && files.length > 0 ? (
                            files.map(
                                file => (
                                    <div className='file_container' key={file.id}>
                                        <div className='file_container2'>
                                            Envoyé par : {file.sender_name} <br />
                                            Nom du fichier : {file.file_name} <br />
                                            Type du fichier : {formatFileSize(file.file_size)} <br />
                                            Date : {formatDate(file.created_at)} <br />
                                        </div>
                                        <a href={`http://127.0.0.1:8000/storage/${file.file_path}`}>
                                            <MdDownloadForOffline size={38} className='icones' />
                                        </a>

                                    </div>
                                )
                            )
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100vh',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>Aucun fichier dans ce groupe</div>
                        )
                    ) : (
                        <div className='loading'><div className='loader3'></div></div>
                    )
                }
            </div>



        </div >
    )
}
