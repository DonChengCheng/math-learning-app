export interface CalculusCourse {
  title: string
  description: string
  level: string
  subject: string
  order: number
  chapters: CalculusChapter[]
}

export interface CalculusChapter {
  title: string
  description: string
  order: number
  lessons: CalculusLesson[]
}

export interface CalculusLesson {
  title: string
  content: string
  videoUrl?: string
  order: number
  problems: CalculusProblem[]
}

export interface CalculusProblem {
  title: string
  content: string
  type: 'multiple_choice' | 'fill_blank' | 'solution'
  difficulty: 1 | 2 | 3 | 4 | 5
  points: number
  answer: MultipleChoiceAnswer | FillBlankAnswer | SolutionAnswer
  explanation?: string
  tags: string[]
}

export interface MultipleChoiceAnswer {
  type: 'multiple_choice'
  options: string[]
  correct: number[]
}

export interface FillBlankAnswer {
  type: 'fill_blank'
  blanks: string[]
}

export interface SolutionAnswer {
  type: 'solution'
  steps: string[]
  finalAnswer: string
}

export interface CalculusContent {
  course: CalculusCourse
}

export const CALCULUS_TAGS = [
  'limit',
  'continuity',
  'derivative',
  'integral',
  'fundamental_theorem',
  'chain_rule',
  'product_rule',
  'quotient_rule',
  'optimization',
  'related_rates',
  'area',
  'volume',
  'series',
  'convergence',
  'taylor_series',
  'multivariable',
  'partial_derivative',
  'multiple_integral',
  'vector_calculus',
  'calculation',
  'proof',
  'application',
  'graphing'
] as const

export type CalculusTag = typeof CALCULUS_TAGS[number]