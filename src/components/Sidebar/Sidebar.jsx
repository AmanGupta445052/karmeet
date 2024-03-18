import React from 'react'
import {Menu} from 'semantic-ui-react'
import UserInfo from './UserInfo/UserInfo';


 const Sidebar = () => {
    return (
        <Menu vertical fixed='left' borderless size='large'  >
        <div className='bg-red-400 w-lg h-screen'></div>
        <UserInfo />

        </Menu>
    )}

    export default Sidebar;