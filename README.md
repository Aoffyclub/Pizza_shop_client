
# 🍕 Pizza Shop

This is the frontend client for the Pizza Shop web application, built with Vite and React. It provides an intuitive user interface for browsing the menu, placing orders, and managing user accounts. Demo : http://45.154.26.220/pizza/

## 🛠️ Features

- Browse pizza menu with various options.
- User authentication (login and registration).
- Add items to the cart and place orders.
- View and manage user profiles.
- Responsive design for a seamless experience across devices.

## 🚀 Technologies Used

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) : For building the user interface.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E) : As the build tool for fast development.
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) : For making API requests.
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) : For routing within the application.
- ![Context API](https://img.shields.io/badge/Context_API-007ACC?style=for-the-badge&logo=react&logoColor=white) : For managing global state.

## ⚙️ Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aoffyclub/Pizza_shop_client.git
   cd Pizza_shop_client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and configure the following variables:

   ```plaintext
   VITE_BASE_API=<Your API base URL>
   VITE_BASE_URL=<Your frontend base URL>
   ```

   Replace `<Your API base URL>` with the base URL of your backend API and `<Your frontend base URL>` with the URL where the frontend will be hosted.

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application should now be running on `http://localhost:3000`.

## 📝 Usage

- **Navigating the Menu**: Browse the list of available pizzas and customize your order.
- **User Authentication**: Sign up for a new account or log in to an existing one.
- **Placing an Order**: Add items to your cart and proceed to checkout.
- **Managing Profile**: View and update your user information.

## 📂 Project Structure

The project structure is organized as follows:

```
Pizza_shop_client/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable components
│   ├── pages/            # Application pages
│   ├── context/          # Context API files
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   └── App.jsx           # Root component
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
└── vite.config.js        # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.


## 📧 Contact

For any inquiries, feel free to reach out to the project maintainer at [offfyclub@gmail.com](mailto:aoffyclub@gmail.com).
