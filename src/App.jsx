import React, { useState, useEffect, useContext, useReducer } from 'react'
import { useImmerReducer } from 'use-immer'
import './App.css'
// CONTEXT
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

// COMPONENTS
import { BoardCards } from './components'

function App() {
  const cards = [
    {id: 1, framework: 'angular.svg' },
    {id: 2, framework: 'aurelia.svg' },
    {id: 3, framework: 'backbone.svg' },
    {id: 4, framework: 'ember.svg' },
    {id: 5, framework: 'react.svg' },
    {id: 6, framework: 'vue.svg' },
  ]
  const [isLocked, setIsLocked] = useState(false)
  const initialState = {
    points: 0,
    matches: []
  }
  const reducer = (draft, action) => {
    switch (action.type) {
      case 'handle-card':
        draft.matches.push(action.card)
        break
      case 'handle-match':
        setIsLocked(true)
        const matches = action.matches
        const match = matches[0].id === matches[1].id
        if (!match) setTimeout(() => {
          matches.map(card => card.setFlipped(false))
          setIsLocked(false)
        }, 500)
        draft.matches = []
    }
  }
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  useEffect(() => {
    if(state.matches.length && state.matches.length === 2) dispatch({type: 'handle-match', matches: state.matches })
  }, [state.matches])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="board">
          {isLocked ? <div className="board__hover"></div> : ''}
          <BoardCards cards={[...cards, ...cards]} />
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
