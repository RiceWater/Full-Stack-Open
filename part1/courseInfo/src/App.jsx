const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part title={props.parts[0].name} exerciseCount={props.parts[0].exercises} />
      <Part title={props.parts[1].name} exerciseCount={props.parts[1].exercises} />
      <Part title={props.parts[2].name} exerciseCount={props.parts[2].exercises} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.title} {props.exerciseCount}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0] + props.parts[1] + props.parts[2]}</p>
  )
}

const App = () => {
  const course = 'Half Stack Development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10 
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
    <Header course={course} />
    <Content parts={parts} />
    <Total parts={parts} />
    </div>
  )
}

export default App;