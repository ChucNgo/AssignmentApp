import {fetch} from '../request';

export const getLastestNews = async () => {
  const result = await fetch('https://newsapi.org/v2/everything', {
    q: 'tesla',
    from: '2022-12-05',
    sortBy: 'publishedAt',
    apiKey: 'aa1e2ea9047d41fe9a8d2ceabf2a05af',
    pageSize: 15,
  });
  return result;
};
