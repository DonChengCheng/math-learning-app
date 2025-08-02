import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getCourseById } from '@/lib/courses'

// GET /api/courses/[id] - 获取单个课程详情
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const resolvedParams = await params
    const course = await getCourseById(resolvedParams.id, session?.user?.id)

    if (!course) {
      return NextResponse.json(
        { error: '课程不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('获取课程详情失败:', error)
    return NextResponse.json(
      { error: '获取课程详情失败' },
      { status: 500 }
    )
  }
}