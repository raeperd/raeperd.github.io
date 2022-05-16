import Link from 'next/link';

export default function PaginationButton(
  { pagePath, isFirstPage, isLastPage, pageNumber, lastPageNumber }: PaginationButtonProps,
) {
  return (
    <nav className="pagination">
      <PrevButton pagePath={pagePath || '/'} pageNumber={pageNumber} isActive={!isFirstPage} />
      {Array(lastPageNumber).fill(0).map((_, index) => (
        <PageNumberButton
          pagePath={pagePath || '/'}
          pageNumber={index + 1}
          isActive={index + 1 === pageNumber}
        />
      ))}
      <NextButton pagePath={pagePath || '/'} pageNumber={pageNumber} isActive={!isLastPage} />
    </nav>
  )
}

export interface PaginationButtonProps extends Pick<NavButtonProps, 'pageNumber' | 'pagePath'> {
  isFirstPage: boolean,
  isLastPage: boolean,
  lastPageNumber: number
}

function PrevButton({ pagePath, pageNumber, isActive }: NavButtonProps) {
  const prevPageLink = pageNumber === 2 ? `${pagePath}` : `${pagePath}pages/${pageNumber - 1}`
  return (
    <Link href={prevPageLink}>
      <a className={isActive ? '' : 'disabled'} data-cy="page-prev-button">&lt;</a>
    </Link>
  )
}

function PageNumberButton({ pagePath, pageNumber, isActive }: NavButtonProps) {
  return (
    <Link href={`${pagePath}pages/${pageNumber}`}>
      <a className={isActive ? 'active' : ''} data-cy="page-number-button">{pageNumber}</a>
    </Link>
  )
}

function NextButton({ pagePath, pageNumber, isActive }: NavButtonProps) {
  return (
    <Link href={`${pagePath}pages/${pageNumber + 1}`}>
      <a className={isActive ? '' : 'disabled'} data-cy="page-next-button">&gt;</a>
    </Link>
  )
}

interface NavButtonProps {
  pagePath: string,
  pageNumber: number,
  isActive: boolean
}
