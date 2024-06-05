import { useEffect, useState } from 'react';
import { StreamService, StreamType } from '~/api/Stream';

export const useStream = (id: string | undefined) => {
  const [data, setData] = useState<StreamType>();

  const fetchData = async () => {
    if (!id) return;
    try {
      const data = await StreamService.get({ id });
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    data,
  };
};
