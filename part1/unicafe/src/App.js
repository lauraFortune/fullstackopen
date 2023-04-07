import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}
const Button = ({clickHandler, text}) => {
  return(
    <button onClick={clickHandler}>{text}</button>
  )
}

const Statistic = ({text, stat}) => <p>{text} {stat}</p>

const Statistics = ({good, neutral, bad}) => {
  return(
    <>
      <Statistic text="good" stat={good} />
      <Statistic text="neutral" stat={neutral} />
      <Statistic text="bad" stat={bad} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //click handlers
  const handleGoodClick = () => setGood(good + 1) 
  const handleNeutralClick = () => setNeutral(neutral + 1) 
  const handleBadClick = () => setBad(bad + 1)

  return(
    <div>
      <Header text="give feedback" />
      <Button clickHandler={handleGoodClick} text="good" />
      <Button clickHandler={handleNeutralClick} text="neutral" />
      <Button clickHandler={handleBadClick} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App;
