import styled from 'styled-components/macro';

export const Sidebar = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 15px;

  @media (min-width: 768px) {
    width: calc(100% - 570px);
    padding-left: 0;
  }

  h3 {
    font-weight: 600;
  }

  .sidebar-button-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: 300px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  .card-move-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;
