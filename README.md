# About the app
The app is meant to be a simple diary for pets in which one can add records regarding food, illness attacks, water and toilet.

## Available functionality:
- Create up to 20 diaries for your pets
- Add records for: water, phoo, food, vomit and illness attack

## Upcoming functions:
- Share access to your diary to any telegram user
- Change time for added records
- Choose time when creating record in a diary
- Add own record types with any emoji
- Edit / remove default record types
- Charts and filtering
- Add photo of your pet to a diary
- CSV export of records in a diary
- More intelligent authorization for requests

# Stack
- Server is running in NodeJS environment
    - ExpressJS as a gateway
    - MongodDB as a database
    - TypeScript as a coding language
- Client is running using ReactJS
    - JavaScript as a coding language
## Deploy and startup
### Deploy to hosting
The repo is a monorepo, which brings some specific points in deployment step. A hosting supporting deploy from monorepo is required.
For client deployment hosting platforms like netlify or vercel suits just fine.
For server side an ordinary VPS with installed NodeJS environment would work. At some point the repo could be refactored to be used as cloud functions in netlify or alike.
### Steps to deploy
#### Client / Frontend
1. Upload or integrate GitHub account with your hosting platform or e.g. netlify
2. Add web-app folder in deployment settings as a root folder
3. Setup environment variables
4. Deploy
   This should give you website that will be shown to telegram as a mini app.
#### Server / Backend
1. Deploy VPS in cloud provider, e.g. AWS, GCP
2. Get static public IP address from cloud provider
3. Upload or setup automatic fetch using GitHub actions
4. Setup environment variables
5. Attach SSL certificate to the acquired static public IP, e.g. through let’s encrypt
6. Start backend from backend folder
   This should get you ready backend server.
### Setup telegram bot
1. Create telegram bot through bot father
2. Setup menu button to open Client’s website you received in previous step
3. Send /start command to bot

# Environment variables
## Frontend
put env variables into `.env` file
- REACT_APP_BASE_URL=HERE_GOES_URL_OF_DEPLOYED_BACKEND_WITH_PORT_IF_DIFFERENT_FROM_443_OR_80
`development` value affect ngrok deployments, to hide developer message
- REACT_APP_ENVIRONMENT=development
## Backend
- BOT_USER_NAME=YOUR_TELEGRAM_BOT_NAME
- DB_URI=MONGO_DB_URI
- TELEGRAM_BOT_TOKEN=TELEGRAM_BOT_TOKEN
- WEB_APP_URL=HERE_GOES_URL_OF_DEPLOYED_FRONT_END