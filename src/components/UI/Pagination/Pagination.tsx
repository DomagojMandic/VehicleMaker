import { useSearchParams } from 'react-router';
import styled from 'styled-components';
import { PAGE_SIZE } from '../../../api/constants';
import { loadFilters } from '../../../utils/localStorage/FilterState';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 24px 0;
`;

const PaginationButton = styled.button<{ $disabled?: boolean }>`
  padding: 8px 16px;
  border: 1px solid var(--gray-300);
  background: var(--white);
  color: var(--gray-900);
  border-radius: 4px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--gray-100);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: var(--gray-700);
  font-size: 14px;
`;

interface PaginationProps {
  totalVehicles: number;
  localStorageKey: string;
}

function Pagination({ totalVehicles, localStorageKey }: PaginationProps) {
  /* We are storing the pagination in the URL to keep it consistent */
  const [searchParams, setSearchParams] = useSearchParams();

  const storedFilters = loadFilters(localStorageKey);

  /* We are getting the current page number from the URL and if we do not have it,
  we set it up on page 1 */
  const currentPageNumber =
    Number(searchParams.get('page')) || Number(storedFilters?.page) || 1;

  const pageCount = Math.ceil(totalVehicles / PAGE_SIZE);

  /* We are handling the previous page button click to control the pagination */
  function handlePreviousPage() {
    const previousPage = currentPageNumber === 1 ? 1 : currentPageNumber - 1;
    searchParams.set('page', previousPage.toString());
    setSearchParams(searchParams);
  }

  /* We are handling the next page button click to control the pagination */

  function handleNextPage() {
    const nextPage =
      currentPageNumber === pageCount
        ? currentPageNumber
        : currentPageNumber + 1;
    searchParams.set('page', nextPage.toString());
    setSearchParams(searchParams);
  }

  /* If the page count is less than or equal to 1, we do not need to render 
     the pagination */
  if (pageCount <= 1) return null;

  /* If the page count is greater than 1, we render the pagination and
   the page information */
  return (
    <PaginationContainer>
      <PaginationButton
        $disabled={currentPageNumber === 1}
        disabled={currentPageNumber === 1}
        onClick={() => handlePreviousPage()}
      >
        Previous
      </PaginationButton>

      <PageInfo>
        {(currentPageNumber - 1) * PAGE_SIZE + 1}
        {' to '}
        {currentPageNumber === pageCount
          ? totalVehicles
          : currentPageNumber * PAGE_SIZE}
      </PageInfo>

      <PaginationButton
        $disabled={currentPageNumber === pageCount}
        disabled={currentPageNumber === pageCount}
        onClick={() => handleNextPage()}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
}

export default Pagination;
