const Header = ({course}) => <h1>{course}</h1>

const Content = (props) => {
  return (
    <div>
      {props.parts.map((content) => {
        return <Part key={content.id} part={content} />
      })}
    </div>
  )
}

const Part = (props) => (
  <p>
  {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.parts.reduce((acc, cum) => acc + cum.exercises, 0)}</p>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course;