import NewsPaperdetailContent from './components/NewsPaperdetailContent';

import { getParams } from 'App';

const OfflineNewspaperDetailScreen = () => {
  const { newspaperDetail } = getParams();

  return <NewsPaperdetailContent newspaperDetail={newspaperDetail} />;
};

export default OfflineNewspaperDetailScreen;
