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

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return(
    all <= 0
    ? <p>No feedback given</p>
    : <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  //stats
  const all = (good + neutral + bad)
  const average = ((good - bad) / all).toFixed(1)
  const positive = ((good/all) * 100).toFixed(1) + ' %'
                               
  //button handler
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
