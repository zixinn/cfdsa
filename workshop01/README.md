### Backend

```
npm init -y
npm install express cors dotenv
```

```
npm install
node --watch index.js
```

### Frontend

```
npm create vite@latest
npm install axios
```

```
npm install
npm run dev
```

### Deployment

```
heroku login
heroku create workshop01-app
heroku config:set REPO=https://github.com/zixinn/myrepo IMAGE_FILENAME=image.png
git push heroku main
heroku open
```
