
# HousifyU

HousifyU is a student-focused housing platform designed to help university students discover and explore off-campus housing options, sublease opportunities, and essential resources for easier relocation and apartment searching.

## Features

- **Apartment Listings:**  
  Browse available apartments near campus with filters for distance, price range, bedroom types, and pet policy.

- **Apartment Detail Pages:**  
  View detailed information for each apartment, including multiple bedroom options, pricing, amenities, contact information, and images.

- **Sublet Forum:**  
  View or create sublease listings. Students can post available rooms with images, pricing, descriptions, and apartment names.

- **User Authentication:**  
  Register and log in securely. Session-based login system with protected routes and personalized access.

- **User Dashboard:**  
  Logged-in users can view their profile and manage (delete) their own sublease listings.

- **Search & Filter Tools:**  
  Apartments can be filtered by distance, price, pet policy, and bedroom availability using intuitive sliders and dropdowns.

- **Responsive Layout:**  
  Designed with responsiveness in mind to work well on desktops and mobile devices.

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS Templating
- HTML5, CSS3
- JavaScript (Frontend)
- Multer (for image upload)
- Express-Session & Connect-Mongo (session handling)
- Flash messages (for notifications)

## Project Structure

```
Housing-Project/
│
├── models/             # Mongoose schemas (User, Sublease, Apartment)
├── routes/             # Express route files
├── views/              # EJS view templates
├── public/             # Static assets (CSS, uploads, images)
├── config/             # Database configuration
├── .env                # Environment variables
├── server.js           # Main server entry point
└── README.md           # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/Housing-Project.git
   cd Housing-Project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Seed apartment data (if using a seeder script):
   ```
   node seedApartments.js
   ```

5. Start the server:
   ```
   node server.js
   ```

6. Open the browser and navigate to:
   ```
   http://localhost:3000
   ```

## Notes

- Image uploads are stored in the `/public/uploads` directory.
- You must be logged in to post a sublease.
- Each user can manage their own subleases from the profile page.

## Author

Created for ITSC 4155 - Software Development Project.  
Designed and developed by Joshua Sanderson.
