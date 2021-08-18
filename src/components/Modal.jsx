import React from 'react'

export const Modal = ({ setResetGame }) => {
  return(
    <div className="modal">
      <div className="moda__container">
        <span className="modal__icon"></span>
        <h2 className="modal__heading">Game Copleted</h2>
        <button className="modal__btn" onClick={() => setResetGame(true)}>Start Over</button>
      </div>
    </div>
  )
}
