export const API_URL =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000/api'
        : 'https://shrouded-wildwood-64222.herokuapp.com/api'
