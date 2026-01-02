# 🚀 Globopersona Dashboard

A modern, responsive marketing intelligence dashboard built for the Frontend Developer assessment. This application allows users to track campaigns, visualize segments, and draft emails using an AI assistant.

## ✨ Key Features

* **📊 Dynamic Dashboard:** Real-time overview of campaign statistics using responsive cards.
* **🤖 AI Integration:** A simulated Node.js backend (`/api/chat`) that powers the "Globopersona AI" chat interface.
* **🪄 Campaign Wizard:** A multi-step form state (Details -> Strategy -> Preview) to draft new campaigns.
* **💾 Local Storage Persistence:** New campaigns created in the wizard are saved and displayed on the Campaigns list page.
* **🎨 Modern UI:** Built with **Next.js 14**, **Tailwind CSS**, and **Lucide React** icons.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Language:** JavaScript (ES6+)

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

3.  **Open the App:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

* `/app`: Contains all pages (Dashboard, Campaigns, Wizard).
* `/components`: Reusable UI components like `Sidebar.js` and `StatCard.js`.
* `/app/api/chat`: The simulated Node.js backend for the AI feature.

---
*Built by [Your Name] for the Frontend Developer Assessment.*