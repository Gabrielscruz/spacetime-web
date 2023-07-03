import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { EmptyMemories } from '@/components/EmptyMemories'
import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { MemoryDataProps } from '../../interfaces'

interface MemoriesProps {
  params: {
    id: string
  }
}
export default async function Memory({ params }: MemoriesProps) {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: MemoryDataProps = {
    ...response.data,
    isImage: response.data.coverUrl.indexOf('jpg') !== -1,
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>
      {JSON.stringify(memory)}
    </div>
  )
}
