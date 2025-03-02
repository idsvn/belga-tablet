import { useMutation } from 'react-query';

import { API_BASE_URL } from 'src/constants/apiURL';
import { QUERY_KEY } from 'src/constants/queryKey';

import axiosService from './axiosService';

export interface IssueParams {
  context: string;
  contextId: string;
  pageUrl: string;
  issues: Issue[];
}

export interface Issue {
  issueType: string;
  remarks: string;
}

const issuesService = {
  sendReport: async (params: IssueParams) => {
    return axiosService()({
      url: `${API_BASE_URL}/feedback/issues`,
      method: 'POST',
      data: params,
    })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  },
};

export function useSendReport({ ...params }: IssueParams) {
  const { context, contextId, pageUrl, issues } = params;

  return useMutation(
    [QUERY_KEY.ISSUE, context, contextId, pageUrl, issues],
    () => issuesService.sendReport(params),
  );
}

export default issuesService;
