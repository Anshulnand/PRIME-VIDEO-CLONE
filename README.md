# Prime Video Clone

Welcome to my Prime Video Clone project! 🎥🚀

This project is a clone of the popular **Prime Video** streaming platform, built with **React** and **Tailwind CSS**. The project mimics the user interface and functionality of Prime Video, providing a seamless browsing experience for movies, TV shows, and trailers. It also integrates features like a **wishlist**, **user authentication**, and more!

## 🚀 Live Demo

[View the live demo here](#) *(Link to your live project)*

## 📸 Screenshots

![Homepage Screenshot](./assets/images/homepage.png)  
*Prime Video Clone Homepage*  

![Trailer Modal Screenshot](./assets/images/trailer-modal.png)  
*Trailer Modal*

## 🎯 Features

- **Top Rated Movies/TV Shows**: View top-rated movies and TV shows with images, details, and trailer previews.
- **Wishlist**: Add and remove movies/TV shows from your personal wishlist.
- **Movie Details**: Get detailed information about a selected movie/TV show with genres, release date, and overview.
- **Trailer Player**: Watch movie trailers directly on the platform.
- **User Authentication**: Secure user login/logout using **Clerk** for authentication.
- **Responsive Design**: Fully responsive and mobile-friendly design built using **Tailwind CSS**.
- **Smooth Scrolling**: Horizontal movie carousels that allow smooth scrolling to view more content.

## 💻 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Clerk Authentication
- **Backend**: Supabase (for user data and wishlist management)
- **API**: The Movie Database API (TMDb) for fetching movie and TV show data
- **State Management**: React Context API for managing global states like the wishlist

## ⚙️ How to Run Locally

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/prime-video-clone.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd prime-video-clone
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add your **TMDb API Key** and **Clerk API Keys**:
      ```env
      REACT_APP_TMDB_API_KEY=your_tmdb_api_key
      REACT_APP_CLERK_FRONTEND_API=your_clerk_frontend_api
      REACT_APP_CLERK_API_KEY=your_clerk_api_key
      ```

5. **Run the development server**:
    ```bash
    npm start
    ```

6. **Visit your local app**:
    Open `http://localhost:3000` in your browser.

## 📦 Project Structure

Here's a breakdown of the folder structure and what each folder/file contains:

