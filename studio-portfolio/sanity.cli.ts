import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID || 'gtdmlu06',
    dataset: 'production',
  },
  graphql: [
    {
      playground: true,
      // tag: 'production',
      // workspace: 'production',
      id: 'production',
    },
  ],
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
