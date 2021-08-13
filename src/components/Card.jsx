import React, { useState } from 'react'

export const Card = (props) => {
  const [flipped, setFlipped] = useState(false)
  const handelClick = () => {
    setFlipped(true)
    props.setMatches(prev => prev.concat({id: props.card.id, setFlipped: setFlipped}))
  }
  return(
    <div className={"board__card " + (flipped ? 'board__card--flipped' : '')} onClick={!flipped ? () => handelClick() : null}>
      <img className="card__face card__face--front" src="/images/js-badge.svg" alt="js vadge" />
      <img className="card__face card__face--back" src={"/images/" + (props.card.framework)} alt={props.card.framework.slice(0, props.card.framework.indexOf('.'))} />
    </div>
  )
}
