import {renderHook} from '@testing-library/react-hooks';
import {useIssueApi} from './index';
import {githubIssueApiMock} from './client';
import {githubIssueEndpoint} from './endpoint';

test('getIssues', () => {
  const {result} = renderHook(() => useIssueApi());

  const offset = 0;
  const limit = 10;

  const mockResponse = [
    {id: '00000000', number: 0, title: 'title1'},
    {id: '00000001', number: 1, title: 'title2'},
  ];

  githubIssueApiMock
    .onGet(githubIssueEndpoint.getIssues({offset, limit}))
    .reply(200, mockResponse);

  const {data} = result.current.getIssues({offset, limit});

  expect(data).toStrictEqual(mockResponse);
});
