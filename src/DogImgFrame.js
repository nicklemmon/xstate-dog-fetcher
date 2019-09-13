import React from 'react'
import './DogImgFrame.css'

export default function DogImgFrame(props) {
  return (
    <div className="DogImgFrame shadow-xl p-6 overflow-hidden rounded p-4 flex items-center justify-center mx-auto bg-white">
      {props.children}
    </div>
  )
}
