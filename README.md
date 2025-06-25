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

Voor de data gebruik ik een online API (my-json-server.typicode.com) uit de instructies. Als die niet werkt heeft de app ook backup data.

**Wat ik heb gebruikt:**
- Vue.js 3 (met Composition API)
- Ionic voor de UI
- Pinia voor data opslag
- Vue Router voor navigatie tussen pagina's

## Wat werkt en wat niet

**Wat wel werkt:**
- ✅ Inloggen (gebruik admin@example.com en password)
- ✅ Tussen pagina's navigeren
- ✅ Dark mode aan/uitzetten  
- ✅ Formulieren invullen (maar data gaat verloren als je refresht)
- ✅ Inspecties bekijken
- ✅ API haalt data op van internet
- ✅ Custom back button navigation
- ✅ Custom footer navigation (geen tab errors meer)

**Wat nog niet werkt goed:**
- Foto's uploaden (heb ik geprobeerd maar lukt niet)
- Data opslaan (de API accepteert geen wijzigingen)  
- Offline gebruiken
- Push notificaties

## Bekende Problemen & Troubleshooting

### 1. ✅ TabBarData Undefined Error (OPGELOST)
**Status:** OPGELOST - Tab navigatie vervangen door custom footer navigatie

**Wat is gedaan:**
- Vervangen van `IonTabBar` en `IonTabButton` componenten
- Implementatie van custom navigation footer
- Alle console errors zijn weggenomen
- Back button navigatie gefixed in alle views

### 2. ✅ Back Button Issues (OPGELOST)  
**Status:** OPGELOST - Custom back buttons geïmplementeerd

**Wat is gedaan:**
- Vervangen van `ion-back-button` door custom implementatie
- Intelligent navigation logic met fallback naar home
- Consistente styling en functionaliteit

### 3. ✅ Dark Mode Issues (OPGELOST)
**Status:** OPGELOST - Dark mode werkt nu correct

**Wat is gedaan:**
- Fixed syntax errors in useDarkMode.js
- Property name compatibility tussen composables
- Correct initialization en persistentie

## Problemen die ik tegenkwam

1. **Foto upload** - De API ondersteunt geen bestanden uploaden. Ik kan alleen de bestandsnaam opslaan.

2. **Data opslaan** - my-json-server.typicode.com is alleen voor lezen. Formulier data verdwijnt als je de pagina ververst.

3. **TypeScript** - Begon met TypeScript maar dat was te ingewikkeld, dus heb alles omgezet naar gewoon JavaScript.

4. **Routing** - Had problemen met de routing maar Vue CLI heeft dat opgelost.

5. **Tab Navigation** - Console errors met tabBarData, maar functionaliteit werkt nog steeds.

## Nielsen Heuristics

Bij het ontwerpen van de app heb ik gelet op de 10 Nielsen usability heuristics:

1. **Visibility of system status** - Loading indicators bij API calls en status badges voor inspecties
2. **Match between system and real world** - Nederlandse taal, bekende iconen (huis, checklist, etc.)
3. **User control and freedom** - Terug knoppen en annuleren opties in formulieren
4. **Consistency and standards** - Zelfde kleuren, fonts en layout door hele app
5. **Error prevention** - Validatie van email en wachtwoord velden
6. **Recognition rather than recall** - Duidelijke labels en instructies bij alle velden
7. **Flexibility and efficiency** - Dark mode toggle voor verschillende gebruikers
8. **Aesthetic and minimalist design** - Clean Ionic design zonder overbodige elementen
9. **Help users recognize and recover from errors** - Duidelijke foutmeldingen met uitleg
10. **Help and documentation** - Kennisbase sectie met informatie voor inspecteurs

## Security Features

- **Authenticatie**: Email/wachtwoord login met sessie management
- **2FA Simulatie**: SMS verificatiecode na inloggen (gesimuleerd)
- **Data Validatie**: Input validatie op alle formulieren

## Test gegevens

Je kunt inloggen met:
- Email: admin@example.com  
- Wachtwoord: password
- 2FA Code: 123456 (of gebruik de gegenereerde code die in de console verschijnt)

**2FA Functionaliteit:**
- Na successvol inloggen wordt automatisch een SMS verificatiecode gesimuleerd
- De gegenereerde code wordt getoond in de browser console voor testdoeleinden
- Je kunt ook altijd de code "123456" gebruiken
- Er is een "Terug naar inloggen" optie als je de verkeerde gegevens hebt ingevoerd

**Bekende Issues:**
- Foto's uploaden werkt nog niet volledig
- Data persisteert niet na page refresh (API limitaties)
- Offline functionaliteit nog niet geïmplementeerd

De app haalt data van: https://my-json-server.typicode.com/QAS5/RealEstateCare

## Voor Docenten 

**GitHub Repository:** https://github.com/QAS5/RealEstateCare-App.git


**Test account:**
- Email: admin@example.com
- Wachtwoord: password


---


