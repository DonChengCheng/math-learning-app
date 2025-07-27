// 扩展的课程类型定义

export interface CourseWithChapters {
  id: string
  title: string
  description: string | null
  level: string
  subject: string
  order: number
  createdAt: Date
  updatedAt: Date
  chapters: ChapterWithLessons[]
  userProgress?: {
    progress: number
    completed: boolean
    lastAccess: Date
  } | null
}

export interface ChapterWithLessons {
  id: string
  title: string
  description: string | null
  order: number
  lessons: LessonWithProblems[]
}

export interface LessonWithProblems {
  id: string
  title: string
  content: string
  videoUrl: string | null
  order: number
  problems?: Problem[]
  progress?: Array<{
    completed: boolean
    progress: number
  }>
}

export interface Problem {
  id: string
  title: string
  content: string
  type: string
  difficulty: number
  points: number
  answer: unknown
  explanation: string | null
  tags: string[]
}

export interface LessonDetail {
  id: string
  title: string
  content: string
  videoUrl: string | null
  order: number
  chapter: {
    id: string
    title: string
    course: {
      id: string
      title: string
      level: string
      subject: string
    }
  }
  problems: Problem[]
  userProgress?: {
    completed: boolean
    progress: number
  } | null
}