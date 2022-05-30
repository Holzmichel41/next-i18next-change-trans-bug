import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { i18nNamespaces } from "../../../../utils/i18n-namespaces";

/**
 * FAQ page
 * @constructor
 */
const FaqPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  
  const onSelect = () => {
    const selectedLocale = i18n.language === "de" ? "en" : "de"

    const pathname = router.pathname;
    //split pathname into sub sections
    const modifiedPathname = pathname.split("/");
    //remove the locale param from the pathname
    modifiedPathname.splice(0, 2);
    //rebuild url string after modifying
    const as = modifiedPathname.length
      ? `/${modifiedPathname.join("/")}`
      : undefined;

    const asPath = as && `/${router.query.country}${t(as, { lng: selectedLocale, ns: "routes" })}`;

    router.push(
        {
          pathname,
          query: {
            country: router.query.country,
          },
        },
        asPath,
        { locale: selectedLocale }
    );
  }

  return (
    <div>
      <button
        onClick={onSelect}
      >
        Select other language
      </button>
      <p>Current language: {i18n.language}</p>
    </div>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces)),
    },
  };
}

export default FaqPage;
