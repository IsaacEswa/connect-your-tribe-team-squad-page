import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'Joy';

const params = {
  'filter[cohort]': '2526',
  'filter[tribe][name]': 'FDND Jaar 1'
}
const squadResponse = await fetch('https://fdnd.directus.app/items/squad?' + new URLSearchParams(params))

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const squadResponseJSON = await squadResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(squadResponseJSON)


const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

app.use(express.urlencoded({ extended: true }))


app.get('/', async function (request, response) {

  // Filter eerst de berichten die je wilt zien, net als bij personen
  // Deze tabel wordt gedeeld door iedereen, dus verzin zelf een handig filter,
  // bijvoorbeeld je teamnaam, je projectnaam, je person ID, de datum van vandaag, etc..
  const params = {
    // 'filter[for]': `Team ${teamName}`,

    // Sorteer op naam
    'sort': 'name', //als dit er niet is dan gaat naar id 

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1I',
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526'
  }
  if (request.query.search) {
    params['search'] = request.query.search
  }
  if (request.query.sort == 'name') {
    // Als we op /?sorteer=andersom zitten, voeg dan sort=-name toe
    params['sort'] = 'name'

  } else if (request.query.sort == 'birthdate') {
    // En anders, voeg sort=name toe
    params['sort'] = 'birthdate' //name word overschreven door bd

  } else if (request.query.sort == 'border-radius') {
    params['sort'] = 'fav_border_radius' //deze moet de exact zijn van de db
  }


  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // Maak hiermee de URL aan, zoals we dat ook in de browser deden
  const apiURL = 'https://fdnd.directus.app/items/messages?' + new URLSearchParams(params)

  // Laat eventueel zien wat de filter URL is
  // (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
  // console.log('API URL voor messages:', apiURL)

  // Haal daarna de messages data op
  const messagesResponse = await fetch(apiURL)

  // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
  const messagesResponseJSON = await messagesResponse.json()

  // Controleer eventueel de data in je console
  // console.log(messagesResponseJSON)

  // En render de view met de messages
  response.render('index.liquid', {
    teamName: teamName,
    messages: messagesResponseJSON.data,
    persons: personResponseJSON.data,
    squads: squadResponseJSON.data,
    search: request.query.search || ''
  })
})

app.post('/', async function (request, response) {

  // Stuur een POST request naar de messages tabel
  // Een POST request bevat ook extra parameters, naast een URL
  await fetch('https://fdnd.directus.app/items/messages', {

    // Overschrijf de standaard GET method, want ook hier gaan we iets veranderen op de server
    method: 'POST',

    // Geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons bericht straks weer terug kunnen vinden met ons filter
      for: `Team ${teamName}`,
      // En dit zijn onze formuliervelden
      from: request.body.from,
      text: request.body.text
    }),

    // En vergeet deze HTTP headers niet: hiermee vertellen we de server dat we JSON doorsturen
    // (In realistischere projecten zou je hier ook authentication headers of een sleutel meegeven)
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Stuur de browser daarna weer naar de homepage
  response.redirect(303, '/')
})


app.set('port', process.env.PORT || 8001)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}





//############################### Seb ######################################
app.get('/1I', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': 'name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526',
    'filter[squads][squad_id][_nnull]': 'true'

  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data, squad: '1I' })
})


app.get('/1J', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': 'name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    'filter[squads][squad_id][name]': '1J',
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526',
    'filter[squads][squad_id][_nnull]': 'true'

  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data, squad: '1J' })
})
//########################################################################


//################### zoekfunctie #####################

app.get('/search', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': 'name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',

    'filter[squads][squad_id][cohort]': '2526',
    'filter[squads][squad_id][_nnull]': 'true',

    'search': 'Directus'

  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data, squad: '1J' })
})

//####################################################################

//############################## Andere manier sorteren ##############################
app.get('/', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': 'name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526'
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data })
})

app.get('/naam-Z-A', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': '-name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526'
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('naamZ-A.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data })
})

//!!!!!!!!!!! Linked naar birthdate HHHHHHHHH
app.get('/geboorte-oud-jong', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': 'birthdate',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526',
    'filter[birthdate][_nnull]': 'true'

  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('birthdate.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data })
})

// //!!!!!!!!!!! Linked naar birthdate jong-oud HHHHHHHHH
app.get('/geboorte-jong-oud', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': '-birthdate',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526',
    'filter[birthdate][_nnull]': 'true'

  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('birthdateRev.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data })
})

//!!!!!!!!!!! Linked naar border HHHHHHHHH
app.get('/hoek-vierkant-rond', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': 'fav_border_radius',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526',
    'filter[fav_border_radius][_nnull]': 'true'

  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('border.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data })
})

//!!!!!!!!!!! Linked naar border reverse HHHHHHHHH
app.get('/hoek-rond-vierkant', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    'sort': '-fav_border_radius',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526',
    'filter[fav_border_radius][_nnull]': 'true'
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('borderRev.liquid', { persons: personResponseJSON.data, squads: squadResponseJSON.data })
})






//################### likefunctie #####################
app.get('/person/:id', async function (request, response) {



  const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/' + request.params.id)
  const personDetailResponseJSON = await personDetailResponse.json()

  const likesForPersonResponse = await fetch(`https://fdnd.directus.app/items/messages?filter[for]=Team ${teamName} / Person ${request.params.id} / Like`)
  const likesForPersonResponseJSON = await likesForPersonResponse.json()

  console.log('Likes found:', likesForPersonResponseJSON.data.length)


  response.render('person.liquid', {
    person: personDetailResponseJSON.data,
    liked: likesForPersonResponseJSON.data.length > 0
  })


})


app.post('/person/:id/like', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName} / Person ${request.params.id} / Like`,
      from: '',
      text: ''
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  console.log('LIKE opgeslagen voor:', `Team ${teamName} / Person ${request.params.id} / Like`)


  response.redirect(303, `/person/${request.params.id}`)
})

app.post('/person/:id/unlike', async function (request, response) {

  const likesForPersonResponse = await fetch(`https://fdnd.directus.app/items/messages?filter[for]=Team ${teamName} / Person ${request.params.id} / Like`)
  const likesForPersonResponseJSON = await likesForPersonResponse.json()
  const likesForPersonResponseID = likesForPersonResponseJSON.data[0].id

  await fetch(`https://fdnd.directus.app/items/messages/${likesForPersonResponseID}`, {
    method: 'DELETE'
  });

  response.redirect(303, `/person/${request.params.id}`)
})


// app.get('/242', async function (request, response) {
//   const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/' + request.params.id)
//   const personDetailResponseJSON = await personDetailResponse.json()

//   const likesForPersonResponse = await fetch(`https://fdnd.directus.app/items/messages?filter[for]=Team ${teamName} / Person ${request.params.id} / Like`)
//   const likesForPersonResponseJSON = await likesForPersonResponse.json()

//   console.log('Likes for person:', likesForPersonResponseJSON.data.length);

//   response.render('index.liquid', {
//     person: personDetailResponseJSON.data,
//     liked: likesForPersonResponseJSON.data.length > 0
//   })
// })

// app.post('/like', async function (request, response) {
//   // console.log('Liking person with ID:', request.params.id);


//   await fetch('https://fdnd.directus.app/items/messages', {
//     method: 'POST',
//     body: JSON.stringify({
//       for: `Team ${teamName} / Person ${request.params.id} / Like`,
//       from: '',
//       text: ''
//     }),
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   });

//   response.redirect(303, `/`)
// })

// app.post('/unlike', async function (request, response) {
//   //   console.log('Unliking person with ID:', request.params.id);
//   // console.log(`https://fdnd.directus.app/items/messages?filter[for]=Team ${teamName} / Person ${request.params.id} / Like`);


//   const likesForPersonResponse = await fetch(`https://fdnd.directus.app/items/messages?filter[for]=Team ${teamName} / Person ${request.params.id} / Like`)
//   const likesForPersonResponseJSON = await likesForPersonResponse.json()
//   const likesForPersonResponseID = likesForPersonResponseJSON.data[0].id

//   await fetch(`https://fdnd.directus.app/items/messages/${likesForPersonResponseID}`, {
//     method: 'DELETE'
//   });

//   response.redirect(303, `/`)
// })