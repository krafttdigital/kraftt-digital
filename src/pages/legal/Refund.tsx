import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { refundPolicyHtml, legalUpdatedDate } from '@/data/legal';

export default function Refund() {
  return <LegalPageLayout title="Refund & Cancellation Policy" path="/legal/refund-policy" updatedDate={legalUpdatedDate} html={refundPolicyHtml} />;
}
