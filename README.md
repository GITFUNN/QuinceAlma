Technologies Used

  React with Typescript Vite: library for the user interface.
  Django: Python web development framework.
  Tailwind CSS: CSS design framework. (Includes Tailwind CSS, not standard CSS)
  SQLite: Database used for data storage.
  AWS EC2: Amazon Web Services cloud computing service used for deployment.
  Nginx: Web server used to serve the application.
  
Functionality:
  CRUD Operations: The application allows for creating and deleting invitations.
  Responsive: The user interface adapts to different screen sizes for an optimal user experience on mobile and desktop devices.

Deployment
  The project is deployed on an AWS EC2 server with Nginx as the web server. You can access the application through the following URL: (https://misxv.com.ar/Alma).

Installation and Usage

Clone the Repository:
  git clone https://github.com/GITFUNN/QuinceAlma.git

Install Dependencies:
  Frontend (React):
  cd frontend
  npm install

Backend (Django):
  cd backend_
  pip install -r requirements.txt

Configure the Database:
  The application uses SQLite as the default database and is pre configurated in settings.py.
  Run:
  python manage.py migrate
  
Run the backend:
  python manage.py runserver

Run the frontend:
  cd frontend
  npm run dev

If you encounter any problems, feel free to reach out, and I'll be happy to assist you!
  

  



