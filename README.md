## Squad Page
We hebben een ontwerp gemaakt waarbij squad I en squad J aangetoond word. Hierbij hebben we gebruik gemaakt van NodeJS, Express, JSON en Liquid
- https://connect-your-tribe-team-squad-page-fis5.onrender.com

## Inhoudsopgave
[**_Beschrijving_**](#beschrijving)<br/>
[**_Homepagina_**](#Homepagina)<br/>
[**_Sorteren_**](#Sorteren)<br/>
[**_Filteren_**](#Filteren)<br/>
[**_Detailpagina_**](#Detailpagina)<br/>
[**_Post request_**](#Postrequest)<br/>
[**_Testen_**](#Testen)<br/>




https://www.figma.com/design/sSadFCdBdbbAhjXBOD7BhV/Squad-page?node-id=12-2&p=f&t=2toFglhJNefxtEyc-0
# Homepagina
- De titel is klikbaar hiermee ga je weer terug naar de homepage.
- Via onze zoekbalk kan je zoeken naar elk student.
- Ook kan je met de zoekbalk elk woord opzoeken dat in de database voorkomt. Je krijgt vervolgens een overzicht van alle personen bij wie dat woord ergens in hun gegevens staat.
<img width="962" height="692" alt="image" src="https://github.com/user-attachments/assets/bca650fa-6bf7-4e4c-a017-28a5b3e96989" />

# Sorteren
- Dit is onze sorteer sectie. Hierbij kan je sorteren op naam, leeftijd of afgeronde hoeken.
- Op Default staat het altijd op naam.
- Als je klikt op een van de sorteer opties word het dikgedrukt.
- Je kan vervolgens via de pijltjes je geselecteerde optie sorteren van laag naar hoog of van hoog naar laag.
- Hierbij word de pijl waarop je geklikt hebt zwart en de ander grijs.
<img width="179" height="125" alt="image" src="https://github.com/user-attachments/assets/2a60daff-a527-4067-8bf5-e087f99861e0" />

# Filteren
- Met onze filter kan je filteren tussen de twee sqauds.
- De geselecteerde filter word dikgedrukt weergegeven.
<img width="154" height="112" alt="image" src="https://github.com/user-attachments/assets/cffd4252-bc9c-40cb-b679-26cb12981943" />

- Als je op squad 1J klikt verandert de thema naar darkmodus.
  
  <img width="966" height="699" alt="image" src="https://github.com/user-attachments/assets/0dc63e65-728a-4923-91c1-7124bacdc3eb" />

# Detailpagina
<img width="962" height="679" alt="image" src="https://github.com/user-attachments/assets/2aa21770-5c1c-4c98-8067-d821b7cd58ee" />

# Postrequest
- Voor onze post request hebben we ervoor gekozen om een like knop te bouwen.
Hierbij word er dus opgeslagen wanneer iemand de like knop heeft ingedrukt. 
<img width="383" height="476" alt="image" src="https://github.com/user-attachments/assets/5017f21d-0ef5-4fbe-ba38-8d69529eed18" />

- Om dit duidelijk aan te tonen word het hartje volledig rood.
<img width="357" height="469" alt="image" src="https://github.com/user-attachments/assets/b95daf4f-3df5-4b63-a8f7-639609e84ca8" />

## Kenmerken & Installatie
- We maken gebruik van liquid hiermee kan je data uit de backend automatisch ingevuld in html.
- Hiervoor maken we ook gebruik van node.js en express.
- Express insalleer je door npm install in te voeren in je terminal. Met express kan je data doorsturen naar je liquid en makkelijk routes aanmaken ook om formulieren te verwerken voor je post requests en voor het opzetten van je server
- Node.js maakt de server en hierin zet je je routes, je roept ook API's aan en roept data aan.

# Routes

## _De sorteer routes:_ 
  <img width="909" height="480" alt="image" src="https://github.com/user-attachments/assets/d2090de9-1f69-4eda-9ebd-b9125ca3563c" /></br>

## _De filter routes:_ </br>
  <img width="852" height="486" alt="image" src="https://github.com/user-attachments/assets/36f15588-61d9-4e98-ba1e-c0d0229ee337" /></br>

## _De like routes (POST & DELETE route):_ </br>
<img width="923" height="502" alt="image" src="https://github.com/user-attachments/assets/c6614081-cb77-4575-9ed3-1a9b50e2380b" /></br>


