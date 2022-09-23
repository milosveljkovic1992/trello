import { CardType } from 'store/card-slice';

interface CalculatePosition {
  targetIndex: number;
  targetList: CardType[];
  previousIndex: number;
  previousList: CardType[];
  type?: string;
}

// prettier-ignore
export const calculatePosition = ({
  targetIndex,
  targetList,
  previousIndex,
  previousList,
  type
}: CalculatePosition) => {
  let pos = 1000;
  let isSameList = false;
  const itemsInTargetList = targetList.length;

  // if there are no cards in target list
  // return pos default value which is 1000
  if (itemsInTargetList > 0) {
    isSameList = previousList[0].idList === targetList[0].idList;

    // If target list is same as previous list
    // last index will have value of list.length - 1

    // Example: list contains 3 cards and we wish to transfer
    // a card from first to last place. Cards would contain indexes 0, 1, 2
    // so that would mean the target index would be 2 which is list.length - 1
    const isLastIndexOnSameList =
      isSameList && targetIndex === itemsInTargetList - 1;


    // If target list is NOT the same as previous list
    // last index will have value of list.length

    // Example: target list contains 3 cards and we wish to transfer a card 
    // to the last index. Other cards would keep their current indexes 0, 1, 2
    // and the target index would be index 3 which is the same as list.length
    const isLastItemOnAnotherList =
      !isSameList && targetIndex === itemsInTargetList;

    const itemCurrentlyOnTargetIndex = targetList[targetIndex];

    if (targetIndex === 0) {
      const firstItemPosition = targetList[0].pos;
      const firstItemPositionQuotient = firstItemPosition / 1.1;
      let subtractor = 1;

      // this ensures that result never becomes 
      // negative when subtracting from quotient
      while (firstItemPositionQuotient - subtractor < subtractor * 10) {
        subtractor = subtractor / 10;
      }
      
      pos = Number((firstItemPositionQuotient - subtractor).toFixed(5));

    } else if (isLastIndexOnSameList) {
      // this adds 10000 (arbitrary value) to last index's 
      // position to ensure our card would become last
      pos = itemCurrentlyOnTargetIndex.pos + 10000;

    } else if (isLastItemOnAnotherList) {
      // this adds 10000 (arbitrary value) to last index's 
      // position to ensure our card would become last
      const lastItemOnAnotherList = targetList[targetIndex - 1];
      pos = lastItemOnAnotherList.pos + 10000;

    } else if (isSameList && targetIndex > previousIndex) {
      // this means we are moving the card down the list

      if (type === 'Copy') {
        // if we copy the card on the same list but on later index 
        // we take the [targetindex].pox and [item brefore targetindex].pos and 
        // insert our card between those two, so our copy takes targetindex's position
        const itemBeforeTargetIndex = targetList[targetIndex - 1];
        const targetAndPreviousItemPositionDifference = itemCurrentlyOnTargetIndex.pos - itemBeforeTargetIndex.pos;
        pos = itemCurrentlyOnTargetIndex.pos - (targetAndPreviousItemPositionDifference / 2);
      } else {
        // We take the [targetindex].pos and [item after targetindex].pos value and split the difference.
        // We are confident an item after target will actually exist because we assured in previous
        // cases to check if [targetindex] is last index
        const itemAfterTargetIndex = targetList[targetIndex + 1];
        const targetAndNextItemPositionDifference = itemAfterTargetIndex.pos - itemCurrentlyOnTargetIndex.pos;
        pos = itemCurrentlyOnTargetIndex.pos + (targetAndNextItemPositionDifference / 2);
      }

    } else {
       // this means we are moving the card up the list

      // We take the [targetindex].pos and [item before targetindex].pos value and split the difference.
      // We are confident an item before target will actually exist because we assured in previous
      // cases to check if [targetindex] is index 0
      const itemBeforeTargetIndex = targetList[targetIndex - 1];
      const targetAndPreviousItemPositionDifference = itemCurrentlyOnTargetIndex.pos - itemBeforeTargetIndex.pos;
      pos = itemCurrentlyOnTargetIndex.pos - (targetAndPreviousItemPositionDifference / 2);
    }
  }
  return pos;
};
