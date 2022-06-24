// React Functions
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// CSS 
import "../style/main.css"

// API 
const userAPI = require('../api/user-api')


const VerifyPage = () => {

  const params = useParams()
  const [response, setResponse] = useState('')

  // eslint-disable-next-line
  const getVerified = async () => {
    const id = params.id
    const apiRequest = await userAPI.verify(id)

    if(apiRequest){
      setResponse(`${apiRequest.user}, your account has been activated.`)
    } else {
      setResponse(apiRequest.error)
    }
  }

  useEffect(() => {
    getVerified()
    // eslint-disable-next-line
  }, [])
  
  return (
      <div className='info_container'>
        <h1>{response}</h1>
        <h3>Thanks for using our service!</h3>
      </div>
  )
}

export default VerifyPage