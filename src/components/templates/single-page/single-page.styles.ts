import styled from 'styled-components/macro';

type PageContainerProps = {
  backgroundImage: string;
  isHomePage: boolean;
};

export const PageContainer = styled.div<PageContainerProps>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(5vh + 25px) 1fr;
  align-items: center;
  min-height: 100vh;

  background-image: ${({ backgroundImage, isHomePage }) =>
    backgroundImage && !isHomePage
      ? `url("${backgroundImage}")`
      : 'linear-gradient(to right, #fff, #fff)'};
  background-size: cover;
  background-position: center;

  @media (min-width: 768px) {
    grid-template-rows: 5vh 1fr;
  }

  .board-inner-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    overflow: auto;

    padding: 0 15px;
  }
`;
