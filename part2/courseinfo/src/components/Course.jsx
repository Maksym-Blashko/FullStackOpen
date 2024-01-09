const Course = ({ course }) => {
    return (
      <div>
        <CourseHeader courseName={course.name} />
        <Content parts={course.parts} />
        <CourseFooter parts={course.parts} />
      </div>
    )
  }
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

  export default Course