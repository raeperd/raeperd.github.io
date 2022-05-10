import Link from 'next/link';

export default function PaginationButton(
  { pagePath, isFirstPage, isLastPage, pageNumber }: PaginationButtonProps,
) {
  return (
    <nav className="main-nav">
      {!isFirstPage && (<PrevButton pagePath={pagePath || '/'} pageNumber={pageNumber} />)}
      {!isLastPage && (<NextButton pagePath={pagePath || '/'} pageNumber={pageNumber} />)}
    </nav>
  )
}

export interface PaginationButtonProps extends NavButtonProps {
  isFirstPage: boolean,
  isLastPage: boolean,
}

function PrevButton({ pagePath, pageNumber }: NavButtonProps) {
  const prevPageLink = pageNumber === 2 ? `${pagePath}` : `${pagePath}pages/${pageNumber - 1}`
  return (
    <Link href={prevPageLink}>
      <a className="prev">&lt; Prev Page</a>
    </Link>
  )
}

function NextButton({ pagePath, pageNumber }: NavButtonProps) {
  return (
    <Link href={`${pagePath}pages/${pageNumber + 1}`}>
      <a className="next">Next Page &gt;</a>
    </Link>
  )
}

interface NavButtonProps {
  pagePath: string,
  pageNumber: number,
}
