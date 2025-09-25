import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid var(--gray-300);
  border-top: 4px solid var(--brown-500);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 16px;
  color: var(--brown-700);
  font-size: 14px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface LoadingSpinnerProps {
  text: string;
}

function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <LoadingOverlay>
      <LoadingContainer>
        <Spinner />
        <LoadingText>{text}</LoadingText>
      </LoadingContainer>
    </LoadingOverlay>
  );
}

export default LoadingSpinner;
