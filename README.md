Here's an expanded and detailed version of your README with additional context on what you did for the project:

---

# Prime Video Clone

Welcome to my **Prime Video Clone** project! 🎥🚀

This project is a clone of the popular **Prime Video** streaming platform, built using **React**, **Tailwind CSS**, and other modern web technologies. The clone closely mimics the UI and functionality of Prime Video, allowing users to explore top-rated movies, TV shows, watch trailers, and maintain a personalized **wishlist**. The app also features **user authentication** and a **seamless browsing experience**.

Check out the **live demo** of the app hosted on Vercel:

[**View the live demo here**](https://prime-video-clone-opba.vercel.app)

---

## 📸 Screenshots

![Homepage Screenshot](./assets/images/homepage.png)  
*Prime Video Clone Homepage*  

![Trailer Modal Screenshot](./assets/images/trailer-modal.png)  
*Trailer Modal*

---

## 🎯 Features

- **Top-rated Movies & TV Shows**: 
   - View top-rated movies and TV shows fetched from **The Movie Database API (TMDb)**. Each show/movie is displayed with images, details like genres, IMDb ratings, release dates, and trailers.
   - Scroll through a carousel of movie posters with smooth horizontal scrolling using Tailwind CSS and React.

- **Wishlist**: 
   - Users can add/remove movies and TV shows to/from their personal wishlist.
   - The wishlist is stored in **Supabase** and is linked to user authentication via **Clerk** for a personalized experience.

- **Movie & TV Show Details**:
   - Get detailed information about a selected movie/TV show including its genres, release date, overview, and IMDb rating.
   - Click on a movie/show to navigate to its dedicated page where you can view the trailer, details, and add it to your wishlist.

- **Trailer Player**: 
   - Watch movie trailers directly within the app. Clicking on a trailer button opens a modal that plays the trailer using an embedded YouTube player.

- **User Authentication**: 
   - Secure user login/logout functionality powered by **Clerk** authentication.
   - Personalize the browsing experience by linking users to their wishlist and keeping track of added movies and TV shows.

- **Responsive Design**:
   - The app is fully responsive, ensuring smooth usability on mobile, tablet, and desktop screens.
   - Tailwind CSS was used to ensure the app looks good on all screen sizes, with a mobile-first design approach.

- **Smooth Scrolling**: 
   - Horizontal movie carousels with smooth scroll effects that let users navigate through content easily and quickly.

---

## 💻 Tech Stack

- **Frontend**: 
   - **React.js**: Used for building interactive UI components and handling state management.
   - **Tailwind CSS**: For responsive and utility-first styling, ensuring a clean and consistent design.
   - **React Router**: For navigation between pages (e.g., navigating from the homepage to movie details).
   - **Clerk Authentication**: For secure user authentication and management.
   - **Axios**: To fetch data from external APIs like TMDb.

- **Backend**: 
   - **Supabase**: Open-source backend-as-a-service (BaaS) for storing user data and managing the wishlist.

- **API**: 
   - **TMDb API**: Used to fetch movie and TV show data such as details, ratings, trailers, and more.

- **State Management**:
   - **React Context API**: Used for global state management like handling the wishlist.

---

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

---

## 📦 Project Structure

Here's a breakdown of the folder structure and what each folder/file contains:

- **`/src`**: Contains the main source code for the app.
  - **`/components`**: Reusable UI components (e.g., Button, TrailerModal).
  - **`/context`**: Contains React context for managing the global state (like the wishlist).
  - **`/pages`**: Contains React components for each page (e.g., Home, MovieDetails).
  - **`/services`**: API functions for interacting with the TMDb API and Supabase.
  - **`/assets`**: Images, icons, and other assets used throughout the app.

- **`/public`**: Public files, including the `index.html` and favicon.

- **`/tailwind.config.js`**: Tailwind CSS configuration.

---

## 💡 What I Learned

- **TMDb API Integration**: Understanding how to interact with third-party APIs to fetch movie and TV show data dynamically.
- **User Authentication with Clerk**: Implementing a user authentication system that securely manages users and their personalized data (wishlist).
- **State Management**: Using React Context API to manage global states across the app (such as the wishlist).
- **Responsive Design**: Leveraging Tailwind CSS to create a mobile-first, responsive layout that adapts well across different devices.
- **Supabase Backend**: Setting up a real-time database to store user data like the wishlist, without needing to manage a full-fledged backend.

---

## 🌟 Challenges Faced

- **Integrating Clerk Authentication**: Setting up user authentication with Clerk and managing the wishlist for each user was a key challenge. It required handling user sessions and ensuring that each user's data was persisted across different sessions.
  
- **Handling Large Data**: The TMDb API provides a lot of data, and efficiently fetching, managing, and displaying it on the UI was challenging, especially when dealing with large amounts of content like top-rated movies and TV shows.
  
- **Responsive UI**: Ensuring a smooth experience across devices, especially with the carousels and trailer modals, required fine-tuning the design with **Tailwind CSS**.

---




## 🙏 Acknowledgments

- **TMDb API**: For providing the data on movies, TV shows, and trailers.
- **Clerk**: For simplifying user authentication and management.
- **Supabase**: For backend-as-a-service and real-time database functionality.
- **Tailwind CSS**: For enabling quick and easy styling with a mobile-first approach.

---

Let me know if you need any more adjustments! 🚀
