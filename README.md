# Smart Task Board

A modern task management application built with React, Vite, Tailwind CSS and Python.

## Features

- Drag and drop task management
- Attractive UI with Tailwind CSS
- Real-time updates
- Responsive design

## Prerequisites

- Node.js (v16 or v18 (only these versions supported by react-beautiful-dnd))
- Python (v3.8 or higher)
- npm package manager

## Setup Instructions

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will likely be available at `http://localhost:5173`

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # Linux/Mac
   python -m venv .venv
   source .venv/bin/activate
   ```

2. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`


