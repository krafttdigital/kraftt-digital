import { siteConfig } from '@/config/siteConfig';

// ============================================================================
// These four legal documents are starting templates only. They are written
// in good faith to reflect what this website actually does (currency
// selection via localStorage, in-browser calculators, a contact form, no
// ad tracking by default) — but they are NOT a substitute for review by a
// qualified lawyer in the agency's operating jurisdiction before publishing.
// Every page using this content displays a visible "template" notice.
// ============================================================================

export const legalUpdatedDate = '2026-06-16';

export const privacyPolicyHtml = `
  <h2>What this policy covers</h2>
  <p>This Privacy Policy explains what information ${siteConfig.name} collects through this website, how it is used, and the choices available to you. It applies to ${siteConfig.domain} and does not cover any third-party sites linked from it.</p>

  <h2>Information we collect</h2>
  <p>When you submit the contact form, we collect the information you provide — name, email, phone or WhatsApp number, company, country, service of interest, budget range, timeline and project description. We do not require account creation to browse this site.</p>

  <h2>Information we do not collect from calculators</h2>
  <p>The financial tools on this site (SIP, net worth, EMI and similar calculators) run entirely in your browser. Figures you enter into a calculator are not transmitted to our servers or stored, unless a future version of a specific tool states otherwise on that tool's page.</p>

  <h2>Currency preference</h2>
  <p>On your first visit, the site may use your browser language or time zone locally to choose an initial INR/USD display currency. Your manual currency selection is then stored in your browser's local storage so it persists between visits. This preference is not transmitted to our servers.</p>

  <h2>How we use contact form information</h2>
  <p>Information submitted via the contact form is used solely to respond to your enquiry and, if you proceed, to deliver the project you have engaged us for. We do not sell or rent contact information to third parties.</p>

  <h2>Cookies and analytics</h2>
  <p>See our <a href="/legal/cookie-policy">Cookie Policy</a> for details on cookies and any analytics tools in use.</p>

  <h2>Your rights</h2>
  <p>You may request access to, correction of, or deletion of personal information we hold about you by contacting <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a>.</p>

  <h2>Changes to this policy</h2>
  <p>We may update this policy from time to time. The date at the top of this page reflects the most recent update.</p>
`;

export const termsHtml = `
  <h2>Acceptance of terms</h2>
  <p>By engaging ${siteConfig.name} for any service described on this website, you agree to the terms set out here, alongside the specific scope, price and timeline confirmed in your individual proposal.</p>

  <h2>Services and pricing</h2>
  <p>Package inclusions and prices are as published on the Services pages at the time of your enquiry. Custom scope outside a standard package is quoted individually. Prices are shown in INR and USD; the currency used for invoicing is agreed before work begins.</p>

  <h2>Project timelines</h2>
  <p>Delivery windows listed against each package are estimates based on timely receipt of any content, assets or approvals required from the client. Delays in providing these may extend the delivery window accordingly.</p>

  <h2>Revisions</h2>
  <p>Revision rounds included in a package are as stated in your proposal. Requests beyond the included rounds may be quoted as additional work.</p>

  <h2>Payment terms</h2>
  <p>Payment structure (deposit, milestones, final payment) is confirmed in writing before a project begins. <em>[CONTENT REQUIRED: agency to confirm standard deposit percentage, accepted payment methods, and late payment terms before publishing.]</em></p>

  <h2>Intellectual property</h2>
  <p>Ownership of final deliverables transfers to the client upon full payment, except for any third-party assets (stock imagery, fonts, plugins) licensed under their own separate terms.</p>

  <h2>Limitation of liability</h2>
  <p><em>[CONTENT REQUIRED: agency's legal counsel to draft a liability limitation clause appropriate to the operating jurisdiction.]</em></p>

  <h2>Governing law</h2>
  <p><em>[CONTENT REQUIRED: confirm governing jurisdiction for these terms.]</em></p>
`;

export const cookiePolicyHtml = `
  <h2>What are cookies and local storage?</h2>
  <p>Cookies and browser local storage are small pieces of data a website can store in your browser. This site uses browser local storage — not a tracking cookie — to remember your INR/USD currency preference between visits. It may also read browser language or time zone locally to choose the first display currency.</p>

  <h2>Strictly necessary storage</h2>
  <p>The currency preference described above is necessary for the site's core currency-switching feature to function and is not used for tracking or advertising.</p>

  <h2>Analytics</h2>
  <p>This site uses Google Analytics 4 to understand aggregate site usage, including page views and successful contact-form submissions. Analytics is configured through <code>siteConfig.analytics</code> and does not require visitors to create an account.</p>

  <h2>Your choices</h2>
  <p>You can clear stored preferences at any time by clearing your browser's site data for ${siteConfig.domain}.</p>
`;

export const refundPolicyHtml = `
  <h2>Project deposits</h2>
  <p><em>[CONTENT REQUIRED: agency to confirm deposit refundability — e.g. whether deposits are refundable before work begins, non-refundable once work starts, or partially refundable on a sliding scale.]</em></p>

  <h2>Cancellation by the client</h2>
  <p>If a project is cancelled after work has begun, the client is responsible for payment for work completed up to the point of cancellation. <em>[CONTENT REQUIRED: agency to confirm exact cancellation terms and any applicable notice period.]</em></p>

  <h2>Monthly retainer services</h2>
  <p>Ongoing services billed monthly (SEO, social media management) can be cancelled with notice ahead of the next billing cycle. <em>[CONTENT REQUIRED: agency to confirm required notice period, e.g. 30 days.]</em></p>

  <h2>Non-performance</h2>
  <p>If ${siteConfig.name} is unable to deliver a project as scoped, a partial or full refund may apply depending on work completed. <em>[CONTENT REQUIRED: agency's legal counsel to finalise specific terms.]</em></p>

  <h2>How to request a refund</h2>
  <p>Refund requests should be sent to <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a> with your project reference and reason for the request.</p>
`;
