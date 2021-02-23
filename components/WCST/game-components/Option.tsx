import React from 'react'
import type { OptionProps } from '../../../util/WCST/gameTypes'
import NewCard from './svg-components/NewCard'

function Option ({ optionProps }: { optionProps: OptionProps }) {

  let headerText: string
  switch (optionProps.cardId) {
    case 1: headerText = 'WISCONSIN'; break
    case 2: headerText = 'CARD'; break
    case 3: headerText = 'SORTING'; break
    case 4: headerText = 'TASK'; break
  }

  const color: string = optionProps.card.color[0].toLowerCase()

  return (
    <div className='w-80'>

      {/* Tailwind didn't accept the use of anonymous functions in my template literal.
      Is there a way to get them to work? */}
      <h1 className={`text-5xl font-black tracking-widest mb-8 text-border-3 flex justify-center ${
        color === 'g' ? 'text-g' : color === 'b' ? 'text-b' : color === 'r' ? 'text-r' : 'text-y'
      }`}>{headerText!}</h1>

      <NewCard optionProps={optionProps} isPlayerCard={false} />
      
      {/* <p className={`text-5xl pt-4 font-black text-center ${color} text-border-3`}>{optionProps.cardId}</p> */}
    </div>
  )
}

export default Option