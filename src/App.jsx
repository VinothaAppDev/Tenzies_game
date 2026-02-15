import "./App.css"
import React from 'react'
import Die from "./assets/components/die/Die"
import { nanoid } from "nanoid"
// import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function App() {

  const [diceData, setDiceData] = React.useState(() => newDiesSetGenerator())
  // const { width, height } = useWindowSize()
  let focusEnter = React.useRef(null);

  
  function newDiesSetGenerator(){
    let arr = new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }))
    return arr;
  }

  function hold(id){
    setDiceData(prev => (
      prev.map((obj) => (
        obj.id===id ? 
          {...obj, isHeld: !obj.isHeld} :
          obj
      ))
    ))
  }

  let components = diceData.map((obj) => (
      <Die key={obj.id} data={obj} hold={hold}/>
    ))

  function roller(){
    if(isWon){
      setDiceData(newDiesSetGenerator())
    }
    else{
      setDiceData(prev => (
        prev.map(obj => (
          obj.isHeld ? obj :
            {...obj, value: Math.ceil(Math.random() *6)}
        ))
      ))
    }
  }

  let isWon = false
  if(
    diceData.every(dice => dice.isHeld) &&
    diceData.every(dice => dice.value === diceData[0].value)
  ){
    isWon = true
  }

  React.useEffect(()=>{
    if(isWon){
      focusEnter.current.focus()
    }

  }, [isWon])


  return (
    <main className="main-conatainer">
      {isWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
                {isWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dies-box">
        {components}
      </div>
      <button ref={isWon ? focusEnter : null} onClick={roller} className="rollMeBtn">{isWon ? "New Game" : "Roll"}</button>
    </main>
  )
}