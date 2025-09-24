import { Link } from 'react-router';
import styled from 'styled-components';

interface ContainerItemProps {
  $flex?: string; // "1", "0 1 auto"
  $padding?: string;
  $backgroundColor?: string;
  $borderRadius?: string;
}

const StyledContainerItem = styled(Link)<ContainerItemProps>`
  width: 280px;
  height: 280px;
  min-width: 280px;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: ${(props) => props.$padding || ''};
  background-color: ${(props) => props.$backgroundColor || 'var(--white)'};
  border-radius: ${(props) => props.$borderRadius || 'var(--border-radius-md)'};
  border: 2px solid var(--brown-100);
  box-shadow: var(--shadow-sm);

  text-decoration: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--brown-300);
    background-color: var(--brown-100);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const StyledTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: var(--spacing-md);
  color: var(--brown-900);
`;

const StyledImage = styled.img`
  width: 80%;
  height: 80%;
  display: block;
  border-radius: var(--border-radius-md);
`;

const StyledContainerItemCompound = Object.assign(StyledContainerItem, {
  Title: StyledTitle,
  Image: StyledImage,
});

export default StyledContainerItemCompound;
