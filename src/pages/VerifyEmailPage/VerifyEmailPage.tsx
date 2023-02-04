import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf } from 'zod';

import FormInput from 'components/FormInput/FormInput';
import { useVerifyEmailMutation } from 'store/api/authApi';

const verificationCodeSchema = object({
  verificationCode: string().min(1, 'Código de verificação é obrigatório'),
});

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>;

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const { verificationCode } = useParams();

  const methods = useForm<VerificationCodeInput>({
    resolver: zodResolver(verificationCodeSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const [verifyEmail, { isLoading, isSuccess, data, isError, error }] = useVerifyEmailMutation();

  useEffect(() => {
    if (verificationCode) {
      reset({ verificationCode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate('/sign-in');
    }
    if (isError) {
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

  const onSubmitHandler: SubmitHandler<VerificationCodeInput> = (params) => {
    verifyEmail({ verificationCode: params.verificationCode });
  };

  return (
    <Container
      sx={{
        backgroundImage: 'url(./bg-crud.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'max-content 70%',
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
        ProjectMate
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            component="h1"
            sx={{
              mb: 2,
              letterSpacing: 1,
              textAlign: 'center',
            }}
          >
            Verificação de e-mail
          </Typography>
          <FormInput name="verificationCode" placeholder="Código de verificação" type="email" />
          <Button
            disableElevation
            type="submit"
            variant="contained"
            sx={{ height: '6rem', borderRadius: '1rem', marginTop: '0.8rem' }}
            fullWidth
          >
            Verificar
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default VerifyEmailPage;
