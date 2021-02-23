import React from 'react'
import type { Amount } from '../../../../util/WCST/gameTypes'
import { Color, Shape } from '../../../../util/WCST/gameTypes'

const amountEnumToNum = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4 }

export default function getShapeComponent(color: Color, shape: Shape, amount: Amount, isPlayerCard: boolean): JSX.Element[] {

  let cardColor: string;

  switch (color) {
    case Color.green:
      cardColor = 'rgb(93, 198, 93)'
      break
    case Color.red:
      cardColor = 'rgb(202, 88, 88)'
      break
    case Color.yellow:
      cardColor = 'rgb(221, 221, 115)'
      break;
    case Color.blue:
      cardColor = 'rgb(87, 87, 199)'
      break
  }

  let shapeChoice: JSX.Element = <></>
  switch(shape) {
    case Shape.circle:
      shapeChoice = <Circle color={cardColor} />
      break
    case Shape.square:
      shapeChoice = <Square color={cardColor} />
      break
    case Shape.tri:
      shapeChoice = <Tri color={cardColor} />
      break
    case Shape.cross:
      shapeChoice = <Cross color={cardColor} />
      break
  }

  const sizingOptionCard: string = 'w-16 h-16'
  const sizingPlayerCard: string = 'w-24 h-24'
  const sizing: string = isPlayerCard ? sizingPlayerCard : sizingOptionCard

  let shapeArray: JSX.Element[] = []
  for (let i = 0; i < amountEnumToNum[amount]; i++) {
    shapeArray.push(
      <div className={sizing}>
        {shapeChoice}        
      </div>
    )
  }

  return shapeArray
}

function Circle({color}: {color: string}) {
  return (
    <svg viewBox='0 0 1 1' height='100%' width='100%'>
      <circle cx='0.5' cy='0.5' r='0.45' fill={color} stroke='black' strokeWidth='0.05' />
    </svg>   
  )
}

function Square({color}: {color: string}) {
  return (
    <svg viewBox='0 0 1 1' height='100%' width='100%'>
      <rect x='0.1' y='0.1' width='0.8' height='0.8' fill={color} stroke='black' strokeWidth='0.05' />      
    </svg>
  )
}

function Tri({color}: {color: string}) {

  const yOffsetBelow: number = 0.06698730 // ( 1 - sqrt(3)/2 ) / 2
  const yOffsetAbove: number = 0.93301270 // 1 - yOffsetBelow
  const points: string = `
    0, ${yOffsetAbove}
    0.5, ${yOffsetBelow}
    1.0, ${yOffsetAbove}
  `

  return (
    // The range is (-0.05, 1.05)
    <svg viewBox='-0.05 -0.05 1.1 1.1' width='100%' height='100%'>
      <polygon points={points} fill={color} stroke='black' strokeWidth='0.055' /> {/* 1.1 * 0.05 = 0.055 */}
    </svg>
  )
}

function Cross({color}: {color: string}) {

  const points: string = `
    1,0 2,0 2,1 3,1 3,2 2,2 2,3 1,3 1,2 0,2 0,1 1,1
  `

  return (
    // The range is (-0.15, 3.15)
    <svg viewBox='-0.15 -0.15 3.3 3.3'>
      <polygon points={points} fill={color} stroke='black' strokeWidth='0.165' /> {/* 3.3 * 0.05 = 0.165 */}
    </svg>
  )
}