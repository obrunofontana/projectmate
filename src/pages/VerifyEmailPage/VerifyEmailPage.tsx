import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string, TypeOf } from 'zod';

import FormInput from 'components/FormInput/FormInput';
import { useVerifyEmailMutation } from 'store/api/authApi';

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
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
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
            color: '#f9d13e',
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Verificar endereço de e-mail
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
            <FormInput name="verificationCode" label="Verification Code" />

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Verificar
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;
