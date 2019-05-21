import React from 'react';
import * as Yup from 'yup';
import {NavLink} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import {InjectedFormikProps, withFormik} from 'formik';
import {ErrorBlock, FullWidthSegment, GuestFooter, GuestHeader} from '../ui';
import {InputField} from '~/components/fields';
import {postLogin} from '~/stores/auth';
import {t} from '~/i18n';

interface FormValues {
  email: string;
  password: string;
}

interface FormProps {}

function LoginForm(props: InjectedFormikProps<FormProps, FormValues>) {
  const {handleSubmit, isSubmitting, isValid, error} = props;

  return (
    <>
      <GuestHeader text={t('login-page')}/>
      <FullWidthSegment>
        <Form onSubmit={handleSubmit}>
          <Form.Field
            control={InputField}
            name={'email'}
            icon="mail"
            iconPosition="left"
            placeholder={t('email')}
            autoComplete="username"
          />
          <Form.Field
            control={InputField}
            type={'password'}
            name={'password'}
            placeholder={t('password')}
            icon="lock"
            iconPosition="left"
            autoComplete="current-password"
          />

          <Form.Field>
            <Button
              primary
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {t('login-button')}
            </Button>
          </Form.Field>
          {error && <ErrorBlock>{error}</ErrorBlock>}
        </Form>
      </FullWidthSegment>
      <GuestFooter>
        <NavLink to={'/register'}>
          {t('register-page')}
        </NavLink>
      </GuestFooter>
    </>
  );
}

export const Login = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape<FormValues>({
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit: async (values, {setSubmitting, setError}) => {
    try {
      setError(null);
      await postLogin(values);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }
})(LoginForm);
