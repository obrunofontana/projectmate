import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf } from 'zod';

import FormInput from 'components/FormInput/FormInput';
import { useLoginUserMutation } from 'store/api/authApi';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #07847e;
  color: #633bbc;
  font-weight: 500;

  &:hover {
    background-color: #07847e;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #633bbc;
  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
  email: string().min(1, 'E-mail é obrigatório').email('E-mail é inválido'),
  password: string()
    .min(1, 'Senha é obrigatório')
    .min(3, 'A senha deve ter mais de 3 caracteres')
    .max(6, 'A senha deve ter menos de 6 caracteres'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const from = ((location.state as any)?.from.pathname as string) || '/profile';

  useEffect(() => {
    if (isSuccess) {
      toast.success('Usuário logado com sucesso');
      navigate(from);
    }

    if (isError) {
      console.log(error);

      if (Array.isArray((error as any)?.data?.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          }),
        );
      } else {
        const err = (error as any)?.data?.message
          ? (error as any)?.data?.message
          : (error as any)?.error;
        toast.error(err, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2363eb',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: '#07847E',
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Bem vindo de volta!
        </Typography>
        <Typography variant="body1" component="h2" sx={{ color: '#e5e7eb', mb: 2 }}>
          Faça login para ter acesso!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              backgroundColor: '#e5e7eb',
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="password" />

            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Precisa de uma conta? <LinkItem to="/register">Inscreva-se aqui</LinkItem>
            </Typography>

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Entrar
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignInPage;
