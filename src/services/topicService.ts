import { useQuery } from 'react-query';

import { API_TOPIC_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import { TopicModel } from 'src/models/topicModel';

import axiosService from './axiosService';

const topicService = {
  getTopic: async (): Promise<TopicModel> => {
    return axiosService()({
      url: `${API_TOPIC_URL.TOPIC_URL}`,
      method: 'GET',
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useGetTopics() {
  return useQuery(
    [QUERY_KEY.TOPICS],
    async () => await topicService.getTopic(),
  );
}
