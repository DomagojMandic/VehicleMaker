import Container from '../components/UI/Container/Container';
import StyledContainerItem from '../components/UI/ContainerItem/StyledContainerItem';
import logo from '../assets/audilogo.png';
import carImg from '../assets/audirs3.jpg';

function Home() {
  return (
    <Container
      $direction="column"
      $justify="center"
      $align="center"
      $maxWidth="100%"
      $backgroundColor="var(--brown-900)"
      $height="100vh"
      $gap="1rem"
    >
      <Container $gap="2rem" $padding="2rem">
        <StyledContainerItem
          to="/create-make"
          $backgroundColor="var(--brown-300)"
          $height="15rem"
          $minHeight="15rem"
        >
          <StyledContainerItem.Title>
            Create a Vehicle Maker
          </StyledContainerItem.Title>
        </StyledContainerItem>
        <StyledContainerItem
          to="/create-model"
          $backgroundColor="var(--brown-300)"
          $height="15rem"
          $minHeight="15rem"
        >
          <StyledContainerItem.Title>
            Create a Vehicle Model
          </StyledContainerItem.Title>
        </StyledContainerItem>
      </Container>

      <Container $gap="2rem" $padding="2rem">
        <StyledContainerItem to="/makes" $backgroundColor="var(--brown-300)">
          <StyledContainerItem.Image src={logo} alt="Vehicle Models" />

          <StyledContainerItem.Title>Vehicle Makers</StyledContainerItem.Title>
        </StyledContainerItem>
        <StyledContainerItem to="/models" $backgroundColor="var(--brown-300)">
          <StyledContainerItem.Image src={carImg} alt="Vehicle Models" />
          <StyledContainerItem.Title>Vehicle Models</StyledContainerItem.Title>
        </StyledContainerItem>
      </Container>
    </Container>
  );
}

export default Home;
