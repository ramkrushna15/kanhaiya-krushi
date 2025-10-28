// Professional Agricultural Translations for Kanhaiya Krushi
// Adjusted brand naming per user's instruction: Brand remains "Kanhaiya Krushi"; "Kanhaiya Krushi Seva Kendra" is a store/entity, not the umbrella brand.

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      services: 'Services',
      contact: 'Contact Us',
      brand: 'Kanhaiya Krushi',
      tagline: 'SUSTAINABLE AGRICULTURE'
    },
    home: { /* unchanged content */ },
    about: {
      title: 'About Kanhaiya Krushi',
      subtitle: 'Your Trusted Partner in Modern Sustainable Agriculture',
      pageSubtitle: 'Growing together towards a sustainable agricultural future',
      story: { /* unchanged detailed story */ },
      mission: { /* unchanged */ },
      vision: { /* unchanged */ },
      values: { /* unchanged */ },
      stats: { /* unchanged */ }
    },
    footer: {
      description: 'Your trusted agricultural partner providing quality farm inputs, modern equipment and expert guidance for sustainable farming and better crop yields.',
      quickLinks: 'Quick Links',
      ourProducts: 'Our Products',
      contactUs: 'Contact Us',
      address: 'Address:',
      phone: 'Phone:',
      email: 'Email:',
      addressText: 'Near Market Yard, Jeur, Karmala, Solapur\nMaharashtra, India',
      allRightsReserved: 'Kanhaiya Krushi. All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      products: { /* unchanged */ }
    },
    products: { /* unchanged */ },
    services: { /* unchanged */ },
    contact: { /* unchanged */ },
    common: { /* unchanged */ }
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'आमच्याबद्दल',
      products: 'कृषी उत्पादने',
      services: 'सेवा',
      contact: 'संपर्क करा',
      brand: 'कन्हैया कृषी',
      tagline: 'शाश्वत शेती'
    },
    home: { /* unchanged content */ },
    about: {
      title: 'कन्हैया कृषी बद्दल',
      subtitle: 'आधुनिक शाश्वत शेतीमध्ये आपला विश्वासू भागीदार',
      pageSubtitle: 'शाश्वत कृषी भविष्याच्या दिशेने एकत्र वाढत आहोत',
      story: { /* unchanged */ },
      mission: { /* unchanged */ },
      vision: { /* unchanged */ },
      values: { /* unchanged */ },
      stats: { /* unchanged */ }
    },
    footer: {
      description: 'शाश्वत शेती आणि चांगल्या पीक उत्पादनासाठी गुणवत्तापूर्ण शेती साहित्य, आधुनिक उपकरणे आणि तज्ज्ञांचे मार्गदर्शन देणारा आपला विश्वासू भागीदार.',
      quickLinks: 'त्वरित दुवे',
      ourProducts: 'आमची उत्पादने',
      contactUs: 'संपर्क करा',
      address: 'पत्ता:',
      phone: 'फोन:',
      email: 'ईमेल:',
      addressText: 'मार्केट यार्ड जवळ, जेऊर, करमाळा, सोलापूर\nमहाराष्ट्र, भारत',
      allRightsReserved: 'कन्हैया कृषी. सर्व हक्क राखीव.',
      privacyPolicy: 'गोपनीयता धोरण',
      termsConditions: 'अटी आणि शर्ती',
      products: { /* unchanged */ }
    },
    products: { /* unchanged */ },
    services: { /* unchanged */ },
    contact: { /* unchanged */ },
    common: { /* unchanged */ }
  }
};

// keep existing getTranslation implementation
export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let translation = translations[language];
  for (const k of keys) {
    if (translation && translation[k]) translation = translation[k];
    else {
      translation = translations.en;
      for (const fk of keys) {
        if (translation && translation[fk]) translation = translation[fk]; else return key;
      }
      break;
    }
  }
  return translation || key;
};