import React from 'react';
import * as Yup from 'yup';
import {NavLink} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import {InjectedFormikProps, withFormik} from 'formik';
import {FullWidthSegment, ErrorBlock, GuestHeader, GuestFooter} from '~/components/ui';
import {InputField} from '~/components/fields';
import {postRegister} from '~/stores/user';
import {t} from '~/i18n';

interface FormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface FormProps {}

function RegisterForm(props: InjectedFormikProps<FormProps, FormValues>) {
  const {handleSubmit, isSubmitting, isValid, error} = props;

  return (
    <>
      <GuestHeader text={t('register-page')}/>
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
          <Form.Field
            control={InputField}
            name={'password'}
            type={'password'}
            icon="lock"
            iconPosition="left"
            placeholder={t('password')}
            autoComplete="new-password"
          />
          <Form.Field
            control={InputField}
            name={'password_confirmation'}
            type={'password'}
            icon="repeat"
            iconPosition="left"
            placeholder={t('password-confirmation')}
            autoComplete="new-password"
          />

          <Form.Field>
            <Button
              primary
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {t('register-button')}
            </Button>
          </Form.Field>
          {error && <ErrorBlock>{error}</ErrorBlock>}
        </Form>
      </FullWidthSegment>
      <GuestFooter>
        <NavLink to={'/login'}>
          {t('login-page')}
        </NavLink>
      </GuestFooter>
    </>
  );
}

export const Register = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }),
  validationSchema: Yup.object().shape<FormValues>({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required().oneOf([Yup.ref('password'), null])
  }),
  handleSubmit: async (values, {setSubmitting, setError}) => {
    try {
      setError(null);
      await postRegister(values);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }
})(RegisterForm);
