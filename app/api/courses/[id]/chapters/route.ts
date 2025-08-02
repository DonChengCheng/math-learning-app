import { NextResponse } from 'next/server'
import { getCourseChapters } from '@/lib/courses'

// GET /api/courses/[id]/chapters - 获取课程的所有章节
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const chapters = await getCourseChapters(resolvedParams.id)
    return NextResponse.json(chapters)
  } catch (error) {
    console.error('获取课程章节失败:', error)
    return NextResponse.json(
      { error: '获取课程章节失败' },
      { status: 500 }
    )
  }
}