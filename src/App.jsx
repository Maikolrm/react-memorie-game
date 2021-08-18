import React, { useState, useEffect } from 'react'
import './App.css'
import { Card } from './components'

function App() {
  const [cards, setCards] = useState([
    {id: 1, framework: 'angular.svg' },
    {id: 2, framework: 'aurelia.svg' },
    {id: 3, framework: 'backbone.svg' },
    {id: 4, framework: 'ember.svg' },
    {id: 5, framework: 'react.svg' },
    {id: 6, framework: 'vue.svg' },
  ])
  const [matches, setMatches] = useState([])
  const [isLocked, setIsLocked] = useState(false)
  const unflipCards = (cards) => {
    cards === 'all' ? setTimeout(() => {
      matches.map(card => card.setFlipped(false))
      setIsLocked(false)
    }, 500) : setIsLocked(false)
    setMatches([])
  }
  const handelMatches = () => {
    setIsLocked(true)
    const match = matches[0].id === matches[1].id
    !match ? unflipCards('all') : unflipCards('none')
  }
  useEffect(() => {
    if (matches.length && matches.length === 2) handelMatches()
  }, [matches])
  return (
    <div className="board">
      {isLocked ? <div className="board__hover"></div> : ''}
      {[...cards, ...cards].map((card, i) => <Card key={i} card={card} setMatches={setMatches} />)}
    </div>
  )
}

export default App
