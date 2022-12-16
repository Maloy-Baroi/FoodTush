import React from 'react'
import { Link } from 'react-router-dom'
import cardStyle from './SuggestionCard.module.css'

const SuggestionCard = (props) => {
  return (
    <div style={{ margin: "80px 5px" }}>
      <img src={props.imageSrc} alt={props.alternative} style={{ width: props.width, height: "228px" }} />
      <h1 className={cardStyle.header_text}>{props.headerText}</h1>
      <Link to={props.path} className={cardStyle.anchor_text}>{props.anchorText}</Link>
    </div>
  )
}

export default SuggestionCard
