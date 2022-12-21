---
title: "Lokalisasi URL menggunakan NextJS"
shortContent: "Lokalisasi konten situs adalah standar sekarang. Tapi tidak banyak cara melokalkan URL. Jadi dalam posting ini saya akan memberi tahu Anda cara melokalkan URL menggunakan NextJS."
date: "21 Desember, 2022"
readTime: "6"
slug: "url-localization-using-next-js"
tag: "Next.js"
keywords: "nextjs, url localizations, url translation, how to translate url in nextjs"
metaDescription: "Bagaimana cara localize URL? Metode localization URL menggunakan NextJS"
---

Saat saya mengatakan **Localization** (lokalisasi), saya memikirkan terjemahan konten situs terlebih dahulu. Untuk alasan ini, banyak paket hanya melakukan terjemahan konten. Namun dalam beberapa skenario saya ingin melokalkan/menerjemahkan URL dengan bahasa pengguna. Dalam situasi ini kita dapat menggunakan manfaat dari **penulisan ulang** konfigurasi yang disediakan NextJS untuk kita. (NextJS versi 9.5.0 >)

## Langkah pertama: instalasi next-i18next

Di bagian berikut, kita akan menggunakan konfigurasi **penulisan ulang** yang disediakan NextJS secara default untuk pelokalan URL. Namun sebagai langkah awal kita membutuhkan paket [next-i18next](https://github.com/isaachinman/next-i18next) untuk melokalkan konten situs. Untuk melakukannya:

```shell
yarn add next-i18next
```

Setelah itu, kami membuat file konfigurasi bernama **next-i18next.config.js** di direktori proyek kami untuk persyaratan **next-i18next**. Dan pada dasarnya kita isi di dalam seperti di bawah ini 

```js
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "id"],
    },
};
```

Dalam konfigurasi di atas, saya menentukan bahasa yang akan kami gunakan di situs saya _(locales)_ dan bahasa yang ingin saya gunakan sebagai bahasa default _(defaultLocale)_.

> Bahasa yang disediakan di **locales** akan digunakan untuk awalan URL. Contoh: `/en/home`.

> Bahasa yang disediakan di **defaultLocale** akan digunakan untuk menghapus awalan bahasa saat pengguna datang dengan bahasa default.
> Contoh: `/en/home` -> `/home`

Kemudian saya mengimpor dan menggunakan **i18n** di file konfigurasi NextJS sendiri yang disebut **next.config.js**

```js
const {i18n} = require("./next-i18next.config");

module.exports = {
    i18n,
};
```

Setelah menambahkan konfigurasi **i18n** ke **next.config.js**, sekarang saatnya membuat file terjemahan yang kita definisikan dalam array **locales**. Secara default **next-i18next** wakan mencari file terjemahan di direktori **public/locales/[locale]/[fileName].json**, jadi kita buat file kita disini.

> Jika Anda ingin menyimpan file terjemahan Anda ke tempat lain, harap baca
> [dokumentasi](https://github.com/isaachinman/next-i18next#5-advanced-configuration)-nya. Mudah ditangani (mereun).

Setelah membuat file terjemahan, hanya ada satu langkah yang harus dilakukan. membungkus file **\_app.js** dengan component **appWithTranslation**. (jika Anda tidak memiliki **\_app.js**, khusus, Anda dapat mempelajarinya lebih lanjut [dari ini](https://nextjs.org/docs/advanced-features/custom-app))

```js
import {appWithTranslation} from "next-i18next";

const MyApp = ({Component, pageProps}) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

Dengan langkah ini, kita dapat menggunakan terjemahan dengan mengimpor **serverSideTranslations** di method **getStaticProps** atau **getServerSideProps** dari halaman manapun. Contoh:

```js
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["footer"])),
        },
    };
}
```

> Pendefinisian props di atas harus digunakan di setiap halaman yang ingin kita terjemahkan. Kalau tidak **next-i18next** akan menimbulkan 
> kesalahan karena tidak dapat mengakses file json terjemahan dan konfigurasi bahasa.

We have done all configurations that needed for content translations. Now we can use translations by importing *
*useTranslations** hook in anywhere that we want to use.

```js
import {useTranslation} from "next-i18next";

export const Footer = () => {
    const {t} = useTranslation("footer");

    return (
        <footer>
            <p>{t("description")}</p>
        </footer>
    );
};
```

## Langkah kedua: Lokalisasi URL

ASeperti yang saya sebutkan di awal posting, kita akan menangani lokalisasi URL dengan konfigurasi penulisan ulang yang disediakan NextJS untuk kita. Untuk melakukan itu, kami menambahkan fungsi rewrites ke **next.config.js** yang kami buat di awal posting.

```js
const {i18n} = require("./next-i18next.config");

module.exports = {
    i18n,
    rewrites: async () => [
        {
            source: "/en/home",
            destination: "/en/",
            locale: false,
        },
        {
            source: "/id/rumah",
            destination: "/id",
            locale: false,
        },
        {
            source: "/en/about",
            destination: "/en/about",
            locale: false,
        },
        {
            source: "/id/tentang",
            destination: "/id/tentang",
            locale: false,
        },
    ],
};
```

Saya membuat konfigurasi seperti di atas dalam bentuk paling sederhana. Seperti yang kita lihat penulisan ulang mengambil array yang berisi objek. Setiap objek memiliki:

- **source**: jalur URL yang dimasukkan pengguna
- **destination**: halaman yang akan dirender _('/' akan merender -> 'pages/index')_
- **locale**: menentukan apakah menyertakan awalan lokal atau tidak ke sumber yang saya berikan _(false or undefined)_
- funtuk konfigurasi lebih lanjut silahkan baca [Dokumentasi resmi](https://nextjs.org/docs/api-reference/next.config.js/rewrites). Ada pilihan yang baik seperti **memiliki**...

Dengan konfigurasi di atas, ketika pengguna membuka URL **/home** atau **/id/rumah**, NextJS secara otomatis merender **/** _(pages/index)_.
Dan ketika pengguna membuka URL **/about** atau **/id/tentang**, NextJS secara otomatis merender **/about** _(/pages/about)_. Saya juga menyajikan konten situs yang dilokalkan dengan menggunakan awalan URL.

Situs web Anda akan mendukung konten dan pelokalan URL berkat langkah-langkah di atas.