import * as requests from './requests';
import createUserApiGetter from './createUserApiGetter';

export const getUserApi = createUserApiGetter(requests);
