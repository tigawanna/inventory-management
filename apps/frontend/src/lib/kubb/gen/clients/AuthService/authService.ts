import { getApiAuthMeClient } from './getApiAuthMeClient.ts'
import { postApiAuthRequestEmailVerificationClient } from './postApiAuthRequestEmailVerificationClient.ts'
import { postApiAuthRequestPasswordResetClient } from './postApiAuthRequestPasswordResetClient.ts'
import { postApiAuthResetPasswordClient } from './postApiAuthResetPasswordClient.ts'
import { postApiAuthSigninClient } from './postApiAuthSigninClient.ts'
import { postApiAuthSignoutClient } from './postApiAuthSignoutClient.ts'
import { postApiAuthSignupClient } from './postApiAuthSignupClient.ts'
import { postApiAuthVerifyEmailClient } from './postApiAuthVerifyEmailClient.ts'

export function authService() {
  return {
    postApiAuthSignupClient,
    postApiAuthVerifyEmailClient,
    postApiAuthRequestEmailVerificationClient,
    postApiAuthSigninClient,
    postApiAuthRequestPasswordResetClient,
    postApiAuthResetPasswordClient,
    postApiAuthSignoutClient,
    getApiAuthMeClient,
  }
}