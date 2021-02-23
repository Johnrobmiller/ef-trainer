import React from 'react'
import type { OptionProps } from '../../../util/WCST/gameTypes'
import NewCard from './svg-components/NewCard'

function Option ({ optionProps }: { optionProps: OptionProps }) {

  const textColor: string = 'text-' + optionProps.card.color[0].toLowerCase()
  let headerText: string
  switch (optionProps.cardId) {
    case 1: headerText = 'WISCONSIN'; break
    case 2: headerText = 'CARD'; break
    case 3: headerText = 'SORTING'; break
    case 4: headerText = 'TASK'; break
  }

  return (
    <div className='w-80'>
      <h1 className={`text-5xl font-black tracking-widest mb-8 text-border-3 ${textColor} flex justify-center`}>{headerText!}</h1>

      <NewCard optionProps={optionProps} isPlayerCard={false} />
      
      {/* <p className={`text-5xl pt-4 font-black text-center ${color} text-border-3`}>{optionProps.cardId}</p> */}
    </div>
  )
}

export default Option