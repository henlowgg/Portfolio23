import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'
import { Overlay } from './Overlay'
import { Navbar } from './components/Navbar'
import { SidebarData } from './components/SidebarData'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    {/* added navbar and sidebardata to be rendered, can remove the render if needed */}
    {/* <Navbar />
    <SidebarData /> */}
  </>
)