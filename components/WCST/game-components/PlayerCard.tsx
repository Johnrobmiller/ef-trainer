import React from 'react'
import type { ICard } from '../../../util/WCST/gameTypes'
import NewCard from './svg-components/NewCard'

export default function PlayerCard ({ card }: { card: ICard }) {
  return <NewCard playerCardProps={card} isPlayerCard={true}  />
}