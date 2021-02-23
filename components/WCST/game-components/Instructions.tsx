import React, { useState, useEffect } from 'react'

const paragraphs: string[] = [
  'Welcome to the Wisconsin Card Sorting Task! This is a landmark neuro-cognitive test that is used to assess deficits in mental "set shifting", i.e., the ability to show cognitive flexibility amid changing circumstances.',

  'How do you play? Of the four cards above, one is correct while the others are incorrect. Your job is to pick the correct one. But how do you know which one is correct? There is a "rule" that determines which card is correct, and to succeed you will need to figure out what the rule is.',

  'The rule is about how your card matches with the four above it. You can either match for color, shape, or amount. So, if the rule is "color", then you would pick the card that is the same color. Likewise, if the rule is "shape", then you would pick the card that uses the same shape.',

  'But how do you figure out what the rule is? Use guess-and-check until you can reason what it is. Remember: the rule is to match the cards for either "color", "shape", or "amount". These are the only things the rule could potentially be.',

  'However, there is a catch! The rule will randomly change after you pick 15-25 cards. For example, the rule might randomly switch from matching "colors" to "amount". To keep up with the changes, you have to use your cognitive "set-shifting" capabilities.',

  'Interestingly, there are some people with brain damage to certain regions in the frontal cortex that are able to figure out what the initial rule is, but then fail at the task once the rule changes. In other words, they have lost their cognitive flexibility and can no longer "set-shift".',

  'Press START to see for yourself. Can you feel what it is like to "set-shift" when the rule changes? Once you\'re comfortable with the standard version of the task, click "next" to learn about how to make it challenging even for non-cognitively-impaired individuals.',

  'When playing the normal version of this task, if you find yourself absent mindedly matching cards without paying attention, you might accidentally revert back to a previous rule. This is because set-shifting requires at least some degree of mental effort.',

  'Therefore, one way to make the Wisconsin Card Sorting Task more difficult is to find ways to tax people\'s cognitive capacity while they are playing the game.  That way, they have less mental resources they can use to play the game with. Also, they might be more likely to become distracted. ',

  'A very simple way to tax people\'s cognitive capacity might simply be to require them to pick cards as quickly as they can. This is because if people consume all their mental resources to try and go as fast as possible, they might not have any left over to set-shift with.',

  'It\'s time to try it out for yourself. Optimize your play for "speed" rather than "accuracy" and see what happens. Rather than using your mouse or touch-pad to select a card, you can use the "1", "2", "3", and "4" keys on your keyboard to go even faster.',

  'Do you find yourself needing to slow down to "set-shift" whenever the rule chances?  Also, do you occasionally end up reverting back to a previous rule?',

  'Thank you for playing the Wisconsin Card Sorting Task!! Just so you know, we\'ve got several other educational psychology games that you can have fun experimenting with. If you\'re curious, here\'s the link: '
]
const maxPageIndex: number = paragraphs.length - 1;

export default function Instructions () {

  const [pageNumber, setPageNumber] = useState<number>(0)
  const [leftText, setLeftText] = useState<string>(paragraphs[0])

  useEffect(() => {
    setLeftText(paragraphs[pageNumber])
  }, [pageNumber])

  const handleClickPrev = () => {
    if (pageNumber > 0) {
      setPageNumber(prev => {
        return prev - 1
      })      
    }
  }

  const handleClickNext = () => {
    if (pageNumber < maxPageIndex)
    setPageNumber(prev => {
      return prev + 1
    })
  }
  
  const buttonStylings: string = 'px-3 py-1 mx-2 font-semibold rounded-full focus:outline-none'
  const buttonCanClickStylings: string = 'bg-darkest text-lighter hover:text-g transition-color duration-75'
  const buttonNoClickStylings: string = 'bg-gray-500 text-lightest cursor-default'

  return (
    <div className='relative w-96 mx-12 bg-lighter border-black border-5 rounded-3xl shadow-xl-custom'>
      {pageNumber === 0 ? <p className='font-semibold p-5 pb-2 text-center text-gray-900 text-xl'>HOW TO PLAY: </p> : null}
      <p className={`font-semibold text-justify text-gray-900 p-5 ${pageNumber === 0 ? 'pt-0' : null}`}>
        {leftText}
        {/* TODO: update the link here. */}
        {pageNumber === maxPageIndex ? <a className={'font-semibold text-gray-900 p-5 pl-0'}>(TODO: decided on a domain and brand name)</a> : null}
      </p>

      <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2'>
        <button className={`${buttonStylings} ${pageNumber > 0 ? buttonCanClickStylings : buttonNoClickStylings}`}
          onClick={handleClickPrev}>
          Prev
        </button>
        <button className={`${buttonStylings} ${pageNumber < maxPageIndex ? buttonCanClickStylings : buttonNoClickStylings}`}
          onClick={handleClickNext}>
          Next
        </button>
      </div>
    </div>
  )
}