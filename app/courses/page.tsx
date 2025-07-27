import { auth } from '@/auth'
import { getAllCourses } from '@/lib/courses'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CoursesPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const coursesByLevel = await getAllCourses(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">课程中心</h1>
          <p className="mt-2 text-gray-600">
            选择适合您的数学课程，开始学习之旅
          </p>
        </div>

        {Object.keys(coursesByLevel).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无课程</h3>
            <p className="text-gray-500">课程正在准备中，敬请期待！</p>
          </div>
        ) : (
          Object.entries(coursesByLevel).map(([level, courses]) => (
            <div key={level} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {level}
              </h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.subject}
                        </span>
                        {course.userProgress && (
                          <span className="text-sm text-gray-500">
                            {Math.round(course.userProgress.progress)}%
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {course.description || '暂无描述'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {course.chapters.length} 个章节
                        </div>
                        <Link href={`/courses/${course.id}`}>
                          <Button size="sm">
                            {course.userProgress?.progress > 0 ? '继续学习' : '开始学习'}
                          </Button>
                        </Link>
                      </div>
                      
                      {course.userProgress && course.userProgress.progress > 0 && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.userProgress.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}