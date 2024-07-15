import { Link } from 'lib/navigation'

export default function TermsOfUseAndPrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6 mb-44">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Terms of Use and Privacy Policy
          </h1>
          <p className="mt-2 text-muted-foreground">
            Effective Date: July 13, 2024
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Table of Contents</h2>
          <nav className="mt-4 space-y-2">
            <Link
              href="#terms-of-use"
              className="text-primary hover:underline"
              prefetch={false}
            >
              Terms of Use
            </Link>
            <br />
            <Link
              href="#privacy-policy"
              className="text-primary hover:underline"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
        <div>
          <h2 id="terms-of-use" className="text-2xl font-bold">
            Terms of Use
          </h2>
          <div className="mt-4 space-y-4">
            <p>
              These Terms of Use (the &quot;Terms&quot;) set forth the terms and
              conditions for using PeakX (the &quot;Service&quot;). By using the
              Service, users (&quot;Users&quot;) agree to be bound by these
              Terms.
            </p>

            <h3 className="text-l font-bold">1. Conditions of Use</h3>
            <p>
              1.1 Users agree to comply with the YouTube Terms of Service (
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                className="underline"
              >
                https://www.youtube.com/t/terms
              </a>
              ) when using the Service.
            </p>
            <p>
              1.2 The Service uses the YouTube Data API to provide information.
              Information obtained through the YouTube Data API is subject to
              YouTube&apos;s Privacy Policy (
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                className="underline"
              >
                https://policies.google.com/privacy
              </a>
              ).
            </p>

            <h3 className="text-l font-bold">2. Privacy</h3>
            <p>
              2.1 Our Privacy Policy (
              <Link
                href="#privacy-policy"
                className="hover:underline"
                prefetch={false}
              >
                #privacy-policy
              </Link>
              ) explains how we collect, use, and share your information. By
              using the Service, Users agree to our Privacy Policy.
            </p>

            <h3 className="text-l font-bold">3. Disclaimer</h3>
            <p>
              3.1 The Service is provided &quot;as is&quot; without warranties
              of any kind, whether express or implied, including but not limited
              to implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>

            <h3 className="text-l font-bold">4. Contact Information</h3>
            <p>
              4.1 If you have any questions about these Terms, please contact us
              here:{' '}
              <a
                href="https://forms.gle/AtHChW8N4R2NRDbu5"
                target="_blank"
                className="underline"
              >
                Google Forms
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 id="privacy-policy" className="text-2xl font-bold">
            Privacy Policy
          </h2>
          <div className="mt-4 space-y-4">
            <p>
              PeakX (the &quot;Service&quot;) respects your privacy and is
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, and share your information.
            </p>

            <h3 className="text-l font-bold">1. Information Collection</h3>
            <div>
              1.1 We may collect information in the following ways:
              <ul>
                <li>- Information you provide to us directly</li>
                <li>
                  - Information we collect automatically when you use the
                  Service (e.g., usage data, device information)
                </li>
                <li>
                  - Cookies and Similar Technologies: The Service may use
                  cookies or similar technologies to enhance the user
                  experience. These technologies allow us to recognize your
                  device or browser and provide personalized content. You have
                  the option to manage or disable cookies through your browser
                  settings.
                </li>
              </ul>
            </div>

            <h3 className="text-l font-bold">2. Use of Information</h3>
            <div>
              2.1 We use the information we collect for the following purposes:
              <ul>
                <li>- To provide and improve the Service</li>
                <li>- To provide user support</li>
                <li>- To comply with legal obligations</li>
              </ul>
            </div>

            <h3 className="text-l font-bold">3. Sharing of Information</h3>
            <div>
              3.1 We may share your information in the following ways:
              <ul>
                <li>
                  - Information obtained through the YouTube Data API is shared
                  with YouTube
                </li>
                <li>- To comply with legal requirements</li>
                <li>
                  - As necessary to provide the Service (e.g., with third-party
                  advertising partners)
                </li>
              </ul>
            </div>

            <h3 className="text-l font-bold">4. Use of YouTube API Services</h3>
            <p>
              4.1 The Service uses the YouTube Data API. Information obtained
              through the YouTube Data API is subject to YouTube&apos;s Privacy
              Policy (
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                className="underline"
              >
                https://policies.google.com/privacy
              </a>
              ).
            </p>

            <h3 className="text-l font-bold">
              5. Third-Party Content Providers
            </h3>
            <p>
              5.1 The Service may include content provided by third parties,
              such as advertisements. These third parties may collect
              information from users through their services.
            </p>

            <h3 className="text-l font-bold">6. User Rights</h3>
            <p>
              6.1 The Service does not store any of your Authorized Information.
              However, if you believe the Service has accessed your Authorized
              Data, you have the right to request to review, correct, or delete
              your Personal Information. You can revoke these requests by
              visiting the Google Security Settings page here:{' '}
              <a
                href="https://security.google.com/settings/security/permissions"
                target="_blank"
                className="underline break-all"
              >
                https://security.google.com/settings/security/permissions
              </a>
              .
            </p>

            <h3 className="text-l font-bold">7. Contact Information</h3>
            <p>
              7.1 If you have any questions about this Privacy Policy, please
              contact us here:{' '}
              <a
                href="https://forms.gle/AtHChW8N4R2NRDbu5"
                target="_blank"
                className="underline"
              >
                Google Forms
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
