import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

const sessionSecret = process.env.SESSION_SECRET || '123456789012345678901234567890123456';


export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'name email',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export const session = statelessSessions({
  secret: sessionSecret,
});
