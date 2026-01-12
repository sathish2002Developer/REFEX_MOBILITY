# File Upload Setup Guide

## Overview
The Investor Relations admin panel now supports file uploads to a backend server. When you upload a file, it will be stored on the server and the URL will be automatically filled in the form.

## Setup Instructions

### 1. Start the Backend Server

Navigate to the `server` directory and start the server:

```bash
cd server
npm install  # (if not already done)
npm start
```

The server will run on `http://localhost:3001`

### 2. Start the React App

In a separate terminal, start the React development server:

```bash
npm run dev
```

### 3. Using File Upload in Admin Panel

1. Log in to the admin panel at `/admin`
2. Navigate to "Investor Relations" in the sidebar
3. Scroll to the "Files Management" section
4. To upload a file:
   - Select a year from the dropdown
   - Enter a file name (or it will auto-fill from the selected file)
   - Click "Choose File" and select a PDF, DOC, DOCX, XLS, or XLSX file
   - Click "Upload File" button
   - Wait for the upload to complete
   - The form will automatically fill in:
     - File URL
     - File Type
     - File Size
     - Date (today's date)
5. Fill in any remaining details and click "Add File"

## File Storage

- Uploaded files are stored in `server/uploads/` directory
- Files are automatically renamed with a unique identifier to prevent conflicts
- Maximum file size: 50MB
- Allowed file types: PDF, DOC, DOCX, XLS, XLSX

## API Configuration

The frontend connects to the backend at `http://localhost:3001` by default.

To change the API URL, create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://your-server-url:3001
```

## Troubleshooting

### Server not starting
- Make sure port 3001 is not already in use
- Check that all dependencies are installed (`npm install` in server directory)

### Upload fails
- Check that the backend server is running
- Verify the file type is allowed (PDF, DOC, DOCX, XLS, XLSX)
- Check file size is under 50MB
- Check browser console for error messages

### CORS errors
- The server is configured to allow requests from `http://localhost:5173` (Vite default)
- If using a different port, update CORS settings in `server/server.js`

## Production Deployment

For production:
1. Update the API URL in your environment variables
2. Configure proper CORS settings for your domain
3. Set up proper file storage (consider cloud storage like AWS S3)
4. Implement authentication/authorization for the upload endpoint
5. Add rate limiting to prevent abuse

