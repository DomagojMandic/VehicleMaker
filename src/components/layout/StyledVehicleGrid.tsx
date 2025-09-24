import type { ComponentProps } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* A full usage example of the VehicleGrid component is as follows: */

/* 

<StyledVehicleGridCompound>
  <StyledVehicleGridCompound.Grid>
    <StyledVehicleGridCompound.Card to="/car/123">
      <StyledVehicleGridCompound.Content>
        <StyledVehicleGridCompound.Title>Car Maker</StyledVehicleGridCompound.Title>
        <StyledVehicleGridCompound.Subtitle>Car Model</StyledVehicleGridCompound.Subtitle>
      </StyledVehicleGridCompound.Content>
    </StyledVehicleGridCompound.Card>
  </StyledVehicleGridCompound.Grid>
</StyledVehicleGridCompound>

*/

// Base styled component
const StyledVehicleGrid = styled.div`
  margin: 2rem 3.5rem 3rem 3.5rem;
`;

// Grid layout
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 21.875rem);
  gap: 2rem;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
  padding: 3rem 2rem;
`;

// Card component with TypeScript props
interface CardProps extends ComponentProps<typeof Link> {
  to: string;
}

const Card = styled(Link)<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border-radius: 12px;
  padding: 1.5rem;
  background-color: var(--brown-100);
  width: 21.875rem;
  height: 21.875rem;
  min-width: 21.875rem;
  min-height: 21.875rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

// Content wrapper
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 0.8vw, 0.6rem);
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  color: var(--brown-900);
  margin: 0;
  line-height: 1.2;
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--brown-700);
  margin: 0;
  line-height: 1.3;
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Details = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--brown-500);
  margin: 0;
  line-height: 1.3;
  text-align: center;
  font-style: italic;
`;

const StyledVehicleGridCompound = Object.assign(StyledVehicleGrid, {
  Grid,
  Card,
  Content,
  Title,
  Subtitle,
  Details,
});

export default StyledVehicleGridCompound;
