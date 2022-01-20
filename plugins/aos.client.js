import AOS from "aos";
import "aos/dist/aos.css";

export default ({ app }) => {
    app.AOS = new AOS.init({
        // disable: window.innerWidth < 640,
        // offset: 200,
        
        duration: 300,
        easing: 'ease-in-cubic',
        once: false
    }); // or any other options you need
};