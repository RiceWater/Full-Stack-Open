import { useState } from 'react'


const Button = ({ onClick, title }) => {
  return (
    <button onClick={onClick}>{title}</button>
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )

}
export default App;