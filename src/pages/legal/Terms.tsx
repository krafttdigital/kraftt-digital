import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { termsHtml, legalUpdatedDate } from '@/data/legal';

export default function Terms() {
  return <LegalPageLayout title="Terms & Conditions" path="/legal/terms-and-conditions" updatedDate={legalUpdatedDate} html={termsHtml} />;
}
