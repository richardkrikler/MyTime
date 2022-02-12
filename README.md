<h1 align="center">MyTime</h1>
<h3 align="center">Custom Vertical Timeline for Notion</h3>

![MyTime - Demo](https://richardkrikler.com/images/MyTime/MyTime%20-%20Demo.png)
![MyTime - Notion](https://richardkrikler.com/images/MyTime/MyTime%20-%20Notion.png)

## Connect to Notion
Create ```.env``` File in ```server/```

Add Notion Integration Token (```NOTION_KEY```, [Notion-Integrations](https://www.notion.so/my-integrations))  
Add Database-ID (```NOTION_DATABASE_ID```, Open Database as Page -> ID in URL)
```
NOTION_KEY=secret_xxx
NOTION_DATABASE_ID=database_id
```


## Docker
### Start Containers
```
docker compose up -d
```

### Build Images
```
docker compose build
```

### Default Ports
- Client/UI: 1030  
- Server/API: 1031
- 

## Project setup

### Client (Frontend)
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Server (API)
```
npm install
```

#### Start Server
```
npm run start
```
