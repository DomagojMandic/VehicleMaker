import styled from 'styled-components';

interface StyledHeaderProps {
  $backgroundColor?: string;
  $padding?: string;
  $boxShadow?: string;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  background-color: ${(props) => props.$backgroundColor || 'var(--brown-900)'};
  padding: ${(props) => props.$padding || '2rem'};
  box-shadow: ${(props) => props.$boxShadow || ''};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 8rem;
  width: 100%;
`;

export default StyledHeader;
