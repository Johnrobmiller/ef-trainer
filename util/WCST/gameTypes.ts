export enum Shape {
  circle = 'CIRCLE',
  square = 'SQUARE',
  tri = 'TRI',
  cross = 'CROSS'
}
export enum Color {
  green = 'GREEN',
  red = 'RED',
  yellow = 'YELLOW',
  blue = 'BLUE'
}
export enum Amount {
  one = 'ONE',
  two = 'TWO',
  three = 'THREE',
  four = 'FOUR'
}

export enum Attributes {
  color = 'color',
  shape = 'shape',
  amount = 'amount'
}

export interface ICard {
  color: Color
  shape: Shape
  amount: Amount
}

export interface OptionProps {
  cardId: number,
  isTheRightAnswer: boolean,
  card: ICard
}