import React from 'react'
import Option from './Option'
import type { OptionProps } from '../../../util/WCST/gameTypes'

function UpperOptions({ optionsProps }: { optionsProps: OptionProps[] }) {

  const headerColor: string[] = []
  for (let i = 0; i < 4; i++) headerColor.push('text-' + optionsProps[i].card.color[0].toLowerCase())

  return (
    <div className='flex justify-center'>
      <Option 
        optionProps={optionsProps[0]} />
      <Option 
        optionProps={optionsProps[1]} />
      <Option 
        optionProps={optionsProps[2]} />
      <Option 
        optionProps={optionsProps[3]} />
    </div>       
  )
}

export default UpperOptions