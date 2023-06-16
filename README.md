# text-correction

## Description
A website to integrate with xunfei text correction service

## Usage
### Self host 
Input your `APPID`, `API_SECRET`, `API_KEY` and `API_HOST` in docker-compose.yaml file and run `docker compose up -d`

### Railway
Railway doesn't support docker-compose and docker hub, has to use Dockerfile to build your self, remember to add Variable of `APPID`, `API_SECRET`, `API_KEY` and `API_HOST` and `PORT`(should be 3000)