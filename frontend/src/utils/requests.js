const backendUrl = 'http://localhost:3001/api'

async function fetchAPI(endpoint, method, body = {}) {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
    if (document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))) {
        let token = document.cookie.split('; ').find(row => row.startsWith('jwt=')).split('=')[1]
        requestOptions['credentials'] = 'include'
        requestOptions['headers']['Cookie'] = "jwt=" + token
    }
    if (method != 'GET') {
        requestOptions["body"] = JSON.stringify(body)
    }
    let rt = await fetch(backendUrl.concat(endpoint), requestOptions)
        .then(r => r.json())
    return (rt)
}

// API POST /auth/login, login a user,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function login(email, pw) {
    let data = await fetchAPI('/auth/login', 'POST', {
        "email": email,
        "password": pw
    })
    if (data['success']) {
        let token = data['data']['token']
        let userType = data['data']['userType']
        
        document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax"
        document.cookie = "userType=" + userType + "; path=/; max-age=86400; samesite=lax"
    }
    return data;
}

// API POST /auth/signUp, sign up a new user,
// returns an array, first element is a boolean that indicate the success of the request, 
// second element is the data or the error message
export async function createAccount(email, password, nome, zona) {
    let data = await fetchAPI('/auth/signup', 'POST', {
        "email": email,
        "password": password,
        "nome": nome,
        "zona": zona,
    })

    if (data['success']) {
        let token = data['data']['token']
        let userType = data['data']['userType']

        document.cookie = "jwt=" + token + "; path=/; max-age=86400; samesite=lax"
        document.cookie = "userType=" + userType + "; path=/; max-age=86400; samesite=lax"
    }
    return data;
}

// Frontend only - logout a user dropping the cookie
// returns an array, first element is a boolean that indicate the success of the request,
// second element is the message
export async function logout() {
    // check if the cookie exists
    if (document.cookie.split(';').some((item) => item.trim().startsWith('jwt=')) && document.cookie.split(';').some((item) => item.trim().startsWith('userType='))) {
        // if it exists, delete it
        document.cookie = "jwt=; path=/; max-age=0; samesite=lax"
        document.cookie = "userType=; path=/; max-age=0; samesite=lax"
        // delete all from local storage
        localStorage.clear()
        return { "success": true, "message": "Logout effettuato con successo" }
    } else {
        return { "success": false, "message": "L'utente non è loggato" }
    }
}

export async function getZone() {
    return await fetchAPI('/zone', 'GET')
}