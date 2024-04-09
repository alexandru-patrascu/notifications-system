# Notifications system

## Installation

1. Clone the repository:

```bash
git clone https://github.com/alexandru-patrascu/notifications-system.git
```

2. Navigate to the project directory:

```bash
cd notifications-system
```

3. Install Dependencies

```bash
cd message-sender && npm i
cd ..
```

```bash
cd notifications-display && npm i
cd ..
```

```bash
cd server npm i
cd ..
```

4. Create .env file for message-sender and paste:

```bash
PORT = 3000
REACT_APP_API_URL = http://localhost:3002
```

5. Create .env file for notifications-display and paste:

```bash
PORT = 3001
REACT_APP_API_URL = http://localhost:3002
```

6. Create .env file for server and paste:

```bash
PORT = 3002
WS_PORT = 8080
JWT_SECRET = randomString
MONGO_URI = mongodb://localhost:27017/notifications-system
```

7. You will need to have mongoDB installed and running

8. Start message-sender

```bash
cd message-sender && npm start
```

9. Start notifications-display

```bash
cd notifications-display && npm start
```

10. Start the server (will need a new terminal)

```bash
cd server && npm run dev
```

## Usage

1. Message Sender will run on `localhost:3000`, Notifications Display will run on `localhost:3001`, server will run on `localhost:3002`, WS Server will run on `ws://localhost:8080`
2. Open your web browser and navigate to the URL where the frontend server is running.
3. Login using

Message Sender:

```bash
username: admin
password: admin
```

Notifications Display

```bash
username: customer
password: customer
```
