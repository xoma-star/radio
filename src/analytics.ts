// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAl-ZyKAedMuhSnQ-dkxO8Te2PokW0BP4U",
    authDomain: "radio-d2381.firebaseapp.com",
    projectId: "radio-d2381",
    storageBucket: "radio-d2381.appspot.com",
    messagingSenderId: "520088478086",
    appId: "1:520088478086:web:5786ba7cd40a82ad840c07",
    measurementId: "G-E59EBR5Q4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const sendToGoogleAnalytics = ({name, delta, value, id}: {name: string, delta: number, value: number, id: string}) => {
    // Assumes the global `gtag()` function exists, see:
    // https://developers.google.com/analytics/devguides/collection/ga4
    logEvent(analytics, name, {
        // Built-in params:
        value: delta, // Use `delta` so the value can be summed.
        // Custom params:
        metric_id: id, // Needed to aggregate events.
        metric_value: value, // Optional.
        metric_delta: delta, // Optional.

        // OPTIONAL: any additional params or debug info here.
        // See: https://web.dev/debug-web-vitals-in-the-field/
        // metric_rating: 'good' | 'ni' | 'poor',
        // debug_info: '...',
        // ...
    });
}


export default analytics