# Text Editor with AI Features (Frontend)

Welcome to the frontend repository for the AI-powered text editor! This project offers a collaborative, feature-rich, and intelligent text editor inspired by Notion, enabling real-time collaboration, document translation, and AI-powered chat with your documents.

## Features

- **Next.js and TypeScript**: Fast and scalable frontend development.
- **ShadCN UI Components**: Modern and accessible UI.
- **BlockNote Editor**: Rich-text editing with block-based design.
- **Liveblocks**: Real-time collaboration for multiple users.
- **Clerk Authentication**: Secure user authentication and management.
- **Firebase and Firestore**: Robust storage and syncing for documents.
- **AI Features**:
  - Chat with document content.
  - Translate documents to multiple languages.

---

## Installation and Setup

### Prerequisites
- Node.js (v16+)
- Firebase account (for database configuration)
- Clerk account (for authentication setup)

### Steps
1. Clone this repository:
   ```bash
   git clone <frontend-repo-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   LIVEBLOCKS_SECRET_KEY=<your-liveblocks-secret-key>

   NEXT_PUBLIC_BASE_URL=<your-base-url>

   FIREBASE_TYPE=<firebase-type>
   FIREBASE_PROJECT_ID=<firebase-project-id>
   FIREBASE_PRIVATE_KEY_ID=<firebase-private-key-id>
   FIREBASE_PRIVATE_KEY="<firebase-private-key>"
   FIREBASE_CLIENT_EMAIL=<firebase-client-email>
   FIREBASE_CLIENT_ID=<firebase-client-id>
   FIREBASE_AUTH_URI=<firebase-auth-uri>
   FIREBASE_TOKEN_URI=<firebase-token-uri>
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=<firebase-auth-provider-cert-url>
   FIREBASE_CLIENT_X509_CERT_URL=<firebase-client-cert-url>
   ```

   > **Note**: To set up Firebase, you need to download the `service_key.json` file from your Firebase project. Then, extract its contents and map them to the above `.env.local` format.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Deployment
The frontend is deployed on Render. To deploy updates:
1. Push changes to the main branch.
2. Render will automatically build and deploy the latest changes.

---

## Connection to Backend Repository
This repository works with the backend API hosted in the Flask and AI models repository. The backend handles:
- AI features such as document translation and chat.
- API endpoints for processing document content.

### Backend Repository
Find the backend repository here: [Backend Repository](https://github.com/Abhijeet314/flask-nextjs-TextEditor)

Ensure that the `NEXT_PUBLIC_BASE_URL` in the `.env.local` file points to the deployed backend API URL.

---

## Technologies Used
- **Frontend**: Next.js, TypeScript, ShadCN
- **Editor**: BlockNote
- **Collaboration**: Liveblocks
- **Authentication**: Clerk
- **Storage**: Firebase, Firestore
- **Deployment**: Render

---

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes and create a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

