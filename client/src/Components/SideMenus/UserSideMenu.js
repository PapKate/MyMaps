import { useState } from "react";

import Constants from '../../Shared/Constants';
import MenuButton from '../Buttons/MenuButton';
import MessageDialog from '../Dialogs/MessageDialog';


const UserSideMenu = () => {
    
    const [exitDialog_IsOpen, exitDialog_SetIsOpen] = useState(false);
        
    const ExitDialog_IsOpenHandler = () => exitDialog_SetIsOpen(!exitDialog_IsOpen);

    const LogOutOnClick = () => ExitDialog_IsOpenHandler();

    return(
        <div className="sideMenu">
            <MenuButton Text={"Home"} VectorSource={Constants.Home}/>
            <MenuButton Text={"Profile"} VectorSource={Constants.AccountCircle}/>
            <MenuButton Text={"Confirm case"} VectorSource={Constants.Virus}/>
            <MenuButton Text={"COVID exposure"} VectorSource={Constants.AlarmLight}/>

            <div className="menuExitButton">
                <MenuButton Text={"Log out"} 
                            VectorSource={Constants.ExitToApp}
                            OnClick={LogOutOnClick}/>
            </div>

            <MessageDialog  Title={"Log Out"}
                            Text={"Are you sure you want to log out?"}
                            IsOpen={exitDialog_IsOpen} 
                            IsOpenHandler={ExitDialog_IsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                            Color={Constants.LightBlue}
                            BackColor={Constants.VeryLightRed}
                            YesOnClick={()=> {console.log("Yes!")}}
                            NoOnClick={()=> {console.log("No!")}}/>
        </div>
    );
};

export default UserSideMenu;
