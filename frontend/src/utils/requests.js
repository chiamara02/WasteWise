const backendUrl = "https://backendwastewise.duckdns.org/api";

async function fetchAPI(endpoint, method, body = {}) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  };
  if (
    document.cookie.split(";").some((item) => item.trim().startsWith("jwt="))
  ) {
    let token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1];
    requestOptions["credentials"] = "include";
    requestOptions["headers"]["Cookie"] = "jwt=" + token;
  }
  if (method === "GET" && Object.keys(body).length > 0) {
    const urlParams = new URLSearchParams(body).toString();
    endpoint = `${endpoint}?${urlParams}`;
  } else if (method !== "GET") {
    requestOptions["body"] = JSON.stringify(body);
  }
  let rt = await fetch(backendUrl.concat(endpoint), requestOptions).then((r) =>
    r.json()
  );
  return rt;
}

// API POST /auth/login, login a user,
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the data or the error message
export async function login(email, pw) {
  let data = await fetchAPI("/auth/login", "POST", {
    email: email,
    password: pw,
  });
  if (data["success"]) {
    let token = data["data"]["token"];
    let userType = data["data"]["userType"];

    document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax";
    document.cookie =
      "userType=" + userType + "; path=/; max-age=86400; samesite=lax";
  }
  return data;
}

// API POST /auth/signUp, sign up a new user,
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the data or the error message
export async function createAccount(email, password, nome, zona) {
  let data = await fetchAPI("/auth/signup", "POST", {
    email: email,
    password: password,
    nome: nome,
    zona: zona,
  });

  if (data["success"]) {
    let token = data["data"]["token"];
    let userType = data["data"]["userType"];

    document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax";
    document.cookie =
      "userType=" + userType + "; path=/; max-age=86400; samesite=lax";
  }
  return data;
}

// Frontend only - logout a user dropping the cookie
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the message
export async function logout() {
  // check if the cookie exists
  if (
    document.cookie.split(";").some((item) => item.trim().startsWith("jwt=")) &&
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("userType="))
  ) {
    // if it exists, delete it
    document.cookie = "jwt=; path=/; max-age=0; samesite=lax";
    document.cookie = "userType=; path=/; max-age=0; samesite=lax";
    // delete all from local storage
    localStorage.clear();
    return { success: true, message: "Logout effettuato con successo" };
  } else {
    return { success: false, message: "L'utente non è loggato" };
  }
}

export async function getZone() {
  return await fetchAPI("/zone", "GET");
}

export async function nuovaSegnalazione(descrizione, indirizzo, foto) {
  let data = await fetchAPI("/segnalazioni", "POST", {
    descrizione: descrizione,
    indirizzo: indirizzo,
    foto: foto,
  });
  return data;
}

export async function mostraSegnalazioni() {
  return await fetchAPI("/segnalazioni", "GET");
}

export async function getTasse(stato = undefined) {
  let params = {};
  if (stato) {
    params["stato"] = stato;
  }
  return await fetchAPI("/tasse", "GET", params);
}

export async function getPercorsi() {
  return await fetchAPI("/tracking/percorsi", "GET");
}

export async function getTracking(zona) {
  return await fetchAPI("/tracking", "GET", { zona: zona });
}

export async function nextStop(zona) {

    return await fetchAPI('/tracking', 'POST', {zona:zona})
}

export async function nuovaPrenotazione(descrizione, dateUtili) {
    let data = await fetchAPI('/prenotazioni', 'POST', {
        "descrizione": descrizione,
        "dateUtili": dateUtili
    });
    return data;
}

export async function getPrenotazioni() {
    return await fetchAPI('/prenotazioni/getPrenotazioni', 'GET');
    
}

export async function getAllPrenotazioni() {
    return await fetchAPI('/prenotazioni/getAllPrenotazioni', 'GET');
    
}

export async function modificaPrenotazione(idPrenotazione, nuovoStato, dataEffettiva) {
    let data = await fetchAPI('/prenotazioni/'.concat(idPrenotazione), 'PUT', {
        "nuovoStato": nuovoStato,
        "dataEffettiva": dataEffettiva
    });
    return data;
}

  return await fetchAPI("/tracking", "POST", { zona: zona });
}

// Funzione per creare un nuovo sondaggio
export async function nuovoSondaggio(titolo, domande) {
  console.log("nuovoSondaggio - request.js");
  return await fetchAPI("/sondaggi/sondaggio", "POST", {
    titolo: titolo,
    domande: domande,
  });
}

// Funzione per ottenere i sondaggi
export async function getSondaggi() {
  console.log("getSondaggi - request.js");
  return await fetchAPI("/sondaggi/sondaggio", "GET");
}

// Funzione per compilare un sondaggio
export async function compilaSondaggio(id, risposte) {
  console.log("compilaSondaggio - request.js");
  return await fetchAPI(`/sondaggi/questionario`, "POST", {
    sondaggio: id,
    risposte: risposte,
  });
}

// Funzione per ottenere i questionari compilati
export async function getQuestionari() {
    return await fetchAPI('/sondaggi/questionario', 'GET');
}

//funzione per ottenere un sondaggio per id
export async function getSondaggio(id) {
    return await fetchAPI(`/sondaggi/sondaggio/${id}`, 'GET');
}


