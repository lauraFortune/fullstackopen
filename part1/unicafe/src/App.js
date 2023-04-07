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

const FeedbackButtons = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => {
  return(
    <>
      <Button text="good" clickHandler={handleGoodClick} />
      <Button text="neutral" clickHandler={handleNeutralClick} />
      <Button text="bad" clickHandler={handleBadClick} />
    </>
  )
}

const Statistic = ({text, stat}) => <p>{text} {stat}</p>

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return(
    <>
      <Statistic text="good" stat={good} />
      <Statistic text="neutral" stat={neutral} />
      <Statistic text="bad" stat={bad} />
      <Statistic text="all" stat={all} />
      <Statistic text="average" stat={average} />
      <Statistic text="positive" stat={positive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  //stats
  const all = (good + neutral + bad)
  const average = all === 0? 0: (good - bad) / all
  const positive = all === 0? 0 + ' %': (good/all) * 100 + ' %'
  //click handlers
  const handleGoodClick = () => setGood(good + 1) 
  const handleNeutralClick = () => setNeutral(neutral + 1) 
  const handleBadClick = () => setBad(bad + 1)

  return(
    <div>
      <Header text="give feedback" />
      <FeedbackButtons 
        handleGoodClick={handleGoodClick}
        handleNeutralClick={handleNeutralClick}
        handleBadClick={handleBadClick}
      />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )

}

export default App;
