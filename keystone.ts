import { config } from '@keystone-6/core';
import type { StorageConfig } from '@keystone-6/core/types';
import { lists } from './schema';
import { withAuth, session } from './auth';


export const storage: Record<string, StorageConfig> = {
  studentImages: {
    kind: 'local',
    type: 'image',
    storagePath: 'public/uploads',
    serverRoute: { path: '/uploads' },
    generateUrl: (path: string) => `/uploads/${path}`,
  },
};

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    storage,
    session,
  })
);
