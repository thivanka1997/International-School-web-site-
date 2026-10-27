# International School web site

Website for **Kingsbridge American College** – an English medium school with branches in
Boralesgamuwa, Mattegoda and Horana, Sri Lanka.

Built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production files are written to `dist/`.

## Admission enquiries

The enquiry form in `src/components/Contact.jsx` emails each enquiry to the Principal's office
(via [FormSubmit](https://formsubmit.co)) and opens WhatsApp with the details pre-filled.
The email address and WhatsApp number are set at the top of that file.
