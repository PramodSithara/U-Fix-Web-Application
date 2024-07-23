import React from 'react'
import './style.css'
import NavBar from './NavBar'
import Footer from './Footer'
import ContentBox from './Content'
import Service from './Service'

export default function Home() {
  return (
    <div className='container'>
        <NavBar />
        <Service />
        <ContentBox />
        <Footer />
    </div>
  )
}