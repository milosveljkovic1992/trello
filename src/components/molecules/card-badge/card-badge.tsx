import { ReactNode } from 'react';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;

  margin: 0 10px 5px 0;

  .badge-icon {
    margin-right: 3px;
  }
`;

interface CardBadgeProps {
  icon: ReactNode;
  count?: number;
}

export const CardBadge = ({ icon, count }: CardBadgeProps) => {
  return (
    <Container>
      <span className="badge-icon">{icon}</span>
      {!!count && <span className="badge-count">{count}</span>}
    </Container>
  );
};
