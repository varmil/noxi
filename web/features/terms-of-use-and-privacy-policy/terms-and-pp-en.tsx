import { Link } from 'lib/navigation'

export default function TermsAndPPEn() {
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
              className="hover:underline"
              prefetch={false}
            >
              Terms of Use
            </Link>
            <br />
            <Link
              href="#privacy-policy"
              className="hover:underline"
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

            <h3 className="text-l font-bold">1. Application</h3>
            <p>
              These terms and conditions apply to all relationships between
              users and the use of the service. In addition to these terms and
              conditions, the service may have various rules for use
              (hereinafter referred to as &quot;individual provisions&quot;).
              Regardless of their name, these individual provisions shall
              constitute part of these terms and conditions.
            </p>

            <h3 className="text-l font-bold">2. Conditions of Use</h3>
            <p>
              2.1 Users agree to comply with the YouTube Terms of Service (
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
              2.2 The Service uses the YouTube Data API to provide information.
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

            <h3 className="text-l font-bold">3. Privacy</h3>
            <p>
              3.1 Our Privacy Policy (
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

            <h3 className="text-l font-bold">4. Registration</h3>
            <p>
              4.1 Registering for the service is completed when a person who
              wishes to register agrees to these terms and conditions, applies
              for registration in a manner specified by the Company, and the
              Company approves the application.
            </p>
            <p>
              4.2 When registering, users must provide accurate and complete
              information. Users are responsible for maintaining the
              confidentiality of their account and are fully responsible for all
              activities that occur under their account. Users agree to notify
              us immediately of any unauthorized use of their account or any
              other breaches of security. We reserve the right to refuse
              service, to terminate accounts, and to remove or edit content or
              information at our sole discretion.
            </p>
            <p>
              4.3 To prevent abuse, creating multiple accounts using automated
              tools or similar methods is strictly prohibited. If such activity
              is detected, all related accounts may be suspended (banned)
              without prior notice.
            </p>

            <h3 className="text-l font-bold">5. Disclaimer</h3>
            <p>
              5.1 The Service is provided &quot;as is&quot; without warranties
              of any kind, whether express or implied, including but not limited
              to implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>

            <h3 className="text-l font-bold">6. Contact Information</h3>
            <p>
              6.1 If you have any questions about these Terms, please contact us
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
                <li>
                  - Contact information such as name, email address, and phone
                  number
                </li>
                <li>
                  - Information you provide to us directly (e.g., contact form)
                </li>
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

            <div>
              1.2 We may collect the following type of user data:
              <p>
                At the Service, we use the YouTube Data API to obtain data
                related to channels that are actively live-streaming on the
                YouTube platform. However, we do not collect, use, or store any
                API data related to the user accessing our service.
              </p>
              <p>
                Specifically, we use the following YouTube Data API endpoints to
                retrieve data:
              </p>
              <ul>
                <li>- Channels</li>
                <li>- Videos</li>
                <li>- Search</li>
                <li>- PlaylistItems</li>
              </ul>
              <p>Examples of data obtained from these APIs are as follows:</p>
              <p>
                Titles and descriptions of channels and videos, thumbnails,
                subscribers, views, likes, comments, Live schedule, Live
                frequency, etc.
              </p>
              <p>
                Based on these statistics, API data is used for purposes such as
                organizing and displaying channels and videos.
              </p>
            </div>

            <div>
              1.3 About ad serving:
              <ul>
                <li>
                  - Third-party vendors, such as Google, use cookies to serve
                  ads based on the user&apos;s past visits to that website and
                  other websites.
                </li>
                <li>
                  - Google&apos;s use of advertising cookies enables Google and
                  its partners to show appropriate ads to users based on
                  information about the user&apos;s visits to that site and
                  other sites.
                </li>
                <li>
                  - Users can opt out of personalized ads in{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    className="underline"
                  >
                    Ads Settings
                  </a>{' '}
                  (or opt out of third-party vendor cookies used for
                  personalized ads by visiting{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    className="underline"
                  >
                    www.aboutads.info
                  </a>
                  ).
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
                <li>- To detect and prevent fraudulent use</li>
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
                <li>
                  - We may collaborate with and share user data with our
                  business partners for the purpose of improving our services,
                  personalizing our services, or for commercial purposes such as
                  advertising and marketing. The information shared includes
                  statistical data and attribute information that cannot
                  directly identify a specific individual (e.g., age group,
                  interest categories, usage trends, etc.). When providing
                  personally identifiable information to our business partners,
                  we do so with the user&apos;s consent. Based on our contracts
                  with our business partners, we are obligated to manage the
                  information appropriately and prohibit its use for purposes
                  other than those stated.
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
              6.1 If you believe the Service has accessed your Authorized Data,
              you have the right to request to review, correct, or delete your
              Personal Information. You can revoke these requests by visiting
              the Google Security Settings page here:{' '}
              <a
                href="https://security.google.com/settings/security/permissions"
                target="_blank"
                className="underline break-anywhere"
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
