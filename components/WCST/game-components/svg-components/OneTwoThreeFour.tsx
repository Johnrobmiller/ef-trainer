import React from 'react'

export const sizingOptionCard = 'w-48 h-48 flex transition-colors'
const sizingPlayerCard = 'w-72 h-72 flex transition-colors'
export const borderOptionCard = 'border-black border-4 rounded-3xl shadow-xl-custom'
const borderPlayerCard = 'border-black border-6 rounded-3xl shadow-xl-custom'

export function OneTwo ({ children, isPlayerCard }:
{ children: JSX.Element[], isPlayerCard: boolean }) {

  const sizing: string = isPlayerCard ? sizingPlayerCard : sizingOptionCard
  const border: string = isPlayerCard ? borderPlayerCard : borderOptionCard

  return (
    <div className={`${sizing} ${border} bg-lighter justify-center`}>
      <div className='flex flex-col justify-evenly'>
        {children}
      </div>
    </div>
  )
}

export function ThreeFour ({ children, isPlayerCard }:
{ children: JSX.Element[], isPlayerCard: boolean }) {

  const upperChildren = children.slice(2)
  const lowerChildren = children.slice(0, 2)

  const sizing: string = isPlayerCard ? sizingPlayerCard : sizingOptionCard
  const border: string = isPlayerCard ? borderPlayerCard : borderOptionCard

  return (
    <div className={`${sizing} ${border} bg-lighter flex-col justify-evenly`}>
      <div className='flex flex-row justify-evenly'>
        {upperChildren}
      </div>
      <div className='flex flex-row justify-evenly'>
        {lowerChildren}
      </div>
    </div>
  )
}