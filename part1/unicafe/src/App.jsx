import { useState } from 'react'

const Button = ({ onClick, title }) => (<button onClick={onClick}>{title}</button>)

const StatisticsLine = ({text, value}) => (<p>{text} {value}</p>)

const Statistics = ({good, neutral, bad}) => {
  const totalRating = good + neutral + bad
  const averageRating = totalRating === 0 ? 0 : (good - bad) / totalRating
  const positivePercentage = totalRating === 0 ? 0 : (good / totalRating) * 100 
  
  if (totalRating === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )  
  }
  return (
    <>
      <StatisticsLine text={"good"} value={good} />
      <StatisticsLine text={"neutral"} value={neutral} />
      <StatisticsLine text={"bad"} value={bad} />
      <StatisticsLine text={"all"} value={totalRating} />
      <StatisticsLine text={"average"} value={averageRating} />
      <StatisticsLine text={"positive"} value={positivePercentage.toString() + "%"} />
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
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App;