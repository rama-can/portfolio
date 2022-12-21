import Head from "next/head";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const SchemaInfo = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rama Can",
    "jobTitle": "Backend Developer",
    "url": "https://ramacan.dev",
    "sameAs": ["https://twitter.com/_ramacan", "https://github.com/rama-can", "https://www.instagram.com/_ramacan/"]
};

const SeoHead = ({title}) => {
    const {t} = useTranslation();
    const router = useRouter();

    return (
        <Head>
            <meta name="robots" content="index, follow"/>
            <meta content="index, follow" name="robots"/>
            <meta content="index, follow" name="GOOGLEBOT"/>
            <meta content="index, follow" name="yahooBOT"/>
            <meta content="index, follow" name="yandexBOT"/>

            <meta name="description" content={t("metaDescription")}/>
            <meta name="author" content="Rama Can"/>
            <meta name="email" content="hello@ramacan.dev"/>

            <link
                rel="conanical"
                href={`https://ramacan.dev${
                    router.locale === router.defaultLocale
                        ? router.asPath
                        : `/${router.locale}${router.asPath}`
                }`}
            />

            <meta property="og:title" content="Rama Can"/>
            <meta property="og:description" content={t("metaDescription")}/>
            <meta property="og:type" content="website"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:creator" content="@_ramacan"/>
            <meta name="twitter:title" content="Rama Can"/>
            <meta name="twitter:description" content={t("metaDescription")}/>
            <meta
                name="twitter:image"
                content="https://ramacan.dev/images/me.jpeg"
            />

            <script type="application/ld+json">
                {JSON.stringify(SchemaInfo)}
            </script>

            <link rel="icon" href="/images/favicon.ico"/>
        </Head>
    );
};

export default SeoHead;
