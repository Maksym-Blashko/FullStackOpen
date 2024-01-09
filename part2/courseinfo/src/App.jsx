const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}
const Header = (props) => <h1>{props.courseName}</h1>
const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>
const Content = (props) => {
  return (    
    <div>
      {props.parts.map( part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App