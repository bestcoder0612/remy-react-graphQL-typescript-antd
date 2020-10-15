import { message } from 'antd';

type SubmitArgs = {
  variables: any;
};

type Args = {
  submit: (a: SubmitArgs) => void;
  cb?: () => void;
  onError?: (e: Error) => void;
};

type Form = {
  setSubmitting: (a: boolean) => void;
};

const handleSubmit = ({ submit, cb, onError }: Args) => async (
  values: any,
  form: Form
): Promise<void> => {
  try {
    await submit({
      variables: values
    });

    if (cb && typeof cb === 'function') cb();
  } catch (err) {
    onError && typeof onError === 'function' && onError(err);
  } finally {
    form.setSubmitting(false);
  }
};

export default handleSubmit;

export const onError = (e: Error): void => {
  message.error(e.message);
};
