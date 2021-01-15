// import MockAdapter from 'axios-mock-adapter';
// import {apiClient, githubIssueApiRequest} from './client';
// import {githubIssueEndpoint} from './endpoint';
//
// const githubIssueApiMock = new MockAdapter(apiClient);
//
// describe('【API】githubIssueApiRequest', () => {
//   afterEach(() => {
//     githubIssueApiMock.reset();
//   });
//   afterAll(() => {
//     githubIssueApiMock.restore();
//   });
//
//   describe('getIssues: サーバのデータは5件', () => {
//     const mockData = [
//       {id: '00000001', number: 1, title: 'title1'},
//       {id: '00000002', number: 2, title: 'title2'},
//       {id: '00000003', number: 3, title: 'title3'},
//       {id: '00000004', number: 4, title: 'title4'},
//       {id: '00000005', number: 5, title: 'title5'},
//     ];
//
//     test('offset=0, limit=2を指定したとき2件のデータが取得できる', async () => {
//       const offset = 0;
//       const limit = 2;
//
//       githubIssueApiMock
//         .onGet(githubIssueEndpoint.getIssues({offset, limit}))
//         .reply(200, mockData.slice(offset * limit, offset * limit + limit));
//
//       const response = await githubIssueApiRequest.getIssues({offset, limit});
//
//       expect(response).toStrictEqual(mockData.slice(0, 2));
//       expect(response).toHaveLength(2);
//     });
//
//     test('offset=0, limit=10を指定したとき5件のデータが取得できる', async () => {
//       const offset = 0;
//       const limit = 10;
//
//       githubIssueApiMock
//         .onGet(githubIssueEndpoint.getIssues({offset, limit}))
//         .reply(200, mockData.slice(offset * limit, offset * limit + limit));
//
//       const response = await githubIssueApiRequest.getIssues({offset, limit});
//
//       expect(response).toStrictEqual(mockData);
//       expect(response).toHaveLength(mockData.length);
//     });
//   });
//
//   describe('getIssue', () => {
//     const mockData = [
//       {id: '00000001', number: 1, title: 'title1'},
//       {id: '00000002', number: 2, title: 'title2'},
//       {id: '00000003', number: 3, title: 'title3'},
//       {id: '00000004', number: 4, title: 'title4'},
//       {id: '00000005', number: 5, title: 'title5'},
//     ];
//
//     test('指定したnumber(3)のデータが取得できる', async () => {
//       const number = 3;
//
//       githubIssueApiMock
//         .onGet(githubIssueEndpoint.getIssue({issueNumStr: number.toString()}))
//         .reply(
//           200,
//           mockData.find((d) => d.number === number),
//         );
//
//       const response = await githubIssueApiRequest.getIssue({
//         issueNumStr: number.toString(),
//       });
//
//       expect(response).toStrictEqual(mockData[2]);
//     });
//   });
// });
