// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000',
  ENCRYPT_KEY:'7x!A%D*G-KaPdSgV',
  PUSHER_PK: 'BNDw-WX63fpPt3mtB_pM6P7ShsKtDRRsljr7U5qP0uXR3iMEnoC_qfkZDf5glFduLWLO0pE_KHvCU-46qqzSvDc',
  PUSHER_PVTK: 'v2VEoJsox7Qgqsks5gWbQ2UgvLygFOLw0mCmTjsGDmY',
  firebaseConfig: {
    apiKey: "AIzaSyARPtF-ZXQGodx2hOrbRTbDoW7SbcEmQV4",
    authDomain: "notification-push-repescs.firebaseapp.com",
    projectId: "notification-push-repescs",
    storageBucket: "notification-push-repescs.appspot.com",
    messagingSenderId: "39927953051",
    appId: "1:39927953051:web:7964e61604662ab988383e",
    measurementId: "G-6TQ5P2N192",
    vapidKey:"BBNc1jFhWHR7f8VyGtFtmFfvXtxYuWy7jlLOx201eo8tHyDVdA4RuFQT-VmhmADF4EqCcTRiakVdsYRNCa6ukRY"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
