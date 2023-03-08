import type { RequestHandler } from '@builder.io/qwik-city';

export const onRequest:RequestHandler = ({ headers, method,status }) => {
    headers.set('Access-Control-Allow-Credentials', "true")
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    headers.set(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            )
    if (method === 'OPTIONS') {
        status(200)
        return
    }

};