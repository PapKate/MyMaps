import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Constants from '../../Shared/Constants';
import MenuButton from '../Buttons/MenuButton';
import MessageDialog from '../Dialogs/MessageDialog';


const UserSideMenu = ({ UserData }) => {
    const navigate = useNavigate();
    
    const [exitDialog_IsOpen, exitDialog_SetIsOpen] = useState(false);
        
    const ExitDialog_IsOpenHandler = () => exitDialog_SetIsOpen(!exitDialog_IsOpen);

    /**
     ** Navigates to the home page of the user
     */
    const GoToHomePage = () => {
        navigate(`home`, {state: { userData : UserData }});
    }

    /**
     ** Navigates to the profile page of the user
     */
     const GoToProfilePage = () => {
        navigate(`profile`, {state: { userData : UserData }});
    }

    /**
     ** Navigates to the confirm case page of the user
     */
     const GoToConfirmCasePage = () => {
        navigate(`confirmCase`, {state: { userData : UserData }});
    }

    /**
     ** Navigates to the COVID exposure page of the user
     */
     const GoToCOVIDExposurePage = () => {
        navigate(`COVIDExposure`, {state: { userData : UserData }});
    }

    /**
     ** Reveals the log out dialog
     */
    const LogOutOnClick = () => ExitDialog_IsOpenHandler();

    return(
        <div className="sideMenu">
            <MenuButton Text={"Home"} 
                        VectorSource={Constants.Home} 
                        OnClick={GoToHomePage}/>
            <MenuButton Text={"Profile"} 
                        VectorSource={Constants.AccountCircle}
                        OnClick={GoToProfilePage}/>
            <MenuButton Text={"Confirm case"} 
                        VectorSource={Constants.Virus}
                        OnClick={GoToConfirmCasePage}/>
            <MenuButton Text={"COVID exposure"} VectorSource={Constants.AlarmLight}
                        OnClick={GoToCOVIDExposurePage}/>

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
