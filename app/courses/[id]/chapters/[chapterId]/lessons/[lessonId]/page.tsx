import { auth } from '@/auth'
import { getLessonById } from '@/lib/courses'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LessonPage({
  params
}: {
  params: { id: string; chapterId: string; lessonId: string }
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const lesson = await getLessonById(params.lessonId, session.user.id)

  if (!lesson) {
    notFound()
  }

  const isCompleted = lesson.userProgress?.completed || false

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <Link href={`/courses/${lesson.chapter.course.id}`} className="ml-1 text-gray-700 hover:text-gray-900 md:ml-2">
                  {lesson.chapter.course.title}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">{lesson.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* 课时头部信息 */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {lesson.chapter.course.level}
                </span>
                <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {lesson.chapter.course.subject}
                </span>
                {isCompleted && (
                  <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    已完成
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {lesson.title}
              </h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>所属章节：{lesson.chapter.title}</span>
                {lesson.problems && lesson.problems.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{lesson.problems.length} 道练习题</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 课时内容 */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{lesson.content}</div>
          </div>
          
          {lesson.videoUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">视频讲解</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="w-full h-64 rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* 练习题 */}
        {lesson.problems && lesson.problems.length > 0 && (
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">练习题</h3>
            <div className="space-y-4">
              {lesson.problems.map((problem: any, index: number) => (
                <div key={problem.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {index + 1}. {problem.title}
                      </h4>
                      <p className="text-gray-600 mt-2">{problem.content}</p>
                      <div className="flex items-center mt-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          problem.difficulty <= 2 
                            ? 'bg-green-100 text-green-800'
                            : problem.difficulty <= 3
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          难度 {problem.difficulty}
                        </span>
                        <span className="ml-2 text-gray-500">
                          {problem.points} 分
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          <Link href={`/courses/${lesson.chapter.course.id}`}>
            <Button variant="outline">
              返回课程
            </Button>
          </Link>
          
          <div className="flex items-center space-x-4">
            {!isCompleted && (
              <Button>
                标记为已完成
              </Button>
            )}
            {lesson.problems && lesson.problems.length > 0 && (
              <Button>
                开始练习
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}