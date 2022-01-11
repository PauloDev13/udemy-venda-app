import type { AppProps } from 'next/app';
import '~/components/common/loader/loader.css';
import 'bulma/css/bulma.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
