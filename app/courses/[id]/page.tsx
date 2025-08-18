import { auth } from '@/auth'
import { getCourseById, ChapterWithLessons, Lesson } from '@/lib/courses'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CoursePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const resolvedParams = await params
  const course = await getCourseById(resolvedParams.id, session.user.id)

  if (!course) {
    notFound()
  }

  const totalLessons = course.chapters.reduce((total: number, chapter: ChapterWithLessons) => {
    return total + chapter.lessons.length
  }, 0)

  const completedLessons = course.chapters.reduce((total: number, chapter: ChapterWithLessons) => {
    return total + chapter.lessons.filter((lesson: Lesson) => 
      lesson.progress && lesson.progress.length > 0
    ).length
  }, 0)

  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/courses" className="text-gray-700 hover:text-gray-900">
                课程中心
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">{course.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* 课程信息头部 */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {course.level}
                </span>
                <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {course.subject}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {course.description || '暂无课程描述'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{course.chapters.length}</div>
                  <div className="text-sm text-gray-500">章节</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{totalLessons}</div>
                  <div className="text-sm text-gray-500">课时</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-gray-500">完成进度</div>
                </div>
              </div>
              
              {progressPercentage > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>学习进度</span>
                    <span>{completedLessons}/{totalLessons} 课时</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 章节列表 */}
        <div className="space-y-6">
          {course.chapters.map((chapter: ChapterWithLessons, index: number) => {
            const chapterProgress = chapter.lessons.filter((lesson: Lesson) => 
              lesson.progress && lesson.progress.length > 0
            ).length
            
            const chapterProgressPercentage = chapter.lessons.length > 0 
              ? (chapterProgress / chapter.lessons.length) * 100 
              : 0

            return (
              <div key={chapter.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        第{index + 1}章 {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {chapter.description || '暂无章节描述'}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span>{chapter.lessons.length} 课时</span>
                        <span className="mx-2">•</span>
                        <span>{chapterProgress}/{chapter.lessons.length} 已完成</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-500 mb-1">
                        {Math.round(chapterProgressPercentage)}%
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${chapterProgressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {chapter.lessons.map((lesson: Lesson, lessonIndex: number) => {
                    const isCompleted = lesson.progress && lesson.progress.length > 0
                    
                    return (
                      <div key={lesson.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                              isCompleted 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {isCompleted ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <span className="text-xs font-medium">{lessonIndex + 1}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                {lesson.title}
                              </h4>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <span>课时 {lessonIndex + 1}</span>
                                {lesson.problems && lesson.problems.length > 0 && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <span>{lesson.problems.length} 道练习题</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <Link href={`/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`}>
                            <Button size="sm" variant={isCompleted ? "outline" : "default"}>
                              {isCompleted ? '复习' : '学习'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}