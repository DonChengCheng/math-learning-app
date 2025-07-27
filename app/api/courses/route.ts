import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getAllCourses, getRecommendedCourses } from '@/lib/courses'

// GET /api/courses - 获取所有课程
export async function GET(request: Request) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'recommended' && session?.user?.id) {
      // 获取推荐课程
      const recommendedCourses = await getRecommendedCourses(session.user.id)
      return NextResponse.json(recommendedCourses)
    }

    // 获取所有课程（按级别分组）
    const courses = await getAllCourses(session?.user?.id)
    
    return NextResponse.json(courses)
  } catch (error) {
    console.error('获取课程列表失败:', error)
    return NextResponse.json(
      { error: '获取课程列表失败' },
      { status: 500 }
    )
  }
}