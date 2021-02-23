import React from 'react'

const cssConsts = 'text-lightest text-2xl font-bold my-auto mx-20'

export default function Banner() {
  return (
    <div className='h-16 bg-darkest flex justify-center'>
      <h1 className={`${cssConsts}`}>HOME</h1>
      <h1 className={`${cssConsts}`}>OUR MISSION</h1>
      <h1 className={`${cssConsts}`}>LOG IN</h1>
      <h1 className={`${cssConsts}`}>GET STARTED</h1>
    </div>
  )
}