import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, fr, hi, zh, hu, ig, pg, yo} from "./translations";

const resources = {
    en: {
      translation: en,
    },

    // hi: {
    //   translation: hi,
    // },

    hu: {
      translation: hu,
    },

    ig: {
      translation: ig,
    },

    pg: {
      translation: pg,
    },

    yo: {
      translation: yo,
    },

    fr: {
      translation: fr,
    },

    // zh: {
    //   translation: zh,
    // },
  }
  
  i18next.use(initReactI18next).init({
    debug: false,
    lng: 'en',
    compatibilityJSON: 'v3',
    //language to use if translation in user language is not available
    fallbackLng: 'en',
    resources,
  })
  
  export default i18next;