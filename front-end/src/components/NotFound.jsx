import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='container1'>
        <div className='banner'>
            <p>404 NOT FOUND</p>
            <div className='text'>
              <Link to="/" className='customlink'>Go Back Home</Link>
            </div>
        </div>
    </div>
  )
}