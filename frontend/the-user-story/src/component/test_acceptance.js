import React from 'react'

const TestAcceptance = ({ testAcceptance }) => {
  return (
    <span className="root">
      {
        testAcceptance.map((test) => (
           <li>{test.description}</li>
      ))}
    </span>
  )
};

export default TestAcceptance