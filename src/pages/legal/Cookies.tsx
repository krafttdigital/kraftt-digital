import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { cookiePolicyHtml, legalUpdatedDate } from '@/data/legal';

export default function Cookies() {
  return <LegalPageLayout title="Cookie Policy" path="/legal/cookie-policy" updatedDate={legalUpdatedDate} html={cookiePolicyHtml} />;
}
