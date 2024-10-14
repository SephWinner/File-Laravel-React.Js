import React, { useState } from 'react'
import LeftBox from '../../Components/LeftBox/LeftBox'
import CenterBox from '../../Components/CenterBox/CenterBox'
import RightBox from '../../Components/RightBox/RightBox'
import './Dashboard.css'
import CreateGroup from '../../Components/CreateGroup/CreateGroup'

export default function Dashboard() {

    const [groupSelection, setGroupSelection] = useState(null);
    const [groupScreen, setGroupScreen] = useState(false);
    const [refresh, setRefresh] = useState(0);

    return (
        <div className='background'>
            <LeftBox
                setGroupSelection={setGroupSelection}
                setGroupScreen={setGroupScreen}
                refresh={refresh}
            />
            <CenterBox
                groupSelection={groupSelection}
                setRefresh={setRefresh}
                refresh={refresh}
            />
            <RightBox
                groupSelection={groupSelection}
            />
            {
                groupScreen ? (
                    <CreateGroup
                        setGroupScreen={setGroupScreen}
                        setRefresh={setRefresh}
                        refresh={refresh}
                    />
                ) : (null)
            }
        </div>
    )
}
