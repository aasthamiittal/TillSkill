import { ProgramContent } from '../data/programContent'

/**
 * Individual program page. All programs (US CMA, FMAA, CSCA, Excel and Finance, Others)
 * show the same content from ProgramContent.
 */
export function ProgramDetailPage() {
  return (
    <div className="page">
      <ProgramContent />
    </div>
  )
}
