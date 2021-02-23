import React, { useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import * as states from '../../../../util/WCST/gameStates'
import { sizingOptionCard, borderOptionCard } from './OneTwoThreeFour'

export default function CardSilhouette ({ isTheRightAnswer, cardId }: { isTheRightAnswer: boolean, cardId: number }) {

  const [fadeStylings, setFadeStylings] = useState<string>('duration-0 opacity-0')
  const [bgColor, setBgColor] = useState<string>('bg-g')

  const hasTheGameStarted = useRecoilValue(states.hasTheGameStarted)
  const [playerUsedKeyboard, setPlayerUsedKeyboard] = useRecoilState(states.playerUsedKeyboardArray[cardId - 1])

  useEffect( () => {

    if (playerUsedKeyboard) {
      flashTheColor()
      setPlayerUsedKeyboard(false)
    }
  }, [playerUsedKeyboard])

  const flashTheColor = () => {
    if (hasTheGameStarted) {
      setBgColor(isTheRightAnswer ? 'bg-g' : 'bg-r')
      setFadeStylings('duration-0 opacity-70')

      setTimeout( () => {
        setFadeStylings('duration-500 opacity-0')
      }, 150)
    }
  }

  const cursorStyles: string = hasTheGameStarted ? 'cursor-pointer' : 'cursor-default'

  return (
    <div
      className={`
        ${sizingOptionCard} ${borderOptionCard} ${bgColor} ${cursorStyles} ${fadeStylings}
        transition-opacity ease-in-out absolute`}
      onClick={flashTheColor}>
    </div>
  )
}