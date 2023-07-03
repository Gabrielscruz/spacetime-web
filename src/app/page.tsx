import { cookies } from 'next/headers'
import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptbr from 'dayjs/locale/pt-br'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { MemoryProps } from './interfaces'

dayjs.locale(ptbr)

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: MemoryProps[] = response.data.map((item: MemoryProps) => {
    const isImage: boolean = item.coverUrl.indexOf('jpg') !== -1
    return { ...item, isImage }
  })

  if (memories.length === 0) {
    return <EmptyMemories />
  }
  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="text-gray ml-8 flex items-center gap-2 text-sm before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <>
              {memory.isImage ? (
                <Image
                  src={memory.coverUrl}
                  alt=""
                  width={592}
                  height={280}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              ) : (
                <video
                  src={memory.coverUrl}
                  controls
                  width={592}
                  height={280}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              )}
            </>
            <p className="la text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <Link
              href={`/memories/${memory.id}`}
              className="flex flex-row items-center gap-2"
            >
              Ler mais <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
