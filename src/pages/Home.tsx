import Container from '../components/UI/Container/Container';
import StyledContainerItem from '../components/UI/ContainerItem/StyledContainerItem';
import logo from '../assets/audilogo.png';
import carImg from '../assets/audirs3.jpg';

function Home() {
  return (
    <Container
      $justify="center"
      $align="center"
      $maxWidth="100%"
      $backgroundColor="var(--brown-900)"
      $height="100vh"
      $gap="1rem"
    >
      <StyledContainerItem to="/makes" $backgroundColor="var(--brown-300)">
        <StyledContainerItem.Image src={logo} alt="Vehicle Models" />

        <StyledContainerItem.Title>Vehicle Makers</StyledContainerItem.Title>
      </StyledContainerItem>
      <StyledContainerItem to="/models" $backgroundColor="var(--brown-300)">
        <StyledContainerItem.Image src={carImg} alt="Vehicle Models" />
        <StyledContainerItem.Title>Vehicle Models</StyledContainerItem.Title>
      </StyledContainerItem>
    </Container>
  );
}

export default Home;
