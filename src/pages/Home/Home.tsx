import i18n from 'shared/language/i18n';

const Home: React.FC = () => {
  return (
    <>
      <h6>Home</h6>
      <div>{i18n.t('greeting')}</div>
    </>
  );
};

export default Home;
