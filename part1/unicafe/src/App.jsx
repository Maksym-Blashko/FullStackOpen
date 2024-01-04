import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>
const StatisticLine = (props) => <div>{props.text} {props.value} </div>
const Statistics = (props) => {
  const { good, neutral, bad } = props
  const sum = good + neutral + bad
  if (sum == 0) {
    return (
      <div>No feedback given </div>
    )
  } else {
    return (
      <div>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={sum} />
        <StatisticLine text={"average"} value={(good - bad) / sum} />
        <StatisticLine text={"positive"} value={`${(good / sum * 100) } %`} />
      </div>
    )
  }
}
const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>
const Buttons = (props) => {
  return (
    <div>
      <Button text="good" handleClick={props.handleGoodClick} />
      <Button text="neutral" handleClick={props.handleNeutralClick} />
      <Button text="bad" handleClick={props.handleBadClick} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header title={"give feedback"} />
      <Buttons handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick} handleBadClick={handleBadClick} />
      <Header title={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />      
    </div>
  )
}

export default App