import parseGroup from './parseGroup';
import createQuestionsOrder from './createQuestionsOrder';

// parseGroup(0).then(() => console.log('parse finished'));

createQuestionsOrder().then(() => console.log('create order success'));
