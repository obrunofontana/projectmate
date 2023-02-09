import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf } from 'zod';

import FormInput from 'components/FormInput/FormInput';
import { useRegisterUserMutation } from 'store/api/authApi';

const LinkItem = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #4461f2;
  &:hover {
    text-decoration: none;
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
      sx={{
        backgroundImage: 'url(./bg-crud.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '12% max-content 1fr',
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '4rem', md: '5rem' },
          fontWeight: 600,
          mb: 2,
          letterSpacing: 1,
          marginTop: 2,
        }}
      >
        InstantTodo
      </Typography>

      <Typography
        component="h2"
        sx={{
          mb: 2,
          letterSpacing: 1,
        }}
      >
        Simplifique a gestão de seus projetos
      </Typography>

      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          width="100%"
          sx={{
            borderRadius: 2,
          }}
        >
          <FormInput name="name" placeholder="Nome completo" />
          <FormInput name="email" placeholder="E-mail" type="email" />
          <FormInput name="password" placeholder="Senha" type="password" />
          <FormInput name="passwordConfirm" placeholder="Confirme a Senha" type="password" />
          <Button
            disableElevation
            type="submit"
            variant="contained"
            sx={{ height: '6rem', borderRadius: '1rem', marginTop: '0.8rem' }}
            fullWidth
          >
            Inscrever-se
          </Button>

          <Typography
            sx={{
              fontSize: '1.4rem',
              mb: '1rem',
              mt: '3.2rem',
              textAlign: 'end',
              paddingRight: '1rem',
            }}
          >
            Já tem uma conta? <LinkItem to="/sign-in">Entre agora</LinkItem>
          </Typography>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default RegisterPage;
