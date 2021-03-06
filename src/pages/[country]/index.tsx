import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { i18nNamespaces } from '../../utils/i18n-namespaces'
import styles from '../../../styles/Home.module.css'

export default function Home() {
  const {t} =  useTranslation()
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome!
        </h1>

        <div className={styles.grid}>
          <Link 
            href={`/${router.query.country}/[hilfe-kontakt]/faq`}
            as={`/${router.query.country}${t("/[hilfe-kontakt]/faq", {ns: "routes"})}`}
          >
              Link to FAQ page
          </Link>
            

        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
    },
  };
}
