# Exium - RX Generation

A modern and responsive **Web App** and **Admin Panel** built with **Next.js**, designed for seamless integration with APIs and optimized performance. RX submission for user, content management, and data analytics interfaces by admin panel.

---

## 📦 Features

- ✅ **Next.js 16+ (App Router)**
- ⚛️ **React 19** with Server Components
- 🎨 **Tailwind CSS** for utility-first styling
- 🧱 **TypeScript** support
- ⚙️ **Reusable UI Components** with **Shadcn UI**
- 📊 **Charts** & **Tables** for data visualization
- 📁 Dynamic Routing for admin modules

---

## 📁 Folder Structure

```bash

├── app/                 # App router pages
├── components/          # Shared UI components
│   ├── shared/          # feature name
│   ├── ui/              # feature name
├── hooks/               # Custom React hooks
├── providers/           # Custom React providers
├── features/             # App features
│   ├── actions/         # server actions
│   ├── lib/             # feautures apis
│   ├── components/      # feautures compenets
├── lib/                 # lib functions
├── utils/               # Utility functions
├── public/              # Static files
├── types/               # TypeScript types
├── schema/              # validation schema
├── tailwind.config.js   # Tailwind CSS config
└── next.config.js       # Next.js config
```

---

## 🚀 Getting Started

1. Clone the Repo

```bash
git clone https://github.com/jahidulsec/exium-rx-web.git
cd sales-khub-quiz
```

2. Install Dependencies

```bash
npm install
```

3. Create a `.env` file from `.env.example` in the root:

hint: to generate secret key,

```bash
openssl rand -base64 32
```

4. Run the Dev Server

```bash
npm run dev
```

Now open [http://localhost:5019](http://localhost:5019) in your browser 🚀

5. Run the server with Docker

Run for initial build

```bash
docker-compose up -d --build
```

For rebuild,

```bash
docker-compose down
docker-compose up -d --build
```

---

## 🛠 Available Scripts

```bash
npm run dev         # Run development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run deploy      # Run deploy on product server
```
