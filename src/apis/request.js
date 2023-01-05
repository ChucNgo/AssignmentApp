import request from 'umi-request';

export const fetch = async (url, params = {}, body = {}) => {
  let headers = {
    baseUrl: '',
  };

  try {
    const response = await request(url, {
      method: 'GET',
      params,
      data: body,
      headers,
    });

    return response;
  } catch (e) {
    if (e.response.status === 403) {
      return {
        data: null,
      };
    }
    throw new Error(
      e?.data?.error?.message ?? 'Unknown Error. Please try again',
    );
  }
};
