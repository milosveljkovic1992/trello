import { ReactNode } from 'react';

import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Header } from 'components/organisms';

import { PageContainer } from './single-page.styles';

export const SinglePage = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const backgroundImage = useSelector(
    (state: RootState) => state.board.details.prefs.backgroundImage,
  );

  return (
    <PageContainer
      isHomePage={location.pathname === '/'}
      backgroundImage={backgroundImage}
    >
      <Header isHomePage={location.pathname === '/'} />
      {children}
    </PageContainer>
  );
};
