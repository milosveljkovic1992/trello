import { BoardPage, CardPopup, LandingPage } from 'components/pages';

import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { SinglePage } from 'components/templates';

export const RenderRoutes = () => {
  const popupModalOpen = useSelector((state: RootState) => state.popup.open);
  const isMemberLoading = useSelector(
    (state: RootState) => state.member.isLoading,
  );
  const isBoardLoading = useSelector(
    (state: RootState) => state.board.isLoading,
  );

  return (
    <SinglePage>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {!isMemberLoading && (
          <Route path="/b/:boardId/*" element={<BoardPage />}>
            {!isBoardLoading && popupModalOpen && (
              <Route path="c/:cardUrl" element={<CardPopup />} />
            )}
          </Route>
        )}
      </Routes>
    </SinglePage>
  );
};
