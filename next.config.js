/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"]
    }, 
    async headers(){
        return [{
            source: '/api/:path*',
            headers : [
                {key: 'Access-Control-Allow-Credentials', value: 'true'},
                {key: "Access-Control-Allow-Origin", value:"*"},
                {key: "Access-Control-Allow-Methods", value: "GET,POST,PUT, DELETE,PATCH"},
                {key:"Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With, X-Api-Version, Date,Content-MD5,Accept-Version,Accept,X-CSRFToken"}
            ]
        }]
    }
}

module.exports = nextConfig

