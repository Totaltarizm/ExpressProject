FROM node:18

WORKDIR /usr/src/app

# Копіюємо package.json і package-lock.json (швидший кеш)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install --production

# Копіюємо весь код (окрім того, що в .dockerignore)
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
