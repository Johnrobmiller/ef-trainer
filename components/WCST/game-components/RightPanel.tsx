import React from 'react'

const textContainerStylings: string = 'relative w-96 mx-12 bg-lighter border-black border-5 rounded-3xl shadow-xl-custom'
const textStylings: string = 'font-semibold px-5 pb-4 text-gray-900 text-center'

export default function RightPanel ({ stats }: { stats: {totalTrials: number, totalCorrect: number, prevResponseTime: number, avgResponseTime: number} }) {
  return (
    <div className={`${textContainerStylings} relative`}>
      <p className='font-semibold pb-4 pt-5 text-center text-gray-900 text-xl'>STATS: </p>
      <p className={`${textStylings}`}> Proportion Correct:<br/> {stats.totalCorrect} out of {stats.totalTrials} </p>
      {/* <p className={`${textStylings}`}> Perseverance Errors: 0 </p> */}
      <p className={`${textStylings}`}> Previous Response Time:<br/> {Math.trunc(stats.prevResponseTime)} ms </p>
      <p className={`${textStylings}`}> Average Response Time:<br/> {Math.trunc(stats.avgResponseTime)} ms </p>
      
      {/*  <p className={`${textStylings} text-justify absolute bottom-0`} style={{fontSize: '0.7rem'}}>NOTE: Perseverance errors occur when the player erroneously reverts back to a previous rule. This number is an estimate and might not be fully accurate.</p> */}
    </div>
  )
}