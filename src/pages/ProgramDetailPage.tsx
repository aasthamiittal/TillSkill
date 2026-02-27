import { Navigate, useParams } from 'react-router-dom'
import { ProgramContent, programSlugs } from '../data/programContent'
import type { ProgramSlug } from '../data/programContent'

export function ProgramDetailPage() {
  const params = useParams<{ slug: ProgramSlug }>()
  const slug = params.slug as ProgramSlug | undefined

  const validSlugs = programSlugs.map((p) => p.slug)

  if (!slug || !validSlugs.includes(slug)) {
    return <Navigate to="/programs" replace />
  }

  return (
    <div className="page">
      <ProgramContent slug={slug} />
    </div>
  )
}
