import { lazy, Suspense } from "react";
import "./App.css";
import { useRecoilState } from "recoil";
import { darkModeState } from "./components/constants/Store";
import Nav from "./components/pages/nav/Nav";
import { ThemeProvider } from "styled-components";
import { DARK_THEME, LIGHT_THEME } from "./style/ThemeStyle";
import GlobalStyles from "./style/GlobalStyles";
import { API_URL } from "./components/constants/api";
import Footer from "./components/pages/footer/Footer";
import { Content, ContentContainer } from "./style/Scroll";
import { Route, Routes } from "react-router";
import SEO from "./components/pages/seo/SEO";
import Loading from "./components/pages/loading/Loading";
import ToUp from "./components/pages/scroll/ToUp";
import BottomMenu from "./components/pages/scroll/BottomMenu";
import Searching from "./components/pages/search/Searching";
import useScrollRestoration from "./hooks/useScrollRestoration";

const MainContent = lazy(
  () => import("./components/pages/content/MainContent")
);
const SlideCategory = lazy(
  () => import("./components/pages/content/SlideCategory")
);
const Search = lazy(() => import("./pages/Search"));
const Detail = lazy(() => import("./pages/Detail"));

function App() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const scrollableDivRef = useScrollRestoration();

  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <div ref={scrollableDivRef} style={{ overflow: "auto", height: "100vh" }}>
        <GlobalStyles />
        <Nav />
        <ContentContainer>
          <Content>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <SEO title="Home" />
                      <MainContent />
                      {API_URL?.map((categories) => (
                        <SlideCategory key={categories.id} {...categories} />
                      ))}
                    </>
                  }
                />
                <Route path="/search" element={<Search />} />
                <Route path="/searching" element={<Searching />} />
                <Route path="/detail/:id" element={<Detail />} />
              </Routes>
            </Suspense>
          </Content>
          <BottomMenu />
          <Footer />
        </ContentContainer>
        <ToUp />
      </div>
    </ThemeProvider>
  );
}

export default App;
