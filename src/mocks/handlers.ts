import { rest } from 'msw';
import store from 'store';

export const handlers = [
  // members-slice.ts
  // getMemberInfo(APItoken: string)
  rest.get(`/1/tokens/:APItoken/member`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: '123',
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
  rest.get(`/1/members/:memberid/boards`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '123',
          name: 'board name',
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
  rest.post('/1/boards/?name=:newBoardTitle', async (req, res, ctx) => {
    const newBoardTitle = req.url.searchParams.get('name');
    const lastIndex = store.getState().boards.boardsArray.length - 1;
    const nextId = (
      Number(store.getState().boards.boardsArray[lastIndex].id) + 100
    ).toString();

    const dashTitle = newBoardTitle ? newBoardTitle.replace(/\s/g, '-') : '';

    return await res(
      ctx.json({
        id: nextId,
        name: newBoardTitle,
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
  rest.get(
    `/1/batch?urls=/1/boards/:boardId,/1/boards/:boardId/lists,/1/boards/:boardId/cards`,
    (req, res, ctx) => {
      // TODO: assign boardId to results where needed
      // TODO: remove unnecessary properties from results
      return res(
        ctx.json([
          {
            200: {
              closed: false,
              desc: '',
              descData: null,
              id: '62b1cd3432719f45de39b45c',
              idEnterprise: null,
              idOrganization: '629da0648480c80a1dcfcbed',
              labelNames: {
                black: '',
                black_dark: '',
                black_light: '',
                blue: '',
                blue_dark: '',
                blue_light: '',
                green: '',
                green_dark: '',
                green_light: '',
                lime: '',
                lime_dark: '',
                lime_light: '',
                orange: '',
                orange_dark: '',
                orange_light: '',
                pink: '',
                pink_dark: '',
                pink_light: '',
                purple: '',
                purple_dark: '',
                purple_light: '',
                red: '',
                red_dark: '',
                red_light: '',
                sky: '',
                sky_dark: '',
                sky_light: '',
                yellow: '',
                yellow_dark: '',
                yellow_light: '',
              },
              name: '222',
              pinned: false,
              prefs: {
                background: '62b4387ee84689843bbb2725',
                backgroundBottomColor: '#4a370c',
                backgroundBrightness: 'light',
                backgroundColor: null,
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
              shortUrl: 'https://trello.com/b/hNAPttR6',
              url: 'https://trello.com/b/hNAPttR6/222',
            },
          },
          {
            200: [
              {
                closed: false,
                id: '62b1cd3432719f45de39b463',
                idBoard: '62b1cd3432719f45de39b45c',
                name: 'To Do',
                pos: 16384,
                softLimit: null,
                subscribed: false,
              },
              {
                closed: false,
                id: '62b1cd3432719f45de39b464',
                idBoard: '62b1cd3432719f45de39b45c',
                name: 'Doing',
                pos: 32768,
                softLimit: null,
                subscribed: false,
              },
              {
                closed: false,
                id: '62b1cd3432719f45de39b465',
                idBoard: '62b1cd3432719f45de39b45c',
                name: 'Done',
                pos: 49152,
                softLimit: null,
                subscribed: false,
              },
            ],
          },
          {
            200: [
              {
                badges: {
                  attachments: 0,
                  attachmentsByType: {
                    trello: {
                      board: 0,
                      card: 0,
                    },
                  },
                  checkItems: 0,
                  checkItemsChecked: 0,
                  checkItemsEarliestDue: null,
                  comments: 1,
                  description: true,
                  due: null,
                  dueComplete: false,
                  fogbugz: '',
                  location: false,
                  start: null,
                  subscribed: false,
                  viewingMemberVoted: false,
                  votes: 0,
                },
                cardRole: null,
                checkItemStates: null,
                closed: false,
                cover: {
                  brightness: 'dark',
                  color: null,
                  idAttachment: null,
                  idPlugin: null,
                  idUploadedBackground: null,
                  size: 'normal',
                },
                dateLastActivity: '2022-08-08T12:25:36.396Z',
                desc: '423',
                descData: {
                  emoji: {},
                },
                due: null,
                dueComplete: false,
                dueReminder: null,
                email: null,
                id: '62d95fc92d516f0acf03e90a',
                idAttachmentCover: null,
                idBoard: '62b1cd3432719f45de39b45c',
                idChecklists: [],
                idLabels: [],
                idList: '62b1cd3432719f45de39b463',
                idMembers: [],
                idMembersVoted: [],
                idShort: 10,
                isTemplate: false,
                labels: [],
                manualCoverAttachment: false,
                name: '423',
                pos: 999,
                shortLink: 'TuGjlJgo',
                shortUrl: 'https://trello.com/c/TuGjlJgo',
                start: null,
                subscribed: false,
                url: 'https://trello.com/c/TuGjlJgo/10-423',
              },
              {
                badges: {
                  attachments: 0,
                  attachmentsByType: {
                    trello: {
                      board: 0,
                      card: 0,
                    },
                  },
                  checkItems: 0,
                  checkItemsChecked: 0,
                  checkItemsEarliestDue: null,
                  comments: 1,
                  description: true,
                  due: null,
                  dueComplete: false,
                  fogbugz: '',
                  location: false,
                  start: null,
                  subscribed: false,
                  viewingMemberVoted: false,
                  votes: 0,
                },
                cardRole: null,
                checkItemStates: null,
                closed: false,
                cover: {
                  brightness: 'dark',
                  color: null,
                  idAttachment: null,
                  idPlugin: null,
                  idUploadedBackground: null,
                  size: 'normal',
                },
                dateLastActivity: '2022-08-08T12:25:36.396Z',
                desc: '423',
                descData: {
                  emoji: {},
                },
                due: null,
                dueComplete: false,
                dueReminder: null,
                email: null,
                id: '62d95fc92d516f0acf03e90b',
                idAttachmentCover: null,
                idBoard: '62b1cd3432719f45de39b45c',
                idChecklists: [],
                idLabels: [],
                idList: '62b1cd3432719f45de39b463',
                idMembers: [],
                idMembersVoted: [],
                idShort: 10,
                isTemplate: false,
                labels: [],
                manualCoverAttachment: false,
                name: '423',
                pos: 999,
                shortLink: 'TuGjlJgo',
                shortUrl: 'https://trello.com/c/TuGjlJgo',
                start: null,
                subscribed: false,
                url: 'https://trello.com/c/TuGjlJgo/10-423',
              },
              {
                badges: {
                  attachments: 0,
                  attachmentsByType: {
                    trello: {
                      board: 0,
                      card: 0,
                    },
                  },
                  checkItems: 0,
                  checkItemsChecked: 0,
                  checkItemsEarliestDue: null,
                  comments: 1,
                  description: true,
                  due: null,
                  dueComplete: false,
                  fogbugz: '',
                  location: false,
                  start: null,
                  subscribed: false,
                  viewingMemberVoted: false,
                  votes: 0,
                },
                cardRole: null,
                checkItemStates: null,
                closed: false,
                cover: {
                  brightness: 'dark',
                  color: null,
                  idAttachment: null,
                  idPlugin: null,
                  idUploadedBackground: null,
                  size: 'normal',
                },
                dateLastActivity: '2022-08-08T12:25:36.396Z',
                desc: '423',
                descData: {
                  emoji: {},
                },
                due: null,
                dueComplete: false,
                dueReminder: null,
                email: null,
                id: '62d95fc92d516f0acf03e90c',
                idAttachmentCover: null,
                idBoard: '62b1cd3432719f45de39b45c',
                idChecklists: [],
                idLabels: [],
                idList: '62b1cd3432719f45de39b463',
                idMembers: [],
                idMembersVoted: [],
                idShort: 10,
                isTemplate: false,
                labels: [],
                manualCoverAttachment: false,
                name: '423',
                pos: 999,
                shortLink: 'TuGjlJgo',
                shortUrl: 'https://trello.com/c/TuGjlJgo',
                start: null,
                subscribed: false,
                url: 'https://trello.com/c/TuGjlJgo/10-423',
              },
            ],
          },
        ]),
      );
    },
  ),
  // useCardTitle.ts
  // renameCard()

  rest.put(`/1/cards/`, (req, res, ctx) => {
    return res(
      ctx.json({
        name: 'NewTitle',
        id: '123',
        idList: '62b1cd3432719f45de39b463',
        pos: 16384,
        badges: {
          comments: 2,
          description: false,
        },
        desc: '',
      }),
    );
  }),

  // TODO: add other URL handlers
];
