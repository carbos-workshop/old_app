import React from 'react'

const TestButton = ({ buttonClicked }) => {
  return(
    <div>
      <button onClick={(event) => buttonClicked(event)}>TEST</button>
    </div>
  )
}

export default TestButton
