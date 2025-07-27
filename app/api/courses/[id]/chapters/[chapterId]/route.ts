import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getChapterById } from '@/lib/courses'

// GET /api/courses/[id]/chapters/[chapterId] - 获取单个章节详情
export async function GET(
  request: Request,
  { params }: { params: { id: string; chapterId: string } }
) {
  try {
    const session = await auth()
    const chapter = await getChapterById(params.chapterId, session?.user?.id)

    if (!chapter) {
      return NextResponse.json(
        { error: '章节不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(chapter)
  } catch (error) {
    console.error('获取章节详情失败:', error)
    return NextResponse.json(
      { error: '获取章节详情失败' },
      { status: 500 }
    )
  }
}