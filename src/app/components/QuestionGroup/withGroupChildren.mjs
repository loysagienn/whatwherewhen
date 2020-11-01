import { createDataLoadHoc } from 'app/utils';
import { loadQuestionGroupChildren } from 'app/actions';
import { selectGroupChildrenLoader } from 'app/selectors';

const withGroupChildren = createDataLoadHoc({
    selectLoader: (state, { groupId }) => selectGroupChildrenLoader(groupId)(state),
    loadAction: ({ groupId }) => loadQuestionGroupChildren(groupId),
});

export default withGroupChildren;
