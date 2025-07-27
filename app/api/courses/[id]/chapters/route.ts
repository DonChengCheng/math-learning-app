import { NextResponse } from 'next/server'
import { getCourseChapters } from '@/lib/courses'

// GET /api/courses/[id]/chapters - 获取课程的所有章节
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chapters = await getCourseChapters(params.id)
    return NextResponse.json(chapters)
  } catch (error) {
    console.error('获取课程章节失败:', error)
    return NextResponse.json(
      { error: '获取课程章节失败' },
      { status: 500 }
    )
  }
}