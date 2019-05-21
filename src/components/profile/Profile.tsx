import React from 'react';
import * as Yup from 'yup';
import {Button, Form, Message} from 'semantic-ui-react';
import {InjectedFormikProps, withFormik} from 'formik';
import {inject, Injected} from 'effector-react-inject';
import {FullWidthSegment, H3, ErrorBlock} from '../ui';
import {$user, postProfile} from '~/stores/user';
import {InputField} from '../fields';
import {t} from '~/i18n';

interface FormValues {
  name: string;
  email: string;
}
const stores = {$user};

type FormProps = Injected<typeof stores>;

function ProfileForm(props: InjectedFormikProps<FormProps, FormValues>) {
  const {handleSubmit, isSubmitting, isValid, status, error} = props;

  return (
    <>
      <H3>
        {t('profile-page')}
      </H3>
      <FullWidthSegment>
        <Form onSubmit={handleSubmit}>
          <Form.Field
            control={InputField}
            name={'name'}
            icon="user"
            iconPosition="left"
            placeholder={t('name')}
            autoComplete="off"
            maxLength={50}
          />
          <Form.Field
            control={InputField}
            name={'email'}
            icon="mail"
            iconPosition="left"
            placeholder={t('email')}
            autoComplete="off"
            maxLength={255}
          />

          <Form.Field>
            <Button
              primary
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {t('profile-button')}
            </Button>
          </Form.Field>
          {error && <ErrorBlock>{error}</ErrorBlock>}
        </Form>
      </FullWidthSegment>
      {status && (
        <Message success content={t('profile-updated')}/>
      )}
    </>
  );
}

const ProfileFormik = withFormik<FormProps, FormValues>({
  mapPropsToValues: ({$user: {result}}) => ({
    name: result ? result.name : '',
    email: result ? result.email : '',
  }),
  validationSchema: Yup.object().shape<FormValues>({
    name: Yup.string().required(),
    email: Yup.string().required(),
  }),
  handleSubmit: async (values, {setSubmitting, setStatus, resetForm, setError}) => {
    try {
      setStatus(null);
      setError(null);
      await postProfile(values);
      resetForm();
      setStatus('success');
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }
})(ProfileForm);

export const Profile = inject(stores)(ProfileFormik) as React.ComponentType;
