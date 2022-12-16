import React, { useEffect } from 'react';
import { useState } from 'react';
import ProfileCustomizedInput from './ProfileCustomizedInput'
import CustomizedButton from '../../CodePieces/CustomizedButton'
import { useCookies } from 'react-cookie';

const ProfileEditForm = (props) => {
  const [token] = useCookies(['myToken'])
  const [full_name, setFull_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [profile_picture, setProfile_picture] = useState();
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [edit, setEdit] = useState(false);

  const onChangeValue = (value, name) => {
    name(value)
    console.log(value.name)
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token['myToken']);

    const formdata = new FormData();
    formdata.append("full_name", full_name)
    formdata.append("phone_number", phone_number);
    formdata.append("profile_picture", profile_picture);
    formdata.append("house", house);
    formdata.append("area", area);
    formdata.append("city", city);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/auth/profile-update-view/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("Result", result)
        props.onChangeImage()
      })
      .catch(error => console.log('error', error));

      setEdit(false)
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/auth/profile-view/", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token['myToken']
      }
    })
      .then(response => response.json())
      .then(result => {
        setFull_name(result['full_name'])
        setPhone_number(result['phone_number'])
        setProfile_picture(result['profile_picture'])
        setHouse(result['house'])
        setArea(result['area'])
        setCity(result['city'])
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div>
      <div>
      <h2 style={{marginTop: "20px", textAlign: "center"}}>
      My Profile <sup>
      <button style={{border: 0, backgroundColor: "lightblue", borderRadius: "5px", padding: "3px"}} onClick={() => setEdit(true)}>
        <i className='fa fa-pen-alt' style={{fontSize: "11px"}}></i>
      </button>
      </sup>
      </h2> 
      {edit ? <h6 style={{fontSize: "11px"}}>Editing Mode</h6> : "" }
      </div>
      <form onSubmit={onSubmitHandle}>
        <ProfileCustomizedInput type={'text'} disability={!edit} id={"full_name"} value={full_name} onChangeValue={onChangeValue} name={setFull_name} placeholder={"Full Name"} />
        <ProfileCustomizedInput type={'text'} disability={!edit} id={"phone_number"} value={phone_number} onChangeValue={onChangeValue} name={setPhone_number} placeholder={"Phone Number"} />
        {edit ? <ProfileCustomizedInput type={'file'} disability={!edit} id={"profile_picture"} onChangeValue={onChangeValue} name={setProfile_picture} placeholder={"Profile Picture"} /> : "" }
        <ProfileCustomizedInput type={'text'} disability={!edit} id={"house"} value={house} onChangeValue={onChangeValue} name={setHouse} placeholder={"House"} />
        <ProfileCustomizedInput type={'text'} disability={!edit} id={"area"} value={area} onChangeValue={onChangeValue} name={setArea} placeholder={"Area"} />
        <ProfileCustomizedInput type={'text'} disability={!edit} id={"city"} value={city} onChangeValue={onChangeValue} name={setCity} placeholder={"City"} />
        {edit ? <div className='text-center'>
        <button className='btn btn-outline-dark w-100' type='submit'>
        Submit
        </button>
      </div> : ""}
      </form>
    </div>
  );
}

export default ProfileEditForm;
