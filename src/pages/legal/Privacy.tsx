import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { privacyPolicyHtml, legalUpdatedDate } from '@/data/legal';

export default function Privacy() {
  return <LegalPageLayout title="Privacy Policy" path="/legal/privacy-policy" updatedDate={legalUpdatedDate} html={privacyPolicyHtml} />;
}
