import React from 'react'
import { useRecoilValue } from 'recoil'
import * as states from '../../../util/WCST/gameStates'
import type { Color } from '../../../util/WCST/gameTypes'

function StartText({startText, color, clickedOnStart}:
{ startText: string, color: Color, clickedOnStart: () => void }){

  const hasTheGameStarted = useRecoilValue(states.hasTheGameStarted)

  const handleOnClick = () => {
    clickedOnStart()
  }

  const textColor: string = hasTheGameStarted ? (startText === 'CORRECT!' ? 'text-g' : 'text-r') : 'text-' + color[0].toLowerCase()
  const hoverStyles: string = hasTheGameStarted ? 'cursor-default transition-none' : 'cursor-pointer transition-all duration-150 ease-in-out hover:bg-darkest hover:text-g hover:text-border-0 hover:font-semibold transform hover:scale-110'

  return (
    <div className='flex justify-center'>
      <p className={`px-3 py-2 bg-lighter
        ${hoverStyles}
        text-center text-5xl text-border-3 font-black tracking-widest ${textColor}
        border-4 border-solid border-black rounded-2xl shadow-xl-custom`} 
        onClick={handleOnClick}>
        {startText}
      </p>       
    </div>
      
  )
}

export default StartText