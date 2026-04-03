import Categories from "./components/sections/Categories";
import Header from "./components/layout/Header";
import HomeHero from "./components/sections/HomeHero";
import Showcase from "./components/sections/Showcase";
import Partners from "./components/sections/Partners";
import BrowseBrands from "./components/sections/BrowseBrands";
import Newsletter from "./components/sections/Newsletter";
import Footer from "./components/layout/Footer";

const App = () => (
  <>
    <Header />
    <main>
      <HomeHero />
      <Categories />
      <Showcase primary />
      <Partners />
      <BrowseBrands />
      <Showcase secondary />
      <Newsletter />
    </main>
    <Footer />
  </>
);

export default App;
