import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">掌握数学，</span>
            <span className="block text-primary">开启智慧之门</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            专业的在线数学学习平台，涵盖从小学到大学的全部数学课程。通过互动式学习、智能练习和个性化指导，让数学学习变得简单有趣。
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  免费开始学习
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  浏览课程
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="py-12">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">主要功能</h2>
            <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
              <div>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-gray-900">系统化课程</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  从基础到高级，覆盖小学、初中、高中、大学各个阶段的数学知识点，循序渐进，系统学习。
                </dd>
              </div>

              <div>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-gray-900">智能练习</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  根据你的学习进度和掌握情况，智能推荐适合的练习题目，帮助巩固知识点。
                </dd>
              </div>

              <div>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-gray-900">学习分析</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  详细的学习数据分析，了解自己的强项和弱项，有针对性地提升数学能力。
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
