import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = ({text, anecdote, votes}) => {
  return(
    <>
      <Header text={text} />
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [indexOfMostVoted, setIndexOfMostVoted] = useState(0)
  
  const handleNextClick = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    const index = newVotes.indexOf(Math.max(...newVotes)); // get index of max num
    setIndexOfMostVoted(index)
  }
  
  return (
    <div>
      <Anecdote text="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleNextClick} text="next anecdote" />
      <Anecdote text="Most voted anecdote" anecdote={anecdotes[indexOfMostVoted]} votes={votes[indexOfMostVoted]} />
    </div>
  )
}

export default App