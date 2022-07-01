import React from 'react';
import { Overlay } from './card-overlay-styles';
import { useSelector } from 'react-redux';

import { CgCreditCard } from 'react-icons/cg';
import { IoMdList } from 'react-icons/io';
import { MdChecklist } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';

import { Title } from '../../molecules/card/title';
import { SingleCommentContainer } from '../../molecules/card/comments/single-comment-container';
import { CommentInputContainer } from '../../molecules/card/comments/comment-input-container';
import { Description } from '../../molecules/card/description';

const CardOverlay = ({ handleClose, setIsUpdated }) => {
    const comments = useSelector(state => state.comments.commentsList);
    
    return (
        <Overlay onClick={e => handleClose(e)} className="card-overlay">
            <div className="container">
                <div className="header">
                    <div className="section-icon-container">
                        <CgCreditCard />
                    </div>
                    <Title />
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
                                <Description />
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
                                    <CommentInputContainer setIsUpdated={setIsUpdated}/>
                                </div>
                                {!!comments.length && comments.map(comment => (
                                    comment.data.text && <SingleCommentContainer  key={comment.id}  comment={comment}  />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="sidebar">
                        <h2>Sidebar</h2>
                    </div>
                </div>

                <div className="close-btn">
                    <GrClose className="close-btn__icon"/>
                </div>
            </div>
        </Overlay>
    )
}

export default CardOverlay;