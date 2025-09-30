import styled from 'styled-components';

interface ContainerProps {
  $direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  $maxWidth?: string;
  $padding?: string;
  $gap?: string;
  $justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  $align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  $backgroundColor?: string;
  $color?: string;
  $height?: string;
}

const StyledContainer = styled.div<ContainerProps>`
  max-width: ${(props) => props.$maxWidth || '60%'};
  margin: 0 auto;
  padding: ${(props) => props.$padding || 'var(--spacing-md)'};
  display: flex;
  flex-direction: ${(props) => props.$direction || 'row'};
  gap: ${(props) => props.$gap || ''};
  justify-content: ${(props) => props.$justify || 'flex-start'};
  align-items: ${(props) => props.$align || 'flex-start'};
  background-color: ${(props) => props.$backgroundColor || 'var(--brown-100)'};
  color: ${(props) => props.$color || 'var(--gray-100)'};
  height: ${(props) => props.$height || 'auto'};
`;

export default StyledContainer;
