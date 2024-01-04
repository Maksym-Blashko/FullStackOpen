import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>
const RenderAnecdote = (props) => <AnecdoteDisplay text={props.anecdote.text} votes={props.anecdote.votes} />
const AnecdoteDisplay = (props) => (
  <div>
    <p>{props.text}</p>
    <p>has {props.votes} votes</p>
  </div>
)
const AnecdoteWithMaxVotes = ({ anecdotes }) => {
  const anecdoteWithMaxVotes = anecdotes.reduce( (maxVotesAnecdote, currentAnecdote) =>
    currentAnecdote.votes > maxVotesAnecdote.votes ? currentAnecdote : maxVotesAnecdote, anecdotes[0]
  )
  return <AnecdoteDisplay text={anecdoteWithMaxVotes.text} votes={anecdoteWithMaxVotes.votes} />
} 
const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>
const Buttons = (props) => {
  return (
    <div>
      <Button text="vote" handleClick={props.handleClickVote} />
      <Button text="next anecdote" handleClick={props.handleClickNext} />
    </div>
  )
}

const App = () => {
  const initialAnecdotes = [
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 },
    { text: 'The only way to go fast, is to go well.', votes: 0 }
  ]
   
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [selected, setSelected] = useState(0)

  const handleClickNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleClickVote = () => setAnecdotes(anecdotes.map((anecdote, index) => (index === selected ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)))

  return (
    <div>
      <Header title={"Anecdote of the day"} />
      <RenderAnecdote anecdote={anecdotes[selected]} />
      <Buttons handleClickVote={handleClickVote} handleClickNext={handleClickNext} />
      <Header title={"Anecdote with most votes"} />
      <AnecdoteWithMaxVotes anecdotes={anecdotes} />
    </div>
  )
}

export default App