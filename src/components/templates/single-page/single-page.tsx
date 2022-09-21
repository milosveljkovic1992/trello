import { ReactNode } from 'react';

import { RootState, useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Header } from 'components/organisms';

import { PageContainer } from './single-page.styles';
import { endScroll } from 'store/scroll-slice';

export const SinglePage = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const backgroundImage = useSelector(
    (state: RootState) => state.board.details.prefs.backgroundImage,
  );
  const isHorizontalScrollActive = useSelector(
    (state: RootState) => state.scroll.isScrollActive,
  );

  const handleStopScroll = () => {
    if (isHorizontalScrollActive && location.pathname.includes('/b/')) {
      dispatch(endScroll());
    }
  };

  return (
    <PageContainer
      isHomePage={location.pathname === '/'}
      backgroundImage={backgroundImage}
      onMouseUp={handleStopScroll}
      onMouseLeave={handleStopScroll}
    >
      <Header isHomePage={location.pathname === '/'} />
      {children}
    </PageContainer>
  );
};
