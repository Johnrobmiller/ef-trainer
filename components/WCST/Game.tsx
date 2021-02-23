import React, { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as states from '../../util/WCST/gameStates'
import _ from 'lodash'

import styles from '../../styles/WCST.module.css'

import * as util from '../../util/WCST/gameUtil'
import type * as types from '../../util/WCST/gameTypes'
import * as enums from '../../util/WCST/gameTypes'

import UpperOptions from './game-components/UpperOptions'
import PlayerCard from './game-components/PlayerCard'
import StartText from './game-components/StartText'
import Instructions from './game-components/Instructions'
import RightPanel from './game-components/RightPanel'

const COUNTER_LIMIT_LOW = 15;
const COUNTER_LIMIT_HIGH = 25;

let trialTimer: number;

export default function Game() {

  // CREATING STATES
  const [playerCard, setPlayerCard] = useState<types.ICard>(util.createDefaultPlayerCard)
  const [optionsProps, setOptionsProps] = useState<types.OptionProps[]>(util.createDefaultOptionProps())
  const [theRule, setTheRule] = useState<{attribute: types.Attributes, value: types.Color | types.Shape | types.Amount}>({
    attribute: enums.Attributes.color,
    value: enums.Color.green
  })
  const [ruleCounter, setRuleCounter] = useState<{count: number, limit: number}>({
    count: 0,
    limit: _.random(COUNTER_LIMIT_LOW, COUNTER_LIMIT_HIGH)
  })
  const [hasTheGameStarted, setHasTheGameStarted] = useRecoilState(states.hasTheGameStarted)
  const [startText, setStartText] = useState<string>('PRESS START TO PLAY')
  const [stats, setStats] = useState<{totalTrials: number, totalCorrect: number, prevResponseTime: number, avgResponseTime: number}>({
    totalTrials: 0,
    totalCorrect: 0,
    prevResponseTime: 0,
    avgResponseTime: 0,
  })
  
  // RECOIL STATES
  const [triggerForNewTrial, setTriggerForNewTrial] = useRecoilState(states.triggerForNewTrial)
  const setPlayerTyped1 = useSetRecoilState(states.playerUsedKeyboardArray[0])
  const setPlayerTyped2 = useSetRecoilState(states.playerUsedKeyboardArray[1])
  const setPlayerTyped3 = useSetRecoilState(states.playerUsedKeyboardArray[2])
  const setPlayerTyped4 = useSetRecoilState(states.playerUsedKeyboardArray[3])

  // CREATING THE INITIAL RULE
  useEffect( () => {
    const newRuleAttribute = _.sample<types.Attributes>(enums.Attributes)!
    const newRuleValue = util.createNewRuleValue(newRuleAttribute)
    setTheRule({attribute: newRuleAttribute, value: newRuleValue})
    trialTimer = Date.now()
  }, [])

  // THIS EFFECT HOOK EXECUTES AFTER EACH "TRIAL"
  useEffect( () => {
    
    // IS IT TIME TO CHANGE THE RULE YET?
    if (ruleCounter.count >= ruleCounter.limit) {

      const newRuleAttribute: types.Attributes = _.chain(Object.values(enums.Attributes))
        .filter(item => { return item !== theRule.attribute })
        .sample()
        .value() as types.Attributes

      // IF SO, THEN SET THE NEW RULE ATTRIBUTE/VALUE, THEN RESET THE RULE COUNTER
      const newRuleValue = util.createNewRuleValue(newRuleAttribute)
      setTheRule({attribute: newRuleAttribute, value: newRuleValue})
      setRuleCounter({...ruleCounter, limit: _.random(COUNTER_LIMIT_LOW, COUNTER_LIMIT_HIGH)})

      // IF NOT, THEN ONLY SET A NEW RULE VALUE
    } else {
      const newValue = util.createNewRuleValue(theRule.attribute)
      if (newValue === theRule.value) createNewCards()
      else setTheRule({...theRule, value: newValue})
    }

  }, [ruleCounter.count])

  // CREATE NEW CARDS ONLY AFTER THE RULE HAS BEEN SET //
  useEffect( () => {
    createNewCards()
  }, [theRule])

  // THIS CREATES THE NEW CARDS (OPTIONS + PLAYER)
  const createNewCards = (): void => {
    setOptionsProps(util.createNewOptionsProps(theRule.attribute, theRule.value))
    setPlayerCard(util.createPlayerCard(theRule.attribute, theRule.value))  
  }

  // CREATING A KEYDOWN EVENT LISTENER
  useEffect( () => {

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)

  }, [optionsProps, hasTheGameStarted])

  // WHEN THE triggerForNewTrial.trigger STATE UPDATES, THIS TRIGGERS THE START OF A NEW TRIAL
  useEffect( () => {
    if (triggerForNewTrial.trigger === true) {
      startANewTrial(triggerForNewTrial.didTheyGetItRight)
      setTriggerForNewTrial({trigger: false, didTheyGetItRight: false})
    }
  }, [triggerForNewTrial.trigger])

  // THIS IS WHAT HAPPENS WHEN THE USER PRESSES A KEY
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (hasTheGameStarted) {
      switch(event.key) {
        case '1':
          setPlayerTyped1(true)
          return startANewTrial(optionsProps[0].isTheRightAnswer)
        case '2':
          setPlayerTyped2(true)
          return startANewTrial(optionsProps[1].isTheRightAnswer)
        case '3':
          setPlayerTyped3(true)
          return startANewTrial(optionsProps[2].isTheRightAnswer)
        case '4':
          setPlayerTyped4(true)
          return startANewTrial(optionsProps[3].isTheRightAnswer)
      }
    }
  }

  // THIS IS THE FIRST FUNCTION THAT EXECUTES AFTER PLAYER CHOOSES OPTION 
  const startANewTrial = (isTheRightAnswer: boolean): void => {

    const trialResponseTime = Date.now() - trialTimer
    const newAvgResponseTime = ((stats.avgResponseTime * stats.totalTrials) + trialResponseTime) / (stats.totalTrials + 1)
    trialTimer = Date.now()
    let totalCorrect: number;

    if (isTheRightAnswer) {
      totalCorrect = stats.totalCorrect + 1
      setStartText('CORRECT!')
    } else { 
      totalCorrect = stats.totalCorrect
      setStartText('WRONG, TRY AGAIN.')
    }

    setStats(prev => {
      return {
        totalTrials: prev.totalTrials + 1,
        totalCorrect: totalCorrect,
        prevResponseTime: trialResponseTime,
        avgResponseTime: newAvgResponseTime
      }
    })

    const newCount = ruleCounter.count >= ruleCounter.limit ? 0 : ruleCounter.count + 1
    setRuleCounter({...ruleCounter, count: newCount})
  }

  const clickedOnStart = () => {
    setHasTheGameStarted(true)
    if (!hasTheGameStarted) setStartText('NOW, PICK A CARD.')
  }

  // FINALLY, THE JSX
  return (
    <div className={`${styles.game1} overflow-auto`}>
      <div className={`${styles.game2} flex flex-col justify-evenly`}>

        <UpperOptions optionsProps={optionsProps} />

        <div className='flex justify-center transform'>
          <Instructions />
          <PlayerCard card={playerCard} />
          <RightPanel stats={stats} />
        </div>

        <StartText
          color={playerCard.color}
          startText={startText}
          clickedOnStart={clickedOnStart}/>
          
        <div className=' absolute text-b text-y'></div>
        {/* This is so that the PurgeCss searcher can find these classes, which are otherwise only created dynamically */}
        
      </div>
    </div>
  )
}