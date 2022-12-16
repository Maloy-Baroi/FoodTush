import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import locationInputStyle from './SetLocationForm.module.css'

const SetLocationForm = () => {
  const [houseInCookies, setHouseInCookies] = useCookies(['House'])
  const [areaInCookies, setAreaInCookies] = useCookies(['Area'])
  const [cityInCookies, setCityInCookies] = useCookies(['City'])
  const [house, setHouse] = useState(houseInCookies['House'])
  const [area, setArea] = useState(areaInCookies['Area']);
  const [city, setCity] = useState(cityInCookies['City']);

  const navigator = useNavigate()

  const onSetHouseAreaCity = () => {
    setHouseInCookies("House", house)
    setAreaInCookies("Area", area)
    setCityInCookies("City", city)
    navigator('/')
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h2 className={"text-center " + locationInputStyle.label}>Set Location</h2>
          <input className={"form-control " + locationInputStyle.input} type="text" name='house' placeholder="House, Road" 
          value={house} onChange={e => setHouse(e.target.value)} />
          <input className={"form-control " + locationInputStyle.input} type="text" name='area' placeholder="Area/Ward" 
          value={area} onChange={e => setArea( e.target.value)} />
          <input className={"form-control " + locationInputStyle.input} type="text" name='city' placeholder="City" 
          value={city} onChange={e => setCity(e.target.value)} />
          <button className="btn btn-power w-100" onClick={onSetHouseAreaCity}><i className="fas fa-location"> Set </i></button>
        </div><div className="col-md-4"></div>
      </div>
    </div>
  )
}

export default SetLocationForm
