import { CorsOptions } from 'cors'

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = [
            process.env.FRONTEND_URL
        ]

        if(whiteList.includes(origin)) {
            callback(null, true)
        }

        callback(new Error('Error of cors'))
    } 
}