import admin from 'firebase-admin'

export const initializeFirebaseAdmin = () => {
  // workaround: suppress the error
  // The default Firebase app already exists. This means you called initializeApp() more than once...
  if (admin.apps.length > 0) {
    // console.log('firebase is already initialized, so we do nothing...')
    return
  }

  // NOTE: 'noxi-production' is for LOCAL EMULATOR
  const projectId = process.env.ENV_NAME ? undefined : 'noxi-production'

  admin.initializeApp({
    projectId,
    credential: admin.credential.applicationDefault()
  })

  admin.firestore().settings({ ignoreUndefinedProperties: true })
}
