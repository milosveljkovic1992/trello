import { CardType } from 'store/card-slice';

interface CalculatePosition {
  targetIndex: number;
  targetList: CardType[];
  previousIndex: number;
  previousList: CardType[];
}

export const calculatePosition = ({
  targetIndex,
  targetList,
  previousIndex,
  previousList,
}: CalculatePosition) => {
  let pos = 1000;
  let isSameList = false;
  if (targetList.length > 0) {
    isSameList = previousList[0].idList === targetList[0].idList;
  }
  const isLastIndex = targetIndex === targetList.length - 1;
  const isLastItemOnAnotherList = targetIndex === targetList.length;

  if (targetList.length > 0) {
    if (targetIndex === 0) {
      pos = Math.round(targetList[0].pos / 2) - 1;
    } else if (isSameList && isLastIndex) {
      pos = targetList[targetIndex].pos + 11000;
    } else if (isLastItemOnAnotherList) {
      pos = targetList[targetIndex - 1].pos + 10000;
    } else if (isSameList && targetIndex > previousIndex) {
      pos =
        targetList[targetIndex].pos +
        (targetList[targetIndex + 1].pos - targetList[targetIndex].pos) / 2;
    } else {
      pos =
        targetList[targetIndex].pos -
        (targetList[targetIndex].pos - targetList[targetIndex - 1].pos) / 2;
    }
  }
  return pos;
};
