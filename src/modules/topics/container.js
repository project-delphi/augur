import { connect } from 'react-redux';
import TopicsView from 'modules/topics/components/topics-view';

import { selectLoginAccount } from 'modules/account/selectors/login-account';
import { selectTopicLink, selectCreateMarketLink } from 'modules/link/selectors/links';
import { selectGNetTopics } from 'modules/topics/selectors/topics';

const mapStateToProps = state => ({
  branch: state.branch,
  topics: selectGNetTopics(state),
  loginAccount: selectLoginAccount(state)
});

const mapDispatchToProps = dispatch => ({
  selectTopic: topic => selectTopicLink(topic, dispatch).onClick(),
  createMarketLink: selectCreateMarketLink(dispatch)
});

const Topics = connect(mapStateToProps, mapDispatchToProps)(TopicsView);

export default Topics;
