import React, { useState } from 'react';

import { CgCreditCard } from 'react-icons/cg';
import { IoMdList } from 'react-icons/io';
import { MdChecklist } from 'react-icons/md';

import { CardOverlay } from '../../components';
import { SingleCommentContainer } from '../comments/single-comment-container';
import { CommentInputContainer } from '../comments/comment-input-container';

export const CardDetails = ({ card, comments, setComments, handleClose, handleSubmit, handleEdit, handleDelete }) => {
    const [comment, setComment] = useState('');

    return (
        <CardOverlay onClick={e => handleClose(e)} className="card-overlay">
            <CardOverlay.Container>
                <CardOverlay.CardHeader>
                    <CardOverlay.Icon>
                        <CgCreditCard />
                    </CardOverlay.Icon>
                    <CardOverlay.CardTitle>{card.name}</CardOverlay.CardTitle>
                </CardOverlay.CardHeader>

                <CardOverlay.CardContent>
                <CardOverlay.Main>
                    <CardOverlay.Section>
                        <CardOverlay.SectionHeader>
                            <CardOverlay.Icon>
                                <IoMdList />
                            </CardOverlay.Icon>
                            <CardOverlay.SectionTitle>Description</CardOverlay.SectionTitle>
                        </CardOverlay.SectionHeader>
                        
                        <CardOverlay.SectionDetails>
                            <CardOverlay.DescriptionBox 
                                name="description" 
                                placeholder="Add a more detailed description..." 
                            ></CardOverlay.DescriptionBox>
                        </CardOverlay.SectionDetails>
                    </CardOverlay.Section>

                    <CardOverlay.Section>
                        <CardOverlay.SectionHeader>
                            <CardOverlay.Icon>
                                <MdChecklist />
                            </CardOverlay.Icon>
                            <CardOverlay.SectionTitle>Activity</CardOverlay.SectionTitle>
                        </CardOverlay.SectionHeader>
                        
                        <CardOverlay.SectionDetails>
                            <CardOverlay.CommentSection>
                                <CardOverlay.UserIcon />
                                <CommentInputContainer 
                                    handleSubmit={handleSubmit}
                                    comment={comment}
                                    setComment={setComment}
                                />

                            </CardOverlay.CommentSection>
                            {!!comments.length && comments.map(comment => (
                                <SingleCommentContainer 
                                key={comment.id} 
                                comment={comment} 
                                setComment={setComment}
                                handleSubmit={handleSubmit}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete} 
                                />
                            ))}
                           </CardOverlay.SectionDetails>
                    </CardOverlay.Section>

                </CardOverlay.Main>

                <CardOverlay.Sidebar>
                    <h2>Sidebar</h2>
                </CardOverlay.Sidebar>
                </CardOverlay.CardContent>

            </CardOverlay.Container>
        </CardOverlay>
    )
}

