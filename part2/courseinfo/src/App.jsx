const Course = ({ course }) => {
  return (
    <div>
      <CourseHeader courseName={course.name} />
      <Content parts={course.parts} />
      <CourseFooter parts={course.parts} />
    </div>
  )
}
const Header = ({ title }) => <h1>{title}</h1>
const CourseHeader = (props) => <h3>{props.courseName}</h3>
const CourseFooter = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <strong>total of {total} exersices </strong>
    </div>
  )
}
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header title="Web development curriculum" />
      {courses.map( course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App