import styled from 'styled-components';

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaginationWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const StyledPagination = Object.assign(Pagination, {
  Wrapper: PaginationWrapper,
});

export default StyledPagination;
