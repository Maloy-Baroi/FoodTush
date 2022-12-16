import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Navbar from '../../CodePieces/Navbar';
import ProfileEditForm from './ProfileEditForm'
import defaultImage from '../../../static/images/defaultImage.png'
import { useNavigate } from 'react-router-dom';
import ProfileOtherOptions from './ProfileOtherOptions';
import PreviousOrders from './Orders/PreviousOrders';
import RunningOrders from './Orders/RunningOrders';

const ProfilePage = () => {
  const [profile_picture, setProfile_picture] = useState();
  const [previouseOders, setPreviouseOders] = useState([]);
  const [runningOrders, setRunningOrders] = useState([]);
  const [AllOrders, setAllOrders] = useState([]);
  const [token, setToken, removeToken] = useCookies(['myToken'])
  const [groups, setGroups, removeGroups] = useCookies(['group_name'])
  const navigator = useNavigate()

  const onHandleLogout = () => {
    removeToken("myToken", null)
    navigator('/')
  }

  const onChangeImage = () => {
    fetch("http://127.0.0.1:8000/auth/profile-view/", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token['myToken']
      }
    })
      .then(response => response.json())
      .then(result => {
        setProfile_picture(result['profile_picture'])
      })
      .catch(error => console.log('error', error));
  }

  const getProfilePicture = async () => {
    await fetch("http://127.0.0.1:8000/auth/profile-view/", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token['myToken']
      }
    })
      .then(response => response.json())
      .then(result => {
        setProfile_picture(result['profile_picture'])
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getProfilePicture()
  });

  const [activePage, setActivePage] = useState('profile_settings')

  const onChangeActivePage = (value) => {
    setActivePage(value)
  }

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='mt-5'>
              <ProfileOtherOptions onChangeActivePage={onChangeActivePage} />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='row'>
            {activePage === 'profile_settings' ? 
            <div className='col-md-10'>
                <ProfileEditForm onChangeImage={onChangeImage} />
                <div className='ml-2'>
                  <p>[You are authenticated with your email.]</p>
                </div>
                <div className='ml-2'>
                  <button className='btn w-25 text-danger' style={{ backgroundColor: "#eee", fontWeight: "500" }} 
                  onClick={onHandleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            : activePage === "previous_orders" ? <PreviousOrders /> : activePage === 'running_orders' ? <RunningOrders /> : ""}
              <div className='col-md-2'></div>
            </div>
          </div>
          <div className='col-md-3'>
            <img src={profile_picture ? profile_picture : defaultImage} alt={"ProfilePicture"} style={{
              width: "100%",
              height: "275px"
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
