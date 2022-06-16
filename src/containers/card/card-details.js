import React from 'react'; 
import { useSelector } from 'react-redux';

import { CgCreditCard } from 'react-icons/cg';
import { IoMdList } from 'react-icons/io';
import { MdChecklist } from 'react-icons/md';

import { CardOverlay } from '../../components';
import { CardTitleContainer } from './card-title-container';
import { SingleCommentContainer } from '../comments/single-comment-container';
import { CommentInputContainer } from '../comments/comment-input-container';
import { CardDescriptionContainer } from './card-description-container';

export const CardDetails = ({ handleClose, setIsUpdated }) => {
    const comments = useSelector(state => state.comments.commentsList);
    
    return (
        <CardOverlay onClick={e => handleClose(e)} className="card-overlay">
            <CardOverlay.Container>
                <CardOverlay.CardHeader>
                    <CardOverlay.Icon>
                        <CgCreditCard />
                    </CardOverlay.Icon>
                    
                    <CardTitleContainer />

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
                            <CardDescriptionContainer />
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
                                <CommentInputContainer setIsUpdated={setIsUpdated} />

                            </CardOverlay.CommentSection>
                            {!!comments.length && comments.map(comment => (
                                <SingleCommentContainer 
                                    key={comment.id} 
                                    comment={comment} 
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

