import { OtpField } from '@base/ui';

export default function OtpFieldHero() {
  return (
    <OtpField.Root length={6}>
      <OtpField.Input />
      <OtpField.Input />
      <OtpField.Input />
      <OtpField.Separator />
      <OtpField.Input />
      <OtpField.Input />
      <OtpField.Input />
    </OtpField.Root>
  );
}
