import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getUserCourseProgress, updateUserProgress } from '@/lib/courses'

// GET /api/courses/[id]/progress - 获取用户学习进度
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const progress = await getUserCourseProgress(session.user.id, params.id)
    
    if (!progress) {
      return NextResponse.json(
        { error: '课程不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error('获取学习进度失败:', error)
    return NextResponse.json(
      { error: '获取学习进度失败' },
      { status: 500 }
    )
  }
}

// POST /api/courses/[id]/progress - 更新学习进度
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const { lessonId, completed } = await request.json()

    const progress = await updateUserProgress(
      session.user.id,
      params.id,
      lessonId,
      completed
    )

    return NextResponse.json(progress)
  } catch (error) {
    console.error('更新学习进度失败:', error)
    return NextResponse.json(
      { error: '更新学习进度失败' },
      { status: 500 }
    )
  }
}