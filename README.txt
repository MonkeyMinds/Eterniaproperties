ETERNIA PROPERTIES WEBSITE — OWNER'S GUIDE
==========================================

UPLOADING
Upload everything in this folder (all .html files, style.css, script.js,
data.js and the images folder) to the main folder of your web hosting
(usually public_html). No database or server setup is needed.

ADDING YOUR REAL PROPERTIES
1. Open data.js in any text editor (Notepad works).
2. Each property is one line inside PROPERTIES = [ ... ].
   Copy a line, change the details, and give it a new id number.
3. Prices are in LAKH: 85 = Rs 85 L, 150 = Rs 1.5 Cr.
4. "locality" must be spelled exactly like a locality in the ZONES list.
5. Delete   sample: true   (or the whole sample line) to remove the
   "Sample listing" tag.
6. Put the property photo in the images folder and write its file name
   in "image", e.g. image: "kokapet-tower.jpg".

CHANGING COLOURS OR FONTS
All colours and fonts are at the top of style.css (the :root section).

THINGS TO FILL IN
- Social media links: in each .html file, search for href="#" on the
  Facebook, Instagram and LinkedIn icons and paste your page addresses.
- Contact form: it opens the visitor's email app with the message
  addressed to Eterniaproperty@gmail.com (works without a server).
