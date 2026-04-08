 /** @type {import('tailwindcss').Config} */
 
import PrimeUI from 'tailwindcss-primeui';

export default {
   content: ["./src/**/*.{html,js,ts}"],
   theme: {
     extend: {},
   },
   plugins: [PrimeUI],
 }