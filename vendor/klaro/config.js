/* eslint-disable */
// Klaro! Cookie Consent Configuration für DMA Landing Page
// Klaro! lädt zuerst, blockiert GTM bis Consent. GA4 firert nur via GTM nach Opt-In.
// Consent Mode v2: Bei Ablehnung sendet GA4 anonymisierte Pings (denied state).
//
// Klaro!-Doku: https://klaro.org

(function () {
  // Default consent state (vor erstem Klaro!-Render).
  // analytics_storage = denied → GA4 sendet keine personenbezogenen Daten,
  // nur (mit Consent Mode v2) anonymisierte Pings für aggregate Metriken.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });

  window.klaroConfig = {
    version: 1,
    elementID: 'klaro',
    storageMethod: 'cookie',
    cookieName: 'klaro-dma',
    cookieExpiresAfterDays: 180,
    default: false,
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    noticeAsModal: false,
    htmlTexts: true,
    embedded: false,
    groupByPurpose: false,
    lang: 'de',

    translations: {
      de: {
        privacyPolicyUrl: '/datenschutz.html',
        consentNotice: {
          description:
            'Wir verwenden Cookies und ähnliche Technologien, um zu verstehen, wie Sie unsere Seite nutzen, und um Ihr Erlebnis zu verbessern. Sie können selbst entscheiden, welche Kategorien Sie zulassen.',
          changeDescription: 'Es gibt Änderungen seit Ihrem letzten Besuch. Bitte erneuern Sie Ihre Einwilligung.',
          learnMore: 'Einstellungen',
        },
        consentModal: {
          title: 'Cookies und Datenschutz',
          description:
            'Hier können Sie einsehen und auswählen, welche Dienste wir für die Analyse und Verbesserung der Seite einsetzen. Sie können Ihre Einwilligung jederzeit über den Link „Cookie-Einstellungen" im Footer widerrufen oder ändern.',
          privacyPolicy: {
            name: 'Datenschutzerklärung',
            text: 'Mehr Informationen finden Sie in unserer {privacyPolicy}.',
          },
        },
        ok: 'Akzeptieren',
        decline: 'Ablehnen',
        save: 'Speichern',
        close: 'Schließen',
        acceptAll: 'Alle akzeptieren',
        acceptSelected: 'Auswahl speichern',
        service: {
          disableAll: {
            title: 'Alle Dienste aktivieren / deaktivieren',
            description: 'Mit diesem Schalter aktivieren oder deaktivieren Sie alle Dienste auf einmal.',
          },
          optOut: {
            title: '(Opt-Out)',
            description: 'Dieser Dienst ist standardmäßig aktiv. Sie können ihn jederzeit deaktivieren.',
          },
          required: {
            title: '(immer erforderlich)',
            description: 'Dieser Dienst ist für die Funktion der Seite zwingend erforderlich.',
          },
          purposes: 'Zwecke',
          purpose: 'Zweck',
        },
        purposes: {
          analytics: {
            title: 'Analyse',
            description:
              'Hilft uns zu verstehen, wie Besucher die Seite nutzen. Pageviews, Quellen, Verweildauer. Daten werden anonymisiert verarbeitet.',
          },
        },
        googleAnalytics: {
          description:
            'Google Analytics 4 misst aggregiert Besuchsverhalten (Pageviews, Quellen, Klicks). Die Daten helfen uns zu verstehen, welche Inhalte für unsere Besucher relevant sind. Bei Ablehnung werden lediglich anonymisierte Statistik-Pings ohne Cookie übertragen (Consent Mode v2).',
        },
      },
    },

    services: [
      {
        name: 'googleAnalytics',
        title: 'Google Analytics 4',
        purposes: ['analytics'],
        default: false,
        cookies: [
          [/^_ga.*$/, '/'],
          [/^_gid$/, '/'],
        ],
        callback: function (consent /*, service */) {
          if (typeof window.gtag !== 'function') return;
          window.gtag('consent', 'update', {
            ad_storage: consent ? 'granted' : 'denied',
            ad_user_data: consent ? 'granted' : 'denied',
            ad_personalization: consent ? 'granted' : 'denied',
            analytics_storage: consent ? 'granted' : 'denied',
          });
        },
        required: false,
        optOut: false,
        onlyOnce: true,
      },
      {
        name: 'googleTagManager',
        title: 'Google Tag Manager',
        purposes: ['analytics'],
        default: false,
        cookies: [],
        required: false,
        optOut: false,
        onlyOnce: true,
      },
    ],
  };
})();
