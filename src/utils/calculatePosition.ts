import { CardType } from 'store/card-slice';

interface CalculatePosition {
  targetIndex: number;
  targetList: CardType[];
  previousIndex: number;
  previousList: CardType[];
}

// prettier-ignore
export const calculatePosition = ({
  targetIndex,
  targetList,
  previousIndex,
  previousList,
}: CalculatePosition) => {
  let pos = 1000;
  let isSameList = false;
  const itemsInTargetList = targetList.length;
  
  if (itemsInTargetList > 0) {
    isSameList = previousList[0].idList === targetList[0].idList;
  }

  const isLastIndexOnSameList =
    isSameList && targetIndex === itemsInTargetList - 1;
  const isLastItemOnAnotherList =
    !isSameList && targetIndex === itemsInTargetList;

  if (itemsInTargetList > 0) {
    const itemCurrentlyOnTargetIndex = targetList[targetIndex];

    if (targetIndex === 0) {
      pos = Math.round(targetList[0].pos / 2) - 1;
      
    } else if (isLastIndexOnSameList) {
      pos = itemCurrentlyOnTargetIndex.pos + 10000;

    } else if (isLastItemOnAnotherList) {
      const lastItemOnAnotherList = targetList[targetIndex - 1];
      pos = lastItemOnAnotherList.pos + 10000;

    } else if (isSameList && targetIndex > previousIndex) {
      const itemAfterTargetIndex = targetList[targetIndex + 1];
      const targetAndNextItemPositionDifference = itemAfterTargetIndex.pos - itemCurrentlyOnTargetIndex.pos;
      pos = itemCurrentlyOnTargetIndex.pos + (targetAndNextItemPositionDifference / 2);

    } else {
      const itemBeforeTargetIndex = targetList[targetIndex - 1];
      const targetAndPreviousItemPositionDifference = itemCurrentlyOnTargetIndex.pos - itemBeforeTargetIndex.pos;
      pos = itemCurrentlyOnTargetIndex.pos - (targetAndPreviousItemPositionDifference / 2);

    }
  }
  return pos;
};
