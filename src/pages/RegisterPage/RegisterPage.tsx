import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf } from 'zod';

import FormInput from 'components/FormInput/FormInput';
import { useRegisterUserMutation } from 'store/api/authApi';

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

const registerSchema = object({
  name: string().min(1, 'Nome é obrigatório').max(100),
  email: string().min(1, 'E-mail é obrigatório').email('E-mail é inválido'),
  password: string()
    .min(1, 'Senha é obrigatório')
    .min(3, 'A senha deve ter mais de 3 caracteres')
    .max(6, 'A senha deve ter menos de 6 caracteres'),
  passwordConfirm: string().min(1, 'Por favor, confirme sua senha'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Senhas não coincidem',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Usuário registrado com sucesso');
      navigate('/verify-email');
    }

    if (isError) {
      console.log(error);

      if (Array.isArray((error as any).data.error)) {
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

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#633bbc',
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
            color: '#07847e',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Bem-vindo ao ProjectMate!
        </Typography>
        <Typography component="h2" sx={{ color: '#e5e7eb', mb: 2 }}>
          Registe-se para começar!
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
            <FormInput name="name" label="Nome completo" />
            <FormInput name="email" label="E-mail" type="email" />
            <FormInput name="password" label="Senha" type="password" />
            <FormInput name="passwordConfirm" label="Confirme a Senha" type="password" />
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Já tem uma conta? <LinkItem to="/sign-in">Entre agora</LinkItem>
            </Typography>

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Inscrever-se
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
