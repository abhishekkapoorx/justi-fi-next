# Justi-Fi Next.js Frontend

A modern legal AI platform frontend built with Next.js 14, featuring intelligent document analysis, chat functionality, and insights generation.

## 🚀 Project Overview

Justi-Fi Next.js is the frontend application that provides:
- **Authentication**: Clerk-based user management
- **Document Management**: Upload and analyze legal documents
- **AI Chat**: Intelligent conversation threads
- **Insights Generation**: Automated analysis and summaries
- **Space Organization**: Multi-workspace support

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB database
- Clerk account for authentication
- ngrok account for tunneling

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

   CLERK_WEBHOOK_SECRET=

   CHAT_API_URL=

   MONGODB_URI=

   EMAIL_USER=
   EMAIL_PASS=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

### ngrok Setup for Public Access

To expose your local development server to the internet:

1. **Install ngrok:**
   ```bash
   npm install -g ngrok
   # or download from https://ngrok.com/download
   ```

2. **Run ngrok to tunnel your Next.js app:**
   ```bash
   ngrok http --url=<ngrok_public_url> 3000
   ```

   Replace `<ngrok_public_url>` with your desired ngrok URL (e.g., `https://your-app.ngrok.io`).

3. **Update your environment variables:**
   Update `CHAT_API_URL` in your `.env.local` to use the ngrok URL:
   ```env
   CHAT_API_URL=https://your-app.ngrok.io
   ```

## 📁 Project Structure

```
justi-fi-next/
├── src/
│   ├── app/                    # App router pages and API routes
│   │   ├── api/               # API endpoints
│   │   │   ├── spaces/       # Space management APIs
│   │   │   ├── contact/       # Contact form APIs
│   │   │   └── clerk/        # Clerk webhook handlers
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── pricing/         # Pricing page
│   │   └── sign-in/         # Authentication pages
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── Home/            # Homepage components
│   │   └── ...              # Other components
│   ├── lib/                 # Utility functions and configurations
│   │   ├── actions/         # Server actions
│   │   ├── mongoose.ts      # Database connection
│   │   └── utils.ts         # Utility functions
│   ├── models/              # MongoDB data models
│   ├── types/               # TypeScript type definitions
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
└── components.json          # UI component configuration
```

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk authentication public key
- `CLERK_SECRET_KEY`: Clerk authentication secret key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Sign-in page URL
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Sign-up page URL
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`: Redirect after sign-in
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`: Redirect after sign-up
- `CLERK_WEBHOOK_SECRET`: Clerk webhook secret for user management
- `CHAT_API_URL`: Backend API URL for chat functionality
- `MONGODB_URI`: MongoDB connection string
- `EMAIL_USER`: Email service username
- `EMAIL_PASS`: Email service password
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for file uploads
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## 📡 API Routes

### Spaces Management
- `GET /api/spaces` - Get user spaces
- `POST /api/spaces` - Create new space
- `GET /api/spaces/[spaceId]` - Get specific space
- `PUT /api/spaces/[spaceId]` - Update space
- `DELETE /api/spaces/[spaceId]` - Delete space

### Threads Management
- `GET /api/spaces/[spaceId]/threads` - Get threads in space
- `POST /api/spaces/[spaceId]/threads` - Create new thread

### Messages Management
- `GET /api/spaces/[spaceId]/threads/[threadId]/messages` - Get messages in thread
- `POST /api/spaces/[spaceId]/threads/[threadId]/messages` - Send new message

### Other APIs
- `POST /api/contact` - Contact form submission
- `POST /api/cloudinary/upload` - File upload to Cloudinary
- `POST /api/clerk/webhook` - Clerk webhook handler

## 🎨 UI Components

### Base Components
- Button, Input, Textarea, Select
- Dialog, Sheet, Dropdown Menu
- Card, Badge, Avatar
- Loading, Theme Toggle

### Custom Components
- Navbar with authentication
- App Sidebar for navigation
- Footer with links
- JustiFi Logo component

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Netlify
- Railway
- Heroku

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **UI Components**: Radix UI + shadcn/ui
- **File Upload**: Cloudinary
- **Deployment**: Vercel

## 📝 Key Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching capability
- **Real-time Updates**: Live chat and notifications
- **File Management**: Document upload and processing
- **AI Integration**: Chat with AI agents
- **Space Organization**: Multi-workspace support
- **User Management**: Complete authentication flow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Note**: Make sure to keep your API keys secure and never commit them to version control.