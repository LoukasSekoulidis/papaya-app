import React from 'react'

export default function Form({handleSubmit, mailRef, passwordRef, useCase}) {
  
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
              mail:
              <input type='email' ref={mailRef} placeholder='Enter Mail' required />
            </label>
            <label>
              password:
              <input type='password' ref={passwordRef} placeholder='Enter Password' required />
            </label>
            <input type='submit' name={useCase}></input>
         </form>
      </div>
   )
}
