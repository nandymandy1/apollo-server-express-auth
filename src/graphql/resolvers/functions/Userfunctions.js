import {
    pick
} from 'lodash';

import {
    sign,
} from 'jsonwebtoken';

import {
    SECRET
} from '../../../config';

export const issueAuthToken = async (user) => {
    let token = await sign(user, SECRET, {
        expiresIn: 20
    });
    return `Bearer ${token}`;
};

export const serializeUser = user => pick(user, [
    'id',
    'email',
    'username',
    'lastName',
    'firstName',
]);