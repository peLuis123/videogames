/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
 
import { createVuetify } from 'vuetify'
import { es, en } from 'vuetify/locale';
 
export default createVuetify({
  locale: {
    locale: 'en',  
    fallback: 'es',  
    messages: { es, en },  
  },
  theme: {
    themes: {
      light: {
        colors: {
          background: '#F9F9F9', 
          primary: '#007BFF', 
          secondary: '#28A745', 
          surface: '#FFFFFF', 
        },
      },
      dark: {
        colors: {
          background: '#1E1E1E', 
          primary: '#1E90FF',
          secondary: '#32CD32', 
          surface: '#2D2D2D'
        },
        
      },
      
    },
    defaultTheme: 'dark',
  },
});
