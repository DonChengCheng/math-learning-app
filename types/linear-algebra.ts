export interface LinearAlgebraCourse {
  title: string
  description: string
  level: string
  subject: string
  order: number
  chapters: LinearAlgebraChapter[]
}

export interface LinearAlgebraChapter {
  title: string
  description: string
  order: number
  lessons: LinearAlgebraLesson[]
}

export interface LinearAlgebraLesson {
  title: string
  content: string
  videoUrl?: string
  order: number
  problems: LinearAlgebraProblem[]
}

export interface LinearAlgebraProblem {
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

export interface LinearAlgebraContent {
  course: LinearAlgebraCourse
}

export const LINEAR_ALGEBRA_TAGS = [
  'determinant',
  'matrix',
  'vector',
  'linear_system',
  'vector_space',
  'linear_transformation',
  'eigenvalue',
  'eigenvector',
  'quadratic_form',
  'inner_product',
  'orthogonal',
  'calculation',
  'proof',
  'application'
] as const

export type LinearAlgebraTag = typeof LINEAR_ALGEBRA_TAGS[number]