import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ICustomThemeMetadata } from '@/types/customStyle.type';

const phoneRegex =
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
const urlsRegex =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
const schema = z.object({
  websiteLink: z.string().regex(urlsRegex, { message: 'Website url is invalid' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().min(3, { message: 'Phone number must be at least 3 numbers' }),
});

const ContactDetails = ({ setContactDetails }: { setContactDetails: any }) => {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      themeName: 'varcode-test',
      websiteLink: '',
      email: '',
      phone: '',
    },
  });
  return (
    <>
      <form
        onSubmit={form.onSubmit((values: ICustomThemeMetadata) => {
          setContactDetails(values);
          console.log(values);
          showNotification({
            title: 'Details Verified',
            message: 'You can now submit your theme',
          });
        })}
      >
        <TextInput
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          required
          label="Website Link"
          placeholder="www.varcode.com"
          mt="sm"
          {...form.getInputProps('websiteLink')}
        />
        <TextInput
          required
          label="Phone"
          placeholder="Company phone number"
          mt="sm"
          {...form.getInputProps('phone')}
        />
        <Button variant="outline" radius="xl" mt="1rem" type="submit">
          Validate
        </Button>
      </form>
    </>
  );
};

export default ContactDetails;
