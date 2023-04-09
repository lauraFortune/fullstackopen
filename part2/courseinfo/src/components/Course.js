
const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
  return(
    <>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} /> )}
    </>
  )
}

const Total  = ({ parts }) => {
  const sumTotal = parts.reduce((accum, curr) => {
    return accum + curr.exercises
  }, 0)
  return(
    <p><strong>total of {sumTotal} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return(
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course