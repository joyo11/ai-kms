# SARA AI-KMS

## Overview
SARA AI-KMS is an AI-powered knowledge management chatbot developed for SARA Learning. The system streamlines staff onboarding, training, and productivity by providing instant, structured answers from internal company documents. The chatbot features a modern, button-based interface and leverages a robust backend for real-time document retrieval and response generation.

## Design Decisions, Assumptions, and Technical Tidbits

### Chatbot Flow and Knowledge Retrieval
- **Button-Based Interaction:** The chatbot UI is designed for intuitive, button-driven navigation. Users select from predefined options to receive detailed, context-rich answers, ensuring a guided and user-friendly experience.
- **Document-Driven Responses:** All chatbot answers are sourced from four core internal documents (proposals, training materials, templates, and process documentation), ensuring accuracy and compliance with company knowledge.
- **Backend Integration:** The frontend (built with React/Next.js and Tailwind CSS, hosted on Vercel) communicates in real time with a Python backend (LangChain + Chroma) via a secure Ngrok tunnel. This enables dynamic retrieval and embedding of document content.
- **Context Awareness:** The system is designed to eventually support conversational context, allowing for follow-up questions and more natural dialogue.
- **Debounce and Duplicate Handling:** User input is debounced to prevent duplicate queries, and identical questions are blocked if submitted in rapid succession.

### Other Key Design Choices
- **Modern Stack:** Next.js 15, React 18, Tailwind CSS, and TypeScript for the frontend; Python, LangChain, and Chroma for the backend.
- **Secure API Bridge:** Ngrok is used to securely expose the local backend to the Vercel-hosted frontend during development and testing.
- **Feedback Mechanism:** Users can rate bot responses (👍/👎) to help improve answer quality.
- **Visual Hierarchy:** Bot responses use bold headers, bullet points, and icons for clarity and readability.

### Assumptions
- **Internal Knowledge Base:** All responses are strictly based on the four uploaded internal documents.
- **Button-First UX:** The chatbot is primarily button-driven, with free-text input as a secondary option.
- **English Language:** The system is designed for English-language interactions.

### Technical Tidbits
- **Auto-scroll:** The chat window always scrolls to the latest message for a seamless experience.
- **Session Handling:** The frontend manages chat state and disables input while the bot is responding.
- **Consistent Theming:** The UI maintains a dark, professional look throughout, with no white space or page overflow.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/joyo11/ai-kms.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your backend (Python, LangChain, Chroma) and expose it with Ngrok.
4. Configure the frontend to point to your backend API endpoint.
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Features in Detail
- **Button-Based Chat:** Users interact via clickable menu options for fast, structured answers.
- **Document Retrieval:** All responses are generated from embedded internal documents.
- **Contextual Follow-Ups:** The bot offers follow-up options after each answer.
- **Feedback:** Users can rate responses to help improve the system.
- **Modern UI/UX:** Responsive, dark-themed chat interface with auto-scroll and clear visual hierarchy.

---

## Code Structure
- **app/page.tsx:** Main chat UI and logic.
- **components/**: UI components for chat, buttons, avatars, etc.
- **public/**: Internal documents and assets.
- **lib/**: Utility functions.
- **Backend (Python):** LangChain/Chroma code for document embedding and retrieval (not included in this repo).

---

## Technologies Used
- **Next.js 15**
- **React 18**
- **Tailwind CSS**
- **TypeScript**
- **Python (LangChain, Chroma)**
- **Ngrok**

---

## Contact
For questions or support:

- **Email:** shafay11august@gmail.com
- **GitHub:** [@joyo11](https://github.com/joyo11)

---

## License
Copyright (c) 2025 Mohammad Shafay Joyo 