import { AiOutlineClose } from 'react-icons/ai';

import { useCardDescription } from 'hooks/useCardDescription';

import { Container } from './card-description.styles';

export const CardDescription = () => {
  const {
    isActive,
    setIsActive,
    description,
    setDescription,
    previousDescription,
    descRef,
    handleActive,
    handleEdit,
  } = useCardDescription();

  return (
    <Container
      isActive={isActive}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => handleActive(e)}
      className="desc-box"
      hasDescription={!!description}
      data-testid="card-description-container"
    >
      {!isActive && (
        <p className="desc-content" data-testid="card-description-content">
          {description || 'Add a more detailed description...'}
        </p>
      )}

      {isActive && (
        <>
          <textarea
            className="desc-input"
            placeholder="Add a more detailed description..."
            ref={descRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div
            className="icon-container"
            data-testid="description-icon-container"
          >
            <div className="btn-container">
              <button className="desc-btn" onClick={() => handleEdit()}>
                Save
              </button>

              <div
                className="desc-btn close-icon-container"
                onClick={() => {
                  setIsActive(false);
                  setDescription(previousDescription);
                }}
                data-testid="close-icon-container"
              >
                <AiOutlineClose />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
