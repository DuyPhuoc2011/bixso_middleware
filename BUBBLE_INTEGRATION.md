# Bubble.io Integration Guide

This guide explains how to configure your Bubble.io application to connect to your ExpressJS middleware API.

## Prerequisites

Since Bubble.io is a cloud-based platform, it needs to access your API over the internet. You have two options:

### Option 1: Deploy Your API (Recommended for Production)
Deploy your middleware to a cloud platform like:
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean**
- **AWS/Google Cloud**

### Option 2: Use ngrok for Testing (Quick Setup)
For development/testing, use ngrok to expose your local server:

```bash
# Install ngrok from https://ngrok.com/download
# Then run:
ngrok http 3000
```

You'll get a public URL like: `https://abc123.ngrok-free.app`

## Step-by-Step: Configure Bubble API Connector

### 1. Install API Connector Plugin
1. In Bubble editor, go to **Plugins** tab
2. Click **Add plugins**
3. Search for **API Connector**
4. Click **Install**

### 2. Add Your API
1. Go to **Plugins** → **API Connector**
2. Click **Add another API**
3. Name it: `Bixso Middleware` (or any name you prefer)

### 3. Configure API Settings
- **Authentication**: None (or add if you implement auth later)
- **Use a generic API**: Leave checked
- **Shared headers for all calls**: (Optional)
  - Add header: `Content-Type` = `application/json`

### 4. Add API Calls

#### Call 1: Get Articles from MongoDB

Click **Add another call** and configure:

**Name**: `Get Articles`

**Use as**: Data (for fetching data)

**Data type**: JSON

**Method**: GET

**URL**: 
```
https://your-ngrok-url.ngrok-free.app/api/mongo/articles
```
(Replace with your actual ngrok URL or deployed URL)

**Headers**: (Already set in shared headers)

**Parameters**: None needed for basic call

Click **Initialize call** to test it.

#### Call 2: Test MongoDB Connection

**Name**: `Test MongoDB`

**Use as**: Action (for testing)

**Data type**: JSON

**Method**: GET

**URL**: 
```
https://your-ngrok-url.ngrok-free.app/api/mongo/test
```

Click **Initialize call** to test.

#### Call 3: Test PostgreSQL Connection

**Name**: `Test PostgreSQL`

**Use as**: Action

**Data type**: JSON

**Method**: GET

**URL**: 
```
https://your-ngrok-url.ngrok-free.app/api/pg/test
```

### 5. Initialize and Save
1. Click **Initialize call** for each API call
2. Bubble will make a test request and show you the response
3. Check the response structure
4. Click **Save** (top right)

## Using the API in Bubble

### Display Articles in a Repeating Group

1. **Add a Repeating Group** to your page
2. **Type of content**: Set to the data type from your API call
3. **Data source**: 
   - Click **Get data from an external API**
   - Select **Bixso Middleware - Get Articles**
4. Inside the repeating group, add **Text** elements
5. **Insert dynamic data** from the current cell's article fields

### Example: Display Article Titles

If your articles have a `title` field:
1. Add a **Text** element inside the repeating group
2. Click **Insert dynamic data**
3. Select: `Current cell's Article's title`

### Trigger API Call on Button Click

1. Add a **Button** to your page
2. **Start/Edit workflow**
3. Click **Add an action**
4. Select **Plugins** → **Bixso Middleware - Get Articles**
5. (Optional) Add another action to display results

## Important Notes

### CORS Configuration
Your middleware already has CORS enabled (`app.use(cors())`), so Bubble should be able to make requests without issues.

### ngrok Limitations
- Free ngrok URLs expire when you restart ngrok
- You'll need to update the URL in Bubble each time
- For production, deploy your API to a permanent hosting service

### API Response Format
Make sure your API returns JSON. Your current setup already does this:
```json
[
  {
    "_id": "...",
    "title": "...",
    "content": "..."
  }
]
```

### Adding Dynamic Parameters
If you want to add filters (e.g., search by title):

1. In your API call setup, add a **Parameter**:
   - Key: `search`
   - Private: unchecked
   - Optional: checked

2. Modify your middleware to accept query parameters (I can help with this)

3. In Bubble, when using the call, you can pass dynamic values

## Troubleshooting

### "API call failed" Error
- Check that your server is running (`npm start`)
- Verify the URL is correct (copy from ngrok terminal)
- Check browser console for CORS errors

### Empty Response
- Verify your MongoDB is connected
- Check that the `articles` collection has data
- Test the endpoint directly with curl first

### ngrok URL Changed
- Restart ngrok
- Copy the new URL
- Update all API calls in Bubble API Connector
- Re-initialize the calls

## Next Steps

1. **Add Authentication**: Implement API keys or JWT tokens
2. **Add POST Endpoints**: Allow Bubble to create/update data
3. **Deploy to Production**: Move from ngrok to a permanent hosting solution
4. **Add Error Handling**: Better error messages for Bubble to display

Need help with any of these? Let me know!
