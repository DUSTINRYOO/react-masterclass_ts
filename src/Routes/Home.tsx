import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  getLatest,
  getMovies,
  getTopRated,
  getUpComing,
  IGetLatestResult,
  IGetMoviesResult,
  IGetTopRatedResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Category = styled.span`
  font-size: 30px;
  font-weight: 700;
  position: absolute;
  top: -50px;
  left: 10px;
  z-index: 1;
`;
const Btn = styled.div`
  opacity: 0.6;
  font-size: 36px;
  text-align: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  &:first-child {
    top: 80px;
    left: 10px;
  }
  &:nth-child(2) {
    top: 80px;
    right: 10px;
  }
  z-index: 1;
  &:hover {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
  &:active {
    scale: 1.4;
    transition: all 0.3s ease-in-out;
  }
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const LatestSlider = styled.div`
  position: relative;
  top: -380px;
`;
const TopRatedSlider = styled.div`
  position: relative;
  top: 180px;
`;
const UpComingSlider = styled.div`
  position: relative;
  top: 460px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 2;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 3;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: (direction: boolean) => ({
    x: direction ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: boolean) => ({
    x: direction ? -window.outerWidth : window.outerWidth,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const history = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();
  const { data: latestData, isLoading: loadingLatest } =
    useQuery<IGetLatestResult>(["latest"], getLatest);

  const { data: topRatedData, isLoading: loadingTopRated } =
    useQuery<IGetTopRatedResult>(["movies", "topRated"], getTopRated);
  const { data: upComingData, isLoading: loadingUpComing } =
    useQuery<IGetMoviesResult>(["movies", "upComing"], getUpComing);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(latestData);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [upComingIndex, setUpComingIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = async () => {
    if (data) {
      if (leaving) return;
      await setDirection(true);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = async () => {
    if (data) {
      if (leaving) return;
      await setDirection(false);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseTopIndex = async () => {
    if (topRatedData) {
      if (leaving) return;
      await setDirection(true);
      toggleLeaving();
      const totalMovies = topRatedData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setTopRatedIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseTopIndex = async () => {
    if (topRatedData) {
      if (leaving) return;
      await setDirection(false);
      toggleLeaving();
      const totalMovies = topRatedData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setTopRatedIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseUpComingIndex = async () => {
    if (upComingData) {
      if (leaving) return;
      await setDirection(true);
      toggleLeaving();
      const totalMovies = upComingData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setUpComingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseUpComingIndex = async () => {
    if (upComingData) {
      if (leaving) return;
      await setDirection(false);
      toggleLeaving();
      const totalMovies = upComingData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setUpComingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={direction}
            >
              <Btn onClick={decreaseIndex}>⬅️</Btn>
              <Btn onClick={increaseIndex}>➡️</Btn>
              <Category>Now playing</Category>
              <Row
                custom={direction}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <LatestSlider>
            <Category>Latest</Category>
            <Row>
              {latestData && latestData.adult === false ? (
                <Box
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(latestData.poster_path!, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{latestData?.title}</h4>
                  </Info>
                </Box>
              ) : null}
            </Row>
          </LatestSlider>
          <TopRatedSlider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={direction}
            >
              <Btn onClick={decreaseTopIndex}>⬅️</Btn>
              <Btn onClick={increaseTopIndex}>➡️</Btn>
              <Category>Top Rated</Category>
              <Row
                custom={direction}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={topRatedIndex}
              >
                {topRatedData?.results
                  .slice(
                    offset * topRatedIndex,
                    offset * topRatedIndex + offset
                  )
                  .map((topMoive) => (
                    <Box
                      layoutId={topMoive.id + "top"}
                      key={topMoive.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(topMoive.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(topMoive.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{topMoive.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </TopRatedSlider>
          <UpComingSlider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={direction}
            >
              <Btn onClick={decreaseUpComingIndex}>⬅️</Btn>
              <Btn onClick={increaseUpComingIndex}>➡️</Btn>
              <Category>Up Coming</Category>
              <Row
                custom={direction}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={upComingIndex}
              >
                {upComingData?.results

                  .slice(
                    offset * upComingIndex,
                    offset * upComingIndex + offset
                  )
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + "Up"}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </UpComingSlider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
