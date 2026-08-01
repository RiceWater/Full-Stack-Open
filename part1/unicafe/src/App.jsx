import { useState } from 'react'


const Button = ({ onClick, title }) => {
  return (
    <button onClick={onClick}>{title}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalRating = good + neutral + bad
  const averageRating = totalRating === 0 ? 0 : (good - bad) / totalRating
  const positivePercentage = totalRating === 0 ? 0 : (good / totalRating) * 100 
  
  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {totalRating} </p>
      <p>average {averageRating}</p>
      <p>positive {positivePercentage}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={() => setGood(good + 1)} title="good" />
      <Button onClick={() => setNeutral(neutral + 1)} title="neutral" />
      <Button onClick={() => setBad(bad + 1)} title="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App;