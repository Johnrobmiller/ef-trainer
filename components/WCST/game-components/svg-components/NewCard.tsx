import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import * as states from '../../../../util/WCST/gameStates'
import type { OptionProps, ICard } from '../../../../util/WCST/gameTypes'
import { Amount } from '../../../../util/WCST/gameTypes'
import getShapeComponent from './Shapes'
import { OneTwo, ThreeFour } from './OneTwoThreeFour'
import CardSilhouette from './CardSilhouette'

interface INewCardProps {
  optionProps?: OptionProps,
  playerCardProps?: ICard,
  isPlayerCard: boolean,
}

export default function NewCard( { optionProps, playerCardProps, isPlayerCard }: INewCardProps) {

  const hasTheGameStarted = useRecoilValue(states.hasTheGameStarted)
  const setTriggerForNewTrial = useSetRecoilState(states.triggerForNewTrial)

  const handleClick = () => {
    if (!isPlayerCard && hasTheGameStarted) setTriggerForNewTrial({trigger: true, didTheyGetItRight: optionProps!.isTheRightAnswer})
  }

  const card: ICard = isPlayerCard ? playerCardProps! : optionProps!.card
  const shapeComponents: JSX.Element[] = getShapeComponent(card.color, card.shape, card.amount, isPlayerCard)
  let finalComponent: JSX.Element = <></>

  switch (card.amount) {
    case Amount.one:
    case Amount.two:
      finalComponent = <OneTwo isPlayerCard={isPlayerCard}>
        {shapeComponents}
      </OneTwo>
      break
    case Amount.three:
    case Amount.four:
      finalComponent = <ThreeFour isPlayerCard={isPlayerCard}>
        {shapeComponents}
      </ThreeFour>
      break
  }

  const silhouetteComponent: JSX.Element | null = isPlayerCard ? null : <CardSilhouette isTheRightAnswer={optionProps!.isTheRightAnswer} cardId={optionProps!.cardId} />
  const hoverStyles: string | null = !isPlayerCard && hasTheGameStarted ? 'transition-all duration-150 transform hover:scale-110' : null

  return (
    <div className='flex justify-center'>
      <div className={`${hoverStyles}`} onClick={handleClick}>
        {silhouetteComponent}   
        {finalComponent}       
      </div>

    </div> 
  )
}