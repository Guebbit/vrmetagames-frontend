https://www.virtual-room.com/en/
https://toulon.virtual-room.com/reservation/


IMPORTANT
 - Dalle 23.30 alle 00.30 c'è un bug (va in negativo di 23 ore)
 - stations diverse + stations multiple prenotabili dal singolo utente
    - checkScheduleIsAllowed non considera il multi-station
    - la capacity ed il timeavailable sono sempre settati sulla prima station
 - useItemList PANATION

SERVER:
 - initApp: sostituire tutte le chiamate con singola chiamata "init" che, lato server, funge da contenitore per tutte queste chiamate (così chiamo una volta sola). setLastUpdate di tutte loro oltre che per se stessa
 - timestamp: conversione secondi\millisecondi via server. PUT & POST = secondi, GET = millisecondi
 - i records con diversi lang hanno ID uguali, perché la key è costuita dalla coppia ID-LANG

STORE
 - store/_commons/*
   // TODO creare project a parte (guebbit-vue-library? guebbit-store-library?)
   // TODO creare una sorta di createMutations, createActions, etc?
   // createActions = gli do url(?), get/set/etc e .then() in caso di riuscita e .catch di fallimento? O automatizzo pure loro?


GENERIC:
 - gestione ticket\request da utenti ad admin (generici + rimozione di schedule non più automaticamente removibili?)
 - Imparare ARIA e usability + usare
 - Inserire tooltips in giro
 - molte funzioni nei getters possono essere messe dentro un composable e richiamate nei getters (eliminare alcune shortcuts da composable a getter)

ADMIN:
 - default event on click\drag creato a suo nome, per inserimenti istantanei, modificabile dopo

PROFILE
 - Creazione info profili salvataggi (intanto usare adminInfo)

SCHEDULE
 - SCHEDULE / EVENTS / BOOKINGS = scegli 1
 - "PAGINATION" of 60 days?
 - FUTURE: Sono sempre mono giornata e quindi "date" è sempre lo stesso giorno, ma ideare che possano essere più giorni per il futuro

PRODUCTS
 - route.query e filters si aggiornano in contemporanea: ripensare

COMPONENTS
 - BookCard lieve overflow hidden a destra, all'hover\rotate

CALENDAR
 - background color
 - normal user can see only his events (with multiple random colors) and other users events are greyed out
   - Admin mode: users with different colors, opacity 0.8? Admin with opacity 1 primary\secondary color 
   - User mode: users with different colors? opacity 0.4? User with opacity 1 primary\secondary color
 - Calendar.vue TODO remake in <script SETUP>
 - Fullcalendar eventDurationEditable = false perché non triggera eventAllow
 - dayMaxEvents: true (non dovrebbe servire ma controlla https://fullcalendar.io/docs/dayMaxEvents, magari come comportamento standard interno)

YUP
 - yup.object.test() mi restituisce key vuota, problema nel controllo delle date di yup

FUTURO:
 - sendScheduleRequestMap
   - confirm: è sempre true, sendSchedule viene usato solo al confirm, ma in futuro verrà inviato per salvare le modifiche in corso
     (quindi sarà possibile inviare gli schedule online senza confermare o pagare)
   - useWallet: è sempre true, in futuro l'utente potrà decidere se usare o meno il wallet
 - Forms: usare Timepicker e Datepicker migliori, o splittare type="time" in una select (problema dropdown minuti, che devono riflettere lo step, tipo 00 e 30)
 - Le traduzioni di cose come, esempio, il genere (action => genre-action = azione), i tag, etc, che fare visto che sono custom? Far arrivare dal server la traduzione (con l'icona, il colore, etc)