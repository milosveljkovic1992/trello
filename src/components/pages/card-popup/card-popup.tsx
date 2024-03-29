import { MouseEvent } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { GrClose } from 'react-icons/gr';
import { IoMdList } from 'react-icons/io';
import { MdChecklist } from 'react-icons/md';
import { CgCreditCard } from 'react-icons/cg';

import { RootState, useAppDispatch } from 'store';
import { resetComments } from 'store/comments-slice';
import { closeModal } from 'store/popup-slice';
import { resetCard } from 'store/card-slice';
import type { Comment } from 'store/comments-slice';

import {
  CardDescription,
  CardTitle,
  CommentInput,
  PopupSidebar,
  SingleComment,
} from 'components/organisms';

import { Overlay } from './card-popup-styles';

export const CardPopup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();

  const card = useSelector((state: RootState) => state.card.details);
  const { isLoading, hasFailed } = useSelector(
    (state: RootState) => state.card,
  );
  const comments = useSelector(
    (state: RootState) => state.comments.commentsList,
  );

  const { boardId } = urlParams;

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    if (
      target.classList.contains('card-overlay') ||
      target.classList.contains('close-btn') ||
      target.classList.contains('close-btn__icon')
    ) {
      navigate(`/b/${boardId}`);
      dispatch(closeModal());
      dispatch(resetCard());
      dispatch(resetComments());
    }
  };

  if (!card) {
    return <></>;
  }

  return (
    <Overlay onClick={handleClose} className="card-overlay">
      <div className="container">
        {!isLoading && (
          <>
            <div className="header">
              <div className="section-icon-container">
                <CgCreditCard />
              </div>
              <CardTitle />
            </div>

            <div className="card-content">
              <div className="main">
                <section>
                  <div className="section-header">
                    <div className="section-icon-container">
                      <IoMdList />
                    </div>
                    <div className="section-title">Description</div>
                  </div>

                  <div className="section-content">
                    {!hasFailed && <CardDescription />}
                  </div>
                </section>

                <section>
                  <div className="section-header">
                    <div className="section-icon-container">
                      <MdChecklist />
                    </div>
                    <div className="section-title">Activity</div>
                  </div>

                  <div className="section-content">
                    <div className="comment-section">
                      <div className="user-icon" />
                      {!hasFailed && <CommentInput />}
                    </div>
                    {!!comments.length &&
                      comments.map(
                        (comment: Comment) =>
                          comment.data.text && (
                            <SingleComment key={comment.id} comment={comment} />
                          ),
                      )}
                  </div>
                </section>
              </div>

              <PopupSidebar />
            </div>

            <div className="close-btn">
              <GrClose className="close-btn__icon" />
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
};
