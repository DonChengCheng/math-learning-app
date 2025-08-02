import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getLessonById } from '@/lib/courses'

// GET /api/lessons/[id] - 获取课时详情
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const resolvedParams = await params
    const lesson = await getLessonById(resolvedParams.id, session?.user?.id)

    if (!lesson) {
      return NextResponse.json(
        { error: '课时不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('获取课时详情失败:', error)
    return NextResponse.json(
      { error: '获取课时详情失败' },
      { status: 500 }
    )
  }
}