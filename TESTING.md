# Testing Guide for Bixso Middleware

This guide explains how to test your ExpressJS middleware from different environments ("outside" clients).

## 1. Prerequisites
Ensure your server is running:
```bash
npm start
# Output should say: Server is running on port 3000
```

## 2. Testing Locally (Same Machine)
You can use a web browser, `curl`, or tools like Postman.

### Available Endpoints
- **Health Check**: `GET http://localhost:3000/`
- **MongoDB Test**: `GET http://localhost:3000/api/mongo/test`
- **PostgreSQL Test**: `GET http://localhost:3000/api/pg/test`

### Using cURL
```bash
curl http://localhost:3000/
curl http://localhost:3000/api/mongo/test
```

## 3. Testing from Local Network (LAN)
To allow other devices (phones, other laptops) on the same Wi-Fi/Network to connect:

1.  **Find your IP Address**:
    - Windows: Run `ipconfig` in terminal. Look for `IPv4 Address` (e.g., `192.168.1.15`).
2.  **Access from other device**:
    - URL: `http://192.168.1.15:3000/`
3.  **Troubleshooting**:
    - If it doesn't connect, check your Windows Firewall settings. You may need to allow Node.js through the firewall.

## 4. Testing from the Internet (Public Access)
To allow a client outside your network (e.g., a friend, a cloud webhook) to connect, use a tunneling tool like **ngrok**.

1.  **Install ngrok**: [Download here](https://ngrok.com/download).
2.  **Start the tunnel**:
    ```bash
    ngrok http 3000
    ```
3.  **Get the Public URL**:
    - ngrok will give you a URL like `https://a1b2-c3d4.ngrok-free.app`.
4.  **Test**:
    - Use that URL: `https://a1b2-c3d4.ngrok-free.app/api/mongo/test`

## 5. Client Integration Example (JavaScript/Frontend)
If you are building a frontend app (React, Vue, etc.), use `fetch`:

```javascript
// Example: Fetching data from your middleware
async function checkMongoStatus() {
  try {
    // Replace with your IP or ngrok URL if testing remotely
    const response = await fetch('http://localhost:3000/api/mongo/test');
    const data = await response.json();
    console.log('MongoDB Status:', data);
  } catch (error) {
    console.error('Error connecting to middleware:', error);
  }
}

checkMongoStatus();
```
