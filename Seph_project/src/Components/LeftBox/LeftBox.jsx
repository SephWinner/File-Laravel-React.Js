import React, { useEffect, useState } from 'react'
import './LeftBox.css'
import { IoMdAddCircle } from 'react-icons/io'
import axios from 'axios'

export default function LeftBox({ setGroupSelection, setGroupScreen, refresh, setAutoRefresh, autoRefresh }) {

    const [group, setGroup] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { groupRequestFunction() }, [refresh]);

    const groupRequestFunction = async (e) => {
        const groupes = async () => {
            const allgroupeResponse = await axios.get('http://127.0.0.1:8000/api/v1.0.0/readGroup', {
                headers: { 'Authorization': `Bearer ` + localStorage.getItem('token') }
            })
            console.log(allgroupeResponse.data);

            setGroup(() => allgroupeResponse.data)

            setIsLoading(() => false);
        }
        groupes();
    }

    const groupClick = (group) => { setGroupSelection(() => group) }
    const groupIconeClick = () => { setGroupScreen(() => true) }

    return (
        <div className='left_css'>
            {/* <form className='create_group'>
                <input type="text" />
                <input type="text" />
            </form> */}
            {
                !isLoading ? (
                    group && group.length > 0 ? (
                        group.map(
                            groupInfos => (
                                <div
                                    className='groupes'
                                    key={groupInfos.id}
                                    onClick={() => (
                                        groupClick(groupInfos),
                                        console.log(groupInfos)
                                    )}
                                >{groupInfos.name}</div>
                            )
                        )
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100vh',
                            display: 'flex',
                            gap: '20px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: 'blue'
                        }}>
                            <p>Vous n'êtes dans aucun groupe</p>
                            <p>Créer un groupe pour commencer</p>
                        </div>
                    )
                ) : (
                    <div className='loading'><div className='loader3'></div></div>
                )
            }


            <IoMdAddCircle
                size={45}
                className='add_group_icone'
                onClick={() => (
                    groupIconeClick()
                )} />
        </div>
    )
}
