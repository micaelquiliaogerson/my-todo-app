# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta usada pela aplicação (caso use Next.js)
EXPOSE 3000

RUN npx prisma generate

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
