import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";

import IdFlag from "assets/images/flags/id.svg";
import UsFlag from "assets/images/flags/us.svg";

import * as S from "./style";

const localizations = {
  id: { src: IdFlag.src },
  en: { src: UsFlag.src },
};

const LanguageArea = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const changeLanguage = (locale) => {
    router.push(router.asPath, router.asPath, { locale });
  };

  return (
    <S.LanguageArea>
      {router.locales
        .filter((locale) => locale !== router.locale)
        .map((locale) => (
          <S.Button key={locale} onClick={() => changeLanguage(locale)}>
            <Image
              src={localizations[locale].src}
              alt={t("changeLanguage", { locale })}
              height={32}
              width={32}
            />
          </S.Button>
        ))}
    </S.LanguageArea>
  );
};

export default LanguageArea;
