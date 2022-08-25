import { BoardPage, CardPopup, LandingPage } from 'components/pages';

import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

export const RenderRoutes = () => {
  const popupModalOpen = useSelector((state: RootState) => state.popup.open);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/b/:boardId/*" element={<BoardPage />}>
        {popupModalOpen && <Route path="c/:cardUrl" element={<CardPopup />} />}
      </Route>
    </Routes>
  );
};
