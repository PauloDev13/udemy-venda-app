import type { AppProps } from 'next/app';
import '~/components/common/loader/loader.css';
import 'bulma/css/bulma.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/md-light-indigo/theme.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
