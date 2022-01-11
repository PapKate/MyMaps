import { useState } from "react";

import Constants from '../../Shared/Constants';
import MenuButton from '../Buttons/MenuButton';
import MessageDialog from '../Dialogs/MessageDialog';

const AdminSideMenu = () => {
    
    const [exitDialog_IsOpen, exitDialog_SetIsOpen] = useState(false);
        
    const ExitDialog_IsOpenHandler = () => exitDialog_SetIsOpen(!exitDialog_IsOpen);
    
    const LogOutOnClick = () => {
        ExitDialog_IsOpenHandler();
    }

    return(
        <div className="sideMenu">
            <MenuButton Text={"Points of interest"} VectorSource={Constants.Home}/>
            <MenuButton Text={"Statistics"} VectorSource={Constants.AccountCircle}/>

            <div className="menuExitButton">
                <MenuButton Text={"Log out"} 
                            VectorSource={Constants.ExitToApp}
                            OnClick={LogOutOnClick}/>
            </div>

            <MessageDialog  Title={"Log Out"}
                            Text={"Are you sure you want to log out?"}
                            IsOpen={exitDialog_IsOpen} 
                            IsOpenHandler={ExitDialog_IsOpenHandler}
                            VectorSource={Constants.ExitToApp}
                            Color={Constants.LightBlue}
                            BackColor={Constants.VeryLightRed}
                            YesOnClick={()=> { ExitDialog_IsOpenHandler(); console.log("Yes!"); }}
                            NoOnClick={()=> { ExitDialog_IsOpenHandler(); console.log("No!"); }}/>

        </div>
    );
};

export default AdminSideMenu;
