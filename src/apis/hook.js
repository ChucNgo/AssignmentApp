import React, {useEffect, useState} from 'react';

const useRequest = (func, options = {}) => {
  const [state, setState] = useState({
    loading: options?.manual ? false : true,
    data: null,
    error: null,
  });

  const fetchData = async params => {
    try {
      setState(old => ({
        ...old,
        loading: true,
      }));
      const result = await func(params || options?.params);
      setState({
        loading: false,
        data: result,
        error: '',
      });
      options?.onSuccess &&
        options.onSuccess(result, params || options?.params);
    } catch (e) {
      if (e.message === 'SESSION_EXPIRED') {
      }
      options?.onError && options.onError(e.message, params || options?.params);
      setState({
        loading: false,
        data: null,
        error: e.message,
      });
    }
  };

  useEffect(() => {
    !options.manual && fetchData();
  }, [func]);

  const run = async params => {
    await fetchData(params);
  };

  const reset = async () => {
    setState({
      loading: options?.manual ? false : true,
      data: null,
      error: null,
    });
  };

  return {
    ...state,
    run,
    reset,
  };
};

export default useRequest;
