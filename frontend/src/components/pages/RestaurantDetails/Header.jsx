import React from 'react';
import restaurantDetailsHeaderStyle from './Header.module.css'
import veg from '../../../static/images/no-meat.png'
import nonveg from '../../../static/images/meat.png'
import veganFood from '../../../static/images/vegan.png'

const Header = (props) => {
  return (
    <div>
      <div className='container text-center'>
        <img src={props.img} alt={props.restau_name} className={restaurantDetailsHeaderStyle.headerImage} />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className={restaurantDetailsHeaderStyle.headerText}>
              <h1 className={restaurantDetailsHeaderStyle.headerName}>
                {props.restau_name}
              </h1>
              <p className={restaurantDetailsHeaderStyle.veg_nonVeg}>
                <span>{props.veg ? <img className={restaurantDetailsHeaderStyle.veg_ornot_img} src={veg} alt="Vegetarian Food" title="Vegetarian Food" /> 
                : 
                <img className={restaurantDetailsHeaderStyle.veg_ornot_img} src={nonveg} alt={"Non-veg Food"} title="Non-veg Food" />} &nbsp;</span>
                {props.vegan ? <span>&#x2022;</span> : ""}
                {props.vegan ? <span> &nbsp; <img className={restaurantDetailsHeaderStyle.veg_ornot_img} src={veganFood} alt="Vegan Food" title='Vegan Food' /> &nbsp;</span> : ""}
              </p>
              <p className={restaurantDetailsHeaderStyle.starParent}>
              <span>{props.totalRated} people rated &nbsp; </span>
              <span>&#x2022;</span>
              <span>&nbsp; <i className={'fa fa-star ' + restaurantDetailsHeaderStyle.star}>&nbsp;{props.rating}</i></span>
              </p>
              <p className={restaurantDetailsHeaderStyle.address}>
              <i className='fa fa-map-location-dot'></i>
                <span>&nbsp; {props.address}</span>
              </p>
              <p>{props.restaurantType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
