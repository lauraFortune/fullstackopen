import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}
const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, stat}) => <p>{text} {stat}</p>

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return(
    all <= 0
    ? <p>No feedback given</p>
    : <>
        <StatisticLine text="good" stat={good} />
        <StatisticLine text="neutral" stat={neutral} />
        <StatisticLine text="bad" stat={bad} />
        <StatisticLine text="all" stat={all} />
        <StatisticLine text="average" stat={average} />
        <StatisticLine text="positive" stat={positive} />
      </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  //stats
  const all = (good + neutral + bad)
  const average = ((good - bad) / all).toFixed(2)
  const positive = ((good/all) * 100).toFixed(2) + ' %'
                               
  //click handler
  const handleClick = (stateSetter, state) => () => stateSetter(state + 1)
    
  return(
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={handleClick(setGood, good)} />
      <Button text="neutral" onClick={handleClick(setNeutral, neutral)} />
      <Button text="bad" onClick={handleClick(setBad, bad)} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )

}

export default App;
