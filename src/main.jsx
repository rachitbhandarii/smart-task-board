// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom";
import './index.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// using deprecated ReactDOM.render as the react-beautiful-dnd's functionality wasn't working by using the createRoot method.
ReactDOM.render(<App />, document.getElementById("root"));