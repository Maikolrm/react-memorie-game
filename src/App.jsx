import React, { useState, useEffect } from 'react'
import './App.css'
import { Card, Modal } from './components'

function App() {
  const [cards, setCards] = useState([
    {id: 1, framework: 'angular.svg' },
    {id: 2, framework: 'aurelia.svg' },
    {id: 3, framework: 'backbone.svg' },
    {id: 4, framework: 'ember.svg' },
    {id: 5, framework: 'react.svg' },
    {id: 6, framework: 'vue.svg' },
  ])
  const [flippedCards, setFlippedCards] = useState([])
  const [matches, setMatches] = useState([])
  const [isLocked, setIsLocked] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [resetGame, setResetGame] = useState(false)
  const handleCards = (action, cards) => {
    action === 'unflip-cards' ? setTimeout(() => {
      cards.map(card => card.setFlipped(false))
      setIsLocked(false)
    }, 500) : setIsLocked(false)
    setMatches([])
  }
  const handelMatches = () => {
    setIsLocked(true)
    const match = matches[0].id === matches[1].id
    !match ? handleCards('unflip-cards', matches) : handleCards('none')
    if (match && !flippedCards.find(el => el.id === matches[0].id)) setFlippedCards(prev => prev.concat(matches))
  }
  const handleReset = () => {
    handleCards('unflip-cards', flippedCards)
    setFlippedCards([])
    setResetGame(false)
    setCompleted(false)
  }
  useEffect(() => {
    if (matches.length && matches.length === 2) handelMatches()
  }, [matches])
  useEffect(() => {
    if (flippedCards.length === (cards.length * 2)) setCompleted(true)
  }, [flippedCards])
  useEffect(() => {
    if (resetGame) handleReset()
  }, [resetGame])
  return (
    <>
      {completed ? <Modal setResetGame={setResetGame} /> : ''}
      <div className="board">
        {isLocked ? <div className="board__hover"></div> : ''}
        {[...cards, ...cards].map((card, i) => <Card key={i} card={card} setMatches={setMatches} />)}
      </div>
    </>
  )
}

export default App
