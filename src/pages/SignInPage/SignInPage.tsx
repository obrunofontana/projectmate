import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf } from 'zod';

import FormInput from 'components/FormInput/FormInput';
import SwitchTheme from 'components/SwitchTheme/SwitchTheme';
import { useLoginUserMutation } from 'store/api/authApi';

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #4461f2;
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
  const theme = useTheme();
  const [cookies] = useCookies(['logged_in']);
  const loggedIn = cookies.logged_in;

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const from = ((location.state as any)?.from.pathname as string) || '/';

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
        let err = (error as any)?.data?.message
          ? (error as any)?.data?.message
          : (error as any)?.error;

        if (
          typeof (error as any)?.error === 'string' &&
          (error as any)?.error === 'TypeError: Failed to fetch'
        ) {
          err = 'Falha ao se comunicar com o servidor, tente novamente mais tarde';
        }

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

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Container
      sx={{
        backgroundImage: 'url(./bg-crud.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '20% 1fr',
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr max-content' }}>
        <Box>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '5rem', md: '6rem' },
              fontWeight: 600,
              mb: 2,
              letterSpacing: 1,
              marginTop: 2,
              display: 'flex',
              color: theme.palette.text.secondary,
            }}
          >
            Instant
            <span style={{ color: theme.palette.primary.main }}>Do</span>
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
        </Box>
        <SwitchTheme sx={{ marginTop: '4rem' }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <img src="./home-illustration.svg" alt="" width="100%" />
        </Box>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            width="60%"
            sx={{
              borderRadius: 2,
              marginLeft: '8rem',
            }}
          >
            <Typography>Bem vindo de volta!</Typography>
            <FormInput name="email" placeholder="E-mail" type="email" />
            <FormInput name="password" placeholder="Senha" type="password" />
            <Button
              disableElevation
              type="submit"
              variant="contained"
              sx={{ height: '6rem', borderRadius: '1rem', marginTop: '0.8rem' }}
              fullWidth
            >
              Entrar
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
              Não possui uma conta? <LinkItem to="/register">Inscreva-se agora!</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignInPage;
