import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TopBar } from '@/components/Topbar';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';

const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bigcapital | Modern core accounting software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className={inter.className + ' md:pt-[32px]'}>
        <header>
          <AnnouncementBar />
          <TopBar />
        </header>
        {children}

        <footer>
          <Footer />
        </footer>

        {process.env.NODE_ENV === 'production' && <Chatwoot />}
        {process.env.NODE_ENV === 'production' && <FacebookPixel />}
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
        {process.env.NODE_ENV === 'production' && <HotjarScript />}
      </body>
    </html>
  );
}

function Chatwoot() {
  return (
    <script
      type="text/javascript"
      id="hs-script-loader"
      async
      defer
      src="//js-eu1.hs-scripts.com/144560187.js"
    ></script>
  );
}

function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-WYPGGFSFGW"
      ></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WYPGGFSFGW');`,
        }}
      />
    </>
  );
}

function FacebookPixel() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '271381281551988');
        fbq('track', 'PageView');`,
      }}
    />
  );
}

function HotjarScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2438576,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
      }}
    />
  );
}
