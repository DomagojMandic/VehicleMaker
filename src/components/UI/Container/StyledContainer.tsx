import styled from 'styled-components';

interface ContainerProps {
  $direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  $width?: string;
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
  $radius?: string;
}

const StyledContainer = styled.div<ContainerProps>`
  width: ${(props) => props.$width || 'auto'};
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
  border-radius: ${(props) => props.$radius || ''};
`;

export default StyledContainer;
