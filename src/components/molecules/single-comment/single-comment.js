import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux/es/exports';

import axios from 'axios';

import { deleteComment } from 'store/comments-slice';

import { Link } from 'components/atoms';
import { CommentEditContainer } from 'components/molecules';

import { Container } from './single-comment-styles';


export const SingleComment = ({ comment }) => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.card.details);

    const [isActive, setIsActive] = useState(false);

    const handleDelete = () => {
        const deleteRequest = async() => {
            await axios.delete(`/1/cards/${card.id}/actions/${comment.id}/comments`);
        };

        try {
            deleteRequest();
            dispatch(deleteComment(comment));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container key={comment.id}>
            <div className="comment-avatar"></div>
            
            <div className="inner">
                <div className="details">
                    <div className="username">{comment.memberCreator.fullName}</div>

                    <Link to={`#comment-${comment.id}`}>
                        <p className="timestamp">
                            {`${new Date(comment.date).toLocaleDateString('sr-RS')} at 
                            ${new Date(comment.date).toLocaleTimeString('sr-RS')} 
                            `}
                        </p>
                    </Link>

                    {!isActive 
                    ?
                        <>
                            <div className="text-container">
                                <p>{comment.data.text}</p>
                            </div>
                            <div className="actions">
                                <p onClick={() => setIsActive(true)}>Edit</p> 
                                {` - `}
                                <p onClick={() => handleDelete(comment.id)}>Delete</p>
                            </div>
                        </>
                    :
                        <CommentEditContainer 
                            comment={comment}
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />
                    }
                </div>
            </div>
        </Container>
    )
}; 