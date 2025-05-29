# RealEstateCare App

Dit is mijn app voor een opdracht. Een app voor vastgoed inspecteurs.

## Wat doet het?

De app is bedoeld voor inspecteurs die huizen en gebouwen moeten controleren. Ze kunnen:
- Inloggen 
- Hun toegewezen inspecties zien
- Formulieren invullen tijdens inspecties
- Uitgevoerde inspecties bekijken
- Informatie opzoeken in de kennisbase
- Hun instellingen aanpassen

## Hoe heb ik het gemaakt?

Ik heb Vue.js gebruikt omdat dat makkelijker leek dan React. En Ionic voor de mobiele interface want dat ziet er professioneel uit.

Voor de data gebruik ik een online API (my-json-server.typicode.com) die ik op internet vond. Als die niet werkt heeft de app ook backup data.

**Wat ik heb gebruikt:**
- Vue.js 3 (met Composition API)
- Ionic voor de UI
- Pinia voor data opslag
- Vue Router voor navigatie tussen pagina's

## Wat werkt en wat niet

**Wat wel werkt:**
- Inloggen (gebruik admin@example.com en password)
- Tussen pagina's navigeren
- Dark mode aan/uitzetten
- Formulieren invullen (maar data gaat verloren als je refresht)
- Inspecties bekijken
- API haalt data op van internet

**Wat nog niet werkt goed:**
- Foto's uploaden (heb ik geprobeerd maar lukt niet)
- Data opslaan (de API accepteert geen wijzigingen)
- Offline gebruiken
- Push notificaties

## Problemen die ik tegenkwam

1. **Foto upload** - De API ondersteunt geen bestanden uploaden. Ik kan alleen de bestandsnaam opslaan.

2. **Data opslaan** - my-json-server.typicode.com is alleen voor lezen. Formulier data verdwijnt als je de pagina ververst.

3. **TypeScript** - Begon met TypeScript maar dat was te ingewikkeld, dus heb alles omgezet naar gewoon JavaScript.

4. **Routing** - Had problemen met de routing maar Vue CLI heeft dat opgelost.

## Test gegevens

Je kunt inloggen met:
- Email: admin@example.com  
- Wachtwoord: password

De app haalt data van: https://my-json-server.typicode.com/QAS5/RealEstateCare

## Voor Docenten - Hoe de app te runnen

**GitHub Repository:** https://github.com/QAS5/RealEstateCare-App.git

**Lokaal runnen:**
```bash
git clone https://github.com/QAS5/RealEstateCare-App.git
cd RealEstateCare-App
npm install
npm run serve
```
Dan naar http://localhost:8080

**Live demo op Netlify:** [URL wordt automatisch gegenereerd na deployment]

**Test account:**
- Email: admin@example.com
- Wachtwoord: password

---

*Gemaakt voor LOI schoolopdracht - Mei 2025*
