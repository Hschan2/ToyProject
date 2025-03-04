import { lazy, Suspense } from "react";
import "./App.css";
import { useRecoilState } from "recoil";
import { darkModeState } from "./common/store/store";
import Nav from "./common/nav/nav";
import { ThemeProvider } from "styled-components";
import { DARK_THEME, LIGHT_THEME } from "./style/ThemeStyle";
import GlobalStyles from "./style/GlobalStyles";
import { API_URL } from "./features/movie/api/movie-api-link";
import Footer from "./common/footer/footer";
import { Content, ContentContainer } from "./common/scroll/style/scroll-style";
import { Route, Routes } from "react-router";
import SEO from "./common/seo/seo";
import ToUp from "./common/layout/to-up-button";
import BottomMenu from "./common/layout/mobile-bottom-menu";
import Searching from "./features/search/search";
import useScrollRestoration from "./common/scroll/hooks/useScrollRestoration";
import Loading from "./common/loading/loading";

const MainContent = lazy(
  () => import("./features/movie/movie-main-slide")
);
const SlideCategory = lazy(
  () => import("./features/movie/movie-catetories")
);
const Search = lazy(() => import("./features/search/search-result"));
const Detail = lazy(() => import("./features/movie/detail"));

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
