type Paths = Record<string, string>;

const paths: Paths = {
  HOME: '/',
  NOT_FOUND: '*',
  REGISTER: '/register',
  SIGN_IN: '/sign-in',
  VERIFY_EMAIL: '/verify-email',
  PROFILE: '/profile',
  ADMIN: '/admin',
  PROJECT: '/project/:id',
  UNAUTHORIZED: '/unauthorized',
};

export default paths;
