import _ from 'lodash'
import type * as types from './gameTypes'
import * as enums from './gameTypes'

// GETS A NEW RULE VALUE
export function createNewRuleValue (correctAttribute: types.Attributes): types.Color | types.Shape | types.Amount {
  switch (correctAttribute) {
    case enums.Attributes.color: return _.sample(enums.Color)!
    case enums.Attributes.shape: return _.sample(enums.Shape)!
    case enums.Attributes.amount: return _.sample(enums.Amount)!
  }
}

// RETURNS SOME OPTION CARDS WITH DEFAULT VALUES
export function createDefaultOptionProps(): types.OptionProps[] {
  const output: types.OptionProps[] = []
  for (let i = 1; i < 5; i++) {
    output.push({
      cardId: i,
      isTheRightAnswer: false,
      card: {
        color: enums.Color.green,
        shape: enums.Shape.circle,
        amount: enums.Amount.one
      }
    })
  }
  return output
}

export function createDefaultPlayerCard(): types.ICard {
  return {
    color: enums.Color.green,
    shape: enums.Shape.circle,
    amount: enums.Amount.one
  }
}

// RETURNS OPTION CARDS (THE CARDS THEMSELVES + isTheRightAnswer + cardId)
export function createNewOptionsProps(correctAttribute: types.Attributes, correctValue: types.Color | types.Shape | types.Amount): types.OptionProps[] {
  const output: types.OptionProps[] = createDefaultOptionProps();
  const newCards: types.ICard[] = createOptionCards() 
  const theCorrectCard: number = _.findIndex(newCards, card => {
    return card[correctAttribute] === correctValue
  })
  for (let i = 0; i < 4; i++) output[i].card = newCards[i]
  output[theCorrectCard].isTheRightAnswer = true
  return output
}

// MAKES THE OPTION CARDS (ONLY THE CARDS THEMSELVES)
function createOptionCards(): types.ICard[] {
  const cardChoices: types.ICard[] = []
  for(let i = 0; i < 4; i++) {
    cardChoices.push({
      color: createShuffledEnum('color', enums.Color, true, cardChoices),
      shape: createShuffledEnum('shape', enums.Shape, true, cardChoices),
      amount: createShuffledEnum('amount', enums.Amount, true, cardChoices)
    })
  }
  return cardChoices
}

// MAKES THE PLAYER'S CARD
export function createPlayerCard(correctAttribute: types.Attributes, correctValue: types.Color | types.Shape | types.Amount): types.ICard {
  return {
    color: correctAttribute === 'color' ? correctValue : createShuffledEnum('color', enums.Color),
    shape: correctAttribute === 'shape' ? correctValue : createShuffledEnum('shape', enums.Shape),
    amount: correctAttribute === 'amount' ? correctValue : createShuffledEnum('amount', enums.Amount)
  }
}

// THIS IS WHAT IS USED TO RANDOMLY SHUFFLE THE OPTION CARDS ATTRIBUTES
function createShuffledEnum(prop: string, myEnum: any, filter: boolean = false, cardChoices: types.ICard[] = []): any {
  return(
    _.chain(Object.values(myEnum))
      .filter(item => {
        return filter ? _.find(cardChoices, [prop, item]) === undefined : true
      })
      .sample()
      .value()
  )
}