https://www.virtual-room.com/en/
https://toulon.virtual-room.com/reservation/


IMPORTANT
- Dalle 23.30 alle 00.30 c'è un bug (va in negativo di 23 ore)
- stations diverse + stations multiple prenotabili dal singolo utente
    - checkScheduleIsAllowed non considera il multi-station
    - la capacity ed il timeavailable sono sempre settati sulla prima station

GENERIC:
 - timestamp: conversione secondi\millisecondi via server. PUT & POST = secondi, GET = millisecondi
 - gestione ticket\request da utenti ad admin (generici + rimozione di schedule non più automaticamente removibili?)
 - Filter vs Reduce performance test
 - Imparare ARIA e usability

ADMIN:
 - default event on click\drag creato a suo nome, per inserimenti istantanei, modificabile dopo

PROFILE
 - Creazione info profili salvataggi (intanto usare adminInfo)

SCHEDULE
 - SCHEDULE / EVENTS / BOOKINGS = scegli 1
 - "PAGINATION" of 60 days?
 - FUTURE: Sono sempre mono giornata e quindi "date" è sempre lo stesso giorno, ma ideare che possano essere più giorni per il futuro

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