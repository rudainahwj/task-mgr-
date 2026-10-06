# \# ✦ TASK://MGR — Full-Stack Task Manager

# 

# TASK://MGR is a full-stack task management application built with \*\*React, Spring Boot, and Microsoft SQL Server\*\*.

# 

# The project was originally developed as a CRUD-based task management application and was later extended with \*\*secure user authentication and user-specific task ownership using Spring Security\*\*.

# 

# Users can create an account, sign in, and manage their own tasks with support for priorities, statuses, due dates, search, filtering, and sorting. The application also features two distinct interfaces: a retro Y2K-inspired dark mode and a clean modern light mode.

# 

# \## 📸 Screenshots

# 

# \### Landing Page

# 

# !\[TASK MGR Landing Page](screenshots/landing-page.png)

# 

# \### Create Account

# 

# !\[TASK MGR Registration](screenshots/register-page.png)

# 

# \### Dashboard — Dark Mode

# 

# !\[TASK MGR Dark Dashboard](screenshots/dashboard-dark.png)

# 

# \### Dashboard — Light Mode

# 

# !\[TASK MGR Light Dashboard](screenshots/dashboard-light.png)

# 

# \## ✨ Features

# 

# \- User registration and sign in

# \- Secure session-based authentication

# \- User-specific task ownership

# \- Create, edit, and delete tasks

# \- Update task status

# \- Task priorities and due dates

# \- Search tasks

# \- Filter by status and priority

# \- Sort by due date and priority

# \- Dashboard task statistics

# \- Persistent authenticated sessions

# \- User avatar selection

# \- Dark and light themes

# \- Responsive user interface

# 

# \## 🔐 Authentication \& Security

# 

# The authentication system was added as an extension to the original task management application using \*\*Spring Security\*\*.

# 

# It includes:

# 

# \- BCrypt password hashing

# \- Session-based authentication

# \- CSRF protection for state-changing requests

# \- Protected task API endpoints

# \- User-level task authorization

# \- Credential-aware CORS configuration

# 

# Tasks are associated with their authenticated owner, ensuring that users can only access and modify their own tasks.

# 

# \## 🛠️ Tech Stack

# 

# \### Frontend

# 

# \- React

# \- JavaScript

# \- Vite

# \- Tailwind CSS

# \- Fetch API

# 

# \### Backend

# 

# \- Java 17

# \- Spring Boot

# \- Spring Security

# \- Spring Data JPA

# \- Hibernate

# \- REST APIs

# \- OpenAPI / Swagger

# 

# \### Database

# 

# \- Microsoft SQL Server

# 

# \## 🏗️ Architecture

# 

# The project is separated into a React frontend and Spring Boot backend:

# 

# ```text

# TaskManager/

# ├── Backend/

# │   └── Spring Boot REST API

# │

# ├── Frontend/

# │   └── React + Vite application

# │

# └── screenshots/

# ```

# 

# The React frontend communicates with the Spring Boot REST API. Spring Data JPA and Hibernate handle persistence to Microsoft SQL Server.

# 

# Authentication is maintained using server-side HTTP sessions, while task queries are scoped to the authenticated user.

# 

# \## 📡 API Endpoints

# 

# \### Authentication

# 

# | Method | Endpoint | Description |

# | --- | --- | --- |

# | POST | `/api/auth/register` | Create a new user account |

# | POST | `/api/auth/login` | Sign in |

# | GET | `/api/auth/me` | Get the authenticated user |

# | POST | `/api/auth/logout` | Sign out |

# 

# \### Tasks

# 

# | Method | Endpoint | Description |

# | --- | --- | --- |

# | GET | `/api/tasks` | Get the authenticated user's tasks |

# | POST | `/api/tasks` | Create a new task |

# | GET | `/api/tasks/{id}` | Get a specific task |

# | PUT | `/api/tasks/{id}` | Update a task |

# | PATCH | `/api/tasks/{id}/status` | Update task status |

# | DELETE | `/api/tasks/{id}` | Delete a task |

# 

# \## 🚀 Running Locally

# 

# \### Prerequisites

# 

# Make sure you have:

# 

# \- Java 17+

# \- Node.js

# \- Maven

# \- Microsoft SQL Server

# 

# \### 1. Database

# 

# Create a Microsoft SQL Server database named:

# 

# ```text

# TaskManagerDB

# ```

# 

# Configure the following environment variables for the backend:

# 

# ```text

# DB\_USERNAME=your\_database\_username

# DB\_PASSWORD=your\_database\_password

# ```

# 

# \### 2. Backend

# 

# Navigate to the backend directory and start the Spring Boot application.

# 

# The API runs locally at:

# 

# ```text

# http://localhost:8080

# ```

# 

# \### 3. Frontend

# 

# Navigate to the frontend directory:

# 

# ```bash

# cd Frontend

# ```

# 

# Install the dependencies:

# 

# ```bash

# npm install

# ```

# 

# Create a `.env` file using `.env.example` and configure the backend API URL.

# 

# Then start the development server:

# 

# ```bash

# npm run dev

# ```

# 

# The frontend runs locally at:

# 

# ```text

# http://localhost:5173

# ```

# 

# \## 📚 API Documentation

# 

# The backend includes \*\*OpenAPI / Swagger\*\* documentation for exploring and testing the REST API while the application is running.

# 

# \## 🔄 Project Development

# 

# TASK://MGR began as a full-stack CRUD task management project focused on task creation, editing, status management, filtering, sorting, and database persistence.

# 

# The project was later revisited and extended to introduce a multi-user architecture. This included implementing Spring Security, session-based authentication, BCrypt password hashing, CSRF protection, user-specific task ownership, and integrating the authentication flow with the React frontend.

# 

# This extension provided practical experience evolving an existing application rather than rebuilding it from scratch.

# 

# \## 👩‍💻 Author

# 

# \*\*Rudainah Aljaberi\*\*  

# Final-year Computer Science student at London South Bank University.

