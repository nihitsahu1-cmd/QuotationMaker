PINWEB QUOTATION GENERATOR
==========================

Files
- index.html: form + A4 quotation preview
- style.css: screen layout and A4 print styling
- script.js: live quotation updates, currency formatting, reset and print

How to use
1. Extract the ZIP into a folder.
2. Put your company logo in the assets folder and name it exactly: logo.png
   Example: PinWeb_Quotation_Generator/assets/logo.png
   (PNG with transparent background works best.)
3. Open index.html in Chrome or Edge.
4. Fill in customer name, address and mobile, then enter the first service's category, description, quantity and amount.
5. Click "+ Add Another Service" for each additional service. Each service is listed separately and included in the quotation total.
6. Click "Print A4 Quotation".
7. In the print dialog, select paper size A4, scale 100% or Default, and enable Background graphics.
   Turn off browser headers/footers for a cleaner quotation.

Company information is already included:
PinWeb Private Limited
+91 94159 74978 | contact@pinweb.com
5th Floor, Tulsaini Grace, Edmonston Road, Civil Lines,
Prayagraj, Uttar Pradesh 211001

Notes
- Each service amount is treated as a per-unit amount. Its line total = quantity × amount; the quotation subtotal and total include all services.
- Taxes are shown as extra, if applicable; they are not calculated.
- This is a client-side project and does not save quotations to a database.
- If your logo has a different file extension, either rename it to logo.png or change the image src in index.html.
