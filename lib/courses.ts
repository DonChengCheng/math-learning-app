import { prisma } from '@/lib/prisma'

// 课程数据类型定义
export interface CourseWithProgress {
  id: string
  title: string
  description: string | null
  level: string
  subject: string
  order: number
  createdAt: Date
  updatedAt: Date
  chapters: ChapterWithLessons[]
  userProgress?: UserProgress | null
}

export interface ChapterWithLessons {
  id: string
  title: string
  description: string | null
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  content: string
  videoUrl: string | null
  order: number
}

export interface UserProgress {
  userId: string
  courseId: string | null
  progress: number
  completed: boolean
  lastAccess: Date
}

// 获取所有课程（按级别分组）
export async function getAllCourses(userId?: string) {
  const courses = await prisma.course.findMany({
    orderBy: [
      { level: 'asc' },
      { order: 'asc' }
    ],
    include: {
      chapters: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      },
      progress: userId ? {
        where: { userId }
      } : false
    }
  })

  // 按级别分组
  const coursesByLevel = courses.reduce((acc, course) => {
    if (!acc[course.level]) {
      acc[course.level] = []
    }
    
    const courseWithProgress = {
      ...course,
      userProgress: course.progress?.[0] || null
    }
    
    acc[course.level].push(courseWithProgress)
    return acc
  }, {} as Record<string, CourseWithProgress[]>)

  return coursesByLevel
}

// 获取单个课程详情
export async function getCourseById(courseId: string, userId?: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              problems: {
                select: {
                  id: true,
                  title: true,
                  difficulty: true,
                  points: true
                }
              }
            }
          }
        }
      },
      progress: userId ? {
        where: { userId }
      } : false
    }
  })

  if (!course) {
    return null
  }

  return {
    ...course,
    userProgress: course.progress?.[0] || null
  }
}

// 获取用户在特定课程的学习进度
export async function getUserCourseProgress(userId: string, courseId: string) {
  const progress = await prisma.progress.findFirst({
    where: {
      userId,
      courseId
    }
  })

  // 获取课程总课时数和已完成课时数
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        include: {
          lessons: {
            include: {
              progress: {
                where: {
                  userId,
                  completed: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (!course) {
    return null
  }

  const totalLessons = course.chapters.reduce((total, chapter) => {
    return total + chapter.lessons.length
  }, 0)

  const completedLessons = course.chapters.reduce((total, chapter) => {
    return total + chapter.lessons.filter(lesson => lesson.progress.length > 0).length
  }, 0)

  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return {
    ...progress,
    totalLessons,
    completedLessons,
    progressPercentage: Math.round(progressPercentage)
  }
}

// 获取推荐课程（基于用户级别和学习历史）
export async function getRecommendedCourses(userId: string, limit = 6) {
  // 获取用户已学习的课程
  const userProgress = await prisma.progress.findMany({
    where: { userId },
    include: {
      course: true
    }
  })

  const studiedSubjects = userProgress.map(p => p.course?.subject).filter((s): s is string => Boolean(s))
  const studiedLevels = userProgress.map(p => p.course?.level).filter((l): l is string => Boolean(l))

  // 推荐同级别的其他学科课程
  const recommendations = await prisma.course.findMany({
    where: {
      OR: [
        {
          level: { in: studiedLevels },
          subject: { notIn: studiedSubjects }
        },
        {
          level: { in: studiedLevels },
          id: { notIn: userProgress.map(p => p.courseId!) }
        }
      ]
    },
    orderBy: [
      { level: 'asc' },
      { order: 'asc' }
    ],
    take: limit,
    include: {
      chapters: {
        orderBy: { order: 'asc' },
        take: 1
      }
    }
  })

  return recommendations
}

// 更新用户学习进度
export async function updateUserProgress(
  userId: string,
  courseId?: string,
  lessonId?: string,
  completed = false
) {
  const data = {
    userId,
    courseId,
    lessonId,
    completed,
    progress: completed ? 100 : 0,
    lastAccess: new Date()
  }

  return await prisma.progress.upsert({
    where: {
      userId_courseId_lessonId: {
        userId,
        courseId: courseId || '',
        lessonId: lessonId || ''
      }
    },
    update: data,
    create: data
  })
}

// 获取课程章节列表
export async function getCourseChapters(courseId: string) {
  return await prisma.chapter.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          title: true,
          order: true
        }
      }
    }
  })
}

// 获取章节详情
export async function getChapterById(chapterId: string, userId?: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          level: true,
          subject: true
        }
      },
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          problems: {
            select: {
              id: true,
              title: true,
              difficulty: true
            }
          },
          progress: userId ? {
            where: { userId }
          } : false
        }
      }
    }
  })

  if (!chapter) {
    return null
  }

  return {
    ...chapter,
    lessons: chapter.lessons.map(lesson => ({
      ...lesson,
      userProgress: lesson.progress?.[0] || null
    }))
  }
}

// 获取课时详情
export async function getLessonById(lessonId: string, userId?: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      chapter: {
        include: {
          course: {
            select: {
              id: true,
              title: true,
              level: true,
              subject: true
            }
          }
        }
      },
      problems: {
        orderBy: { difficulty: 'asc' }
      },
      progress: userId ? {
        where: { userId }
      } : false
    }
  })

  if (!lesson) {
    return null
  }

  return {
    ...lesson,
    userProgress: lesson.progress?.[0] || null
  }
}