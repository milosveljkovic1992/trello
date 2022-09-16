import { rest } from 'msw';
import store from 'store';

export const handlers = [
  // members-slice.ts
  // getMemberInfo(APItoken: string)
  rest.get(`/1/tokens/:APItoken/member`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'memberId',
        avatarUrl: 'www.abc.com/avatar-img.jpg',
        fullName: 'John Doe',
        url: 'www.johndoe.com',
        username: 'JohnDoe',
        email: 'john@doe.com',
        idBoards: '123',
      }),
    );
  }),

  // boards-slice.ts
  // setBoards(memberid: string)
  rest.get(`/1/members/:memberId/boards`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 'boardId1',
          name: 'old board name',
          prefs: {
            backgroundImage: 'board-image.jpg',
            backgroundImageScaled: [
              {
                url: 'www.abc.com/board-image-1.jpg',
              },
              {
                url: 'www.abc.com/board-image-2.jpg',
              },
              {
                url: 'www.abc.com/board-image-3.jpg',
              },
            ],
          },
        },
        {
          id: 'boardId2',
          name: 'another board name',
          prefs: {
            backgroundImage: 'another-board-image.jpg',
            backgroundImageScaled: [
              {
                url: 'www.abc.com/another-board-image-1.jpg',
              },
              {
                url: 'www.abc.com/another/board-image-2.jpg',
              },
              {
                url: 'www.abc.com/another-board-image-3.jpg',
              },
            ],
          },
        },
      ]),
    );
  }),

  // setBoards(memberId: string)
  rest.get(`/1/members//boards`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 'boardId1',
          name: 'old board name',
          prefs: {
            backgroundImage: 'board-image.jpg',
            backgroundImageScaled: [
              {
                url: 'www.abc.com/board-image-1.jpg',
              },
              {
                url: 'www.abc.com/board-image-2.jpg',
              },
              {
                url: 'www.abc.com/board-image-3.jpg',
              },
            ],
          },
        },
        {
          id: '223',
          name: 'another board name',
          prefs: {
            backgroundImage: 'another-board-image.jpg',
            backgroundImageScaled: [
              {
                url: 'www.abc.com/another-board-image-1.jpg',
              },
              {
                url: 'www.abc.com/another/board-image-2.jpg',
              },
              {
                url: 'www.abc.com/another-board-image-3.jpg',
              },
            ],
          },
        },
      ]),
    );
  }),

  // boards-slice.ts
  // addBoard(newBoardTitle: string)
  rest.post('/1/boards', async (req, res, ctx) => {
    const { name } = await req.json();

    const boards = store.getState().boards.boardsArray;
    const lastIndex = boards.length - 1;
    const nextIdNumber = Number(boards[lastIndex].id.slice(-1)) + 1;

    const newBoardId = `boardId${nextIdNumber}`;
    const dashTitle = name ? name.replace(/\s/g, '-') : '';

    return await res(
      ctx.json({
        id: newBoardId,
        name,
        prefs: {
          backgroundImage: `${dashTitle}-board-image.jpg`,
          backgroundImageScaled: [
            {
              url: `www.abc.com/${dashTitle}-board-image-1.jpg`,
            },
            {
              url: `www.abc.com/${dashTitle}-board-image-2.jpg`,
            },
            {
              url: `www.abc.com/${dashTitle}-board-image-3.jpg`,
            },
          ],
        },
      }),
    );
  }),

  // boards-slice.js
  // sendDeleteRequest(boardId: string)
  rest.delete(`/1/boards/:boardId`, async (req, res, ctx) => {
    const { boardId } = req.params;
    return await res(
      ctx.json({
        boardId,
      }),
    );
  }),

  // board-slice.ts
  // fetchBoardListsAndCards({ boardId, setBoardName }: { boardId: string, setBoardName: Dispatch<SetStateAction<string>> })
  // card-slice.ts
  // getCard({id}: {id: string})

  rest.get(`/1/batch`, (req, res, ctx) => {
    const params = req.url.searchParams.get('urls');
    if (
      params ===
      '/1/boards/boardId1,/1/boards/boardId1/lists,/1/boards/boardId1/cards'
    ) {
      return res(
        ctx.json([
          {
            200: {
              id: 'boardId1',
              name: 'old board name',
              prefs: {
                backgroundImage:
                  'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/b89359b25f83fc84c1e24e7eb282f4d6/photo-1654204933947-f3d067d7151e',
                backgroundImageScaled: [
                  {
                    height: 81,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x81/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 140,
                  },
                  {
                    height: 149,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x149/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 256,
                  },
                  {
                    height: 279,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x279/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 480,
                  },
                  {
                    height: 558,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x558/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 960,
                  },
                  {
                    height: 595,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1024x595/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 1024,
                  },
                  {
                    height: 744,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x744/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 1280,
                  },
                  {
                    height: 1115,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1920x1115/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 1920,
                  },
                  {
                    height: 1190,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1190/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
                    width: 2048,
                  },
                  {
                    height: 1487,
                    url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/b89359b25f83fc84c1e24e7eb282f4d6/photo-1654204933947-f3d067d7151e',
                    width: 2560,
                  },
                ],
              },
            },
          },
          {
            200: [
              {
                closed: false,
                id: 'listId1',
                idBoard: 'boardId1',
                name: 'To Do',
                pos: 16384,
              },
              {
                closed: false,
                id: 'listId2',
                idBoard: 'boardId1',
                name: 'Doing',
                pos: 32768,
              },
              {
                closed: false,
                id: 'listId3',
                idBoard: 'boardId1',
                name: 'Done',
                pos: 49152,
              },
            ],
          },
          {
            200: [
              {
                badges: {
                  comments: 0,
                  description: true,
                },
                closed: false,
                dateLastActivity: '2022-08-08T12:25:36.396Z',
                desc: 'description text',
                id: 'cardId1',
                idBoard: 'boardId1',
                idList: 'listId1',
                name: '223',
                pos: 1024,
              },
              {
                badges: {
                  comments: 5,
                  description: true,
                },
                closed: false,
                dateLastActivity: '2022-08-08T12:25:36.396Z',
                desc: 'sample description',
                id: 'cardId2',
                idBoard: 'boardId1',
                idList: 'listId1',
                name: '323',
                pos: 2048,
              },
              {
                badges: {
                  comments: 2,
                  description: false,
                },
                closed: false,
                dateLastActivity: '2022-08-08T12:25:36.396Z',
                desc: '',
                id: 'cardId3',
                idBoard: 'boardId1',
                idList: 'listId2',
                name: '423',
                pos: 4096,
              },
            ],
          },
        ]),
      );
    } else if (params === '/1/cards/cardId1,/1/cards/cardId1/actions') {
      return res(
        ctx.json([
          {
            200: {
              name: 'NewTitle',
              id: 'cardId1',
              idList: 'listId1',
              pos: 16384,
              badges: {
                comments: 2,
                description: false,
              },
              desc: '',
            },
          },
          {
            200: [
              {
                type: 'commentCard',
                id: 'commentId2',
                data: {
                  text: 'premade comment 2',
                },
                memberCreator: {
                  fullName: 'Jane Doe',
                },
                date: '2022-10-06T09:55:00.361Z',
              },
              {
                type: 'commentCard',
                id: 'commentId1',
                data: {
                  text: 'premade comment 1',
                },
                memberCreator: {
                  fullName: 'John Doe',
                },
                date: '2022-10-05T09:55:00.361Z',
              },
            ],
          },
        ]),
      );
    }
  }),

  // card-slice.ts
  // editDescription({ card: CardType, description: string })
  rest.put(`/1/cards/:cardId`, async (req, res, ctx) => {
    const { cardId } = req.params;
    const { desc } = await req.json();

    return res(
      ctx.json({
        name: 'NewTitle',
        id: cardId,
        idList: 'listId1',
        pos: 16384,
        badges: {
          comments: 2,
          description: false,
        },
        desc,
      }),
    );
  }),

  // cards-slice.ts
  // submitCard({ listId: string, userInput: string })
  rest.post(`/1/cards`, async (req, res, ctx) => {
    const { idList, name } = await req.json();

    const cards = store.getState().cards.cardsArray;
    const lastIndex = cards.length - 1;
    const nextIdNumber = Number(cards[lastIndex].id.slice(-1)) + 1;

    const newCardId = `boardId${nextIdNumber}`;
    const newCardPos = cards[lastIndex].pos * 2;

    return res(
      ctx.json({
        name,
        id: newCardId,
        idList,
        pos: newCardPos,
        badges: {
          comments: 3,
          description: false,
        },
        desc: '',
      }),
    );
  }),

  // comments-slice.ts
  // updatedCard
  rest.get(`/1/cards/:cardId`, (req, res, ctx) => {
    const { cardId } = req.params;
    return res(
      ctx.json({
        name: 'NewTitle',
        id: cardId,
        idList: 'listId1',
        pos: 16384,
        badges: {
          comments: 3,
          description: false,
        },
        desc: '',
      }),
    );
  }),

  // board-slice.ts
  // submitBoardName({ board, boardName}: {board: BoardType, boardName: string})
  rest.put(`/1/boards/:boardId`, async (req, res, ctx) => {
    const { boardId } = req.params;
    const { name } = await req.json();

    return res(
      ctx.json({
        id: boardId,
        name,
        prefs: {
          backgroundImage:
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/b89359b25f83fc84c1e24e7eb282f4d6/photo-1654204933947-f3d067d7151e',
          backgroundImageScaled: [
            {
              height: 81,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x81/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 140,
            },
            {
              height: 149,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x149/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 256,
            },
            {
              height: 279,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x279/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 480,
            },
            {
              height: 558,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x558/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 960,
            },
            {
              height: 595,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1024x595/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 1024,
            },
            {
              height: 744,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1280x744/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 1280,
            },
            {
              height: 1115,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1920x1115/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 1920,
            },
            {
              height: 1190,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1190/ab11f6db3b8b9d6b8a21b0fd17994e8b/photo-1654204933947-f3d067d7151e.jpg',
              width: 2048,
            },
            {
              height: 1487,
              url: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/b89359b25f83fc84c1e24e7eb282f4d6/photo-1654204933947-f3d067d7151e',
              width: 2560,
            },
          ],
        },
      }),
    );
  }),

  // useCardTitle.ts
  // renameCard()
  // card.id : string, title : string

  rest.put(`/1/cards/:cardId`, (req, res, ctx) => {
    const { cardId } = req.params;
    const cardTitle = req.url.searchParams.get('name');
    return res(
      ctx.json({
        name: cardTitle,
        id: cardId,
        idList: 'listId1',
        pos: 16384,
        badges: {
          comments: 2,
          description: false,
        },
        desc: '',
      }),
    );
  }),

  rest.put(`/1/cards/`, (req, res, ctx) => {
    const cardTitle = req.url.searchParams.get('name');
    return res(
      ctx.json({
        name: cardTitle,
        id: 'cardId1',
        idList: 'listId1',
        pos: 16384,
        badges: {
          comments: 2,
          description: false,
        },
        desc: '',
      }),
    );
  }),

  // comments-slice.ts
  // submitComment({ card: CardType, comment: string})
  rest.post(`/1/cards/:cardId/actions/comments`, async (req, res, ctx) => {
    const { text } = await req.json();

    return res(
      ctx.json({
        type: 'commentCard',
        id: 'commentId1',
        data: {
          text,
        },
        memberCreator: {
          fullName: 'John Doe',
        },
        date: '2022-11-05T09:55:00.361Z',
      }),
    );
  }),

  // comments-slice.ts
  // editComment({ card: CardType, id: string, value: string })
  rest.put(`/1/cards/:cardId/actions/:commentId/comments`, (req, res, ctx) => {
    const commentInput = req.url.searchParams.get('text') as string;
    const { commentId } = req.params;
    return res(
      ctx.json({
        type: 'commentCard',
        id: commentId,
        data: {
          text: commentInput,
        },
        memberCreator: {
          fullName: 'John Doe',
        },
        date: '2022-11-05T09:55:00.361Z',
      }),
    );
  }),

  // lists-slice.ts
  // submitList({
  //   userInput: string,
  //   pos: number,
  //   boardId: string
  // })
  rest.post(`/1/lists`, async (req, res, ctx) => {
    const { name, pos, idBoard } = await req.json();

    return res(
      ctx.json({
        closed: false,
        id: 'listId4',
        idBoard,
        name,
        pos: +pos,
      }),
    );
  }),

  // useListTitle.ts
  // submitTitle()
  // list.id : string, listTitle : string
  rest.put(`/1/lists/:listId`, (req, res, ctx) => {
    const listTitle = req.url.searchParams.get('name');
    return res(
      ctx.json({
        closed: false,
        id: 'listId1',
        idBoard: 'boardId1',
        name: listTitle,
        pos: 16384,
      }),
    );
  }),
];
