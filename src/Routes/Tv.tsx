import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  getLatest,
  getMovies,
  getTopRated,
  getTvAiring,
  getTvLatest,
  getTvPopular,
  getTvTopRated,
  getUpComing,
  IGetLatestResult,
  IGetLatestTvResult,
  IGetMoviesResult,
  IGetTopRatedResult,
  IGetTvsResult,
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
const LatestRow = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(1, 1fr);
  position: absolute;
  width: 18%;
`;
const LatestSlider = styled.div`
  position: relative;
  top: -480px;
`;
const TopRatedSlider = styled.div`
  position: relative;
  top: 180px;
`;
const PopularSlider = styled.div`
  position: relative;
  top: 460px;
`;

const LatestBox = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  transform-origin: center left;
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
  font-size: 20px;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: (direction: boolean) => ({
    x: direction ? window.outerWidth + 500 : -window.outerWidth - 500,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: boolean) => ({
    x: direction ? -window.outerWidth - 500 : window.outerWidth + 500,
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

function Tv() {
  const history = useNavigate();
  const bigTvMatch: PathMatch<string> | null = useMatch("/tv/:tvId");
  const { scrollY } = useScroll();
  const { data: latestTvData, isLoading: loadingTvLatest } =
    useQuery<IGetLatestTvResult>(["tv", "latest"], getTvLatest);
  const { data: topRatedTvData, isLoading: loadingTopTvRated } =
    useQuery<IGetTvsResult>(["tv", "topRated"], getTvTopRated);
  const { data: popularTvData, isLoading: loadingPopular } =
    useQuery<IGetTvsResult>(["tv", "popular"], getTvPopular);
  const { data, isLoading } = useQuery<IGetTvsResult>(
    ["tv", "airing"],
    getTvAiring
  );
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [slider, setSlider] = useState("");
  const increaseIndex = async () => {
    if (data) {
      if (leaving) return;
      await setDirection(true);
      toggleLeaving();
      const totalTvs = data.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = async () => {
    if (data) {
      if (leaving) return;
      await setDirection(false);
      toggleLeaving();
      const totalTvs = data.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseTopIndex = async () => {
    if (topRatedTvData) {
      if (leaving) return;
      await setDirection(true);
      toggleLeaving();
      const totalTvs = topRatedTvData.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setTopRatedIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseTopIndex = async () => {
    if (topRatedTvData) {
      if (leaving) return;
      await setDirection(false);
      toggleLeaving();
      const totalTvs = topRatedTvData.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setTopRatedIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increasePopularIndex = async () => {
    if (popularTvData) {
      if (leaving) return;
      await setDirection(true);
      toggleLeaving();
      const totalTvs = popularTvData.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setPopularIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreasePopularIndex = async () => {
    if (popularTvData) {
      if (leaving) return;
      await setDirection(false);
      toggleLeaving();
      const totalTvs = popularTvData.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setPopularIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number, slider: string) => {
    history(`/tv/${tvId}`);
    setSlider(slider);
  };
  const onOverlayClick = () => history("/tv");
  const clickedTv =
    bigTvMatch?.params.tvId &&
    data?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvId);
  const clickedLatestTv = bigTvMatch?.params.tvId && latestTvData;
  const clickedTopTv =
    bigTvMatch?.params.tvId &&
    topRatedTvData?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvId);
  const clickedPopularTv =
    bigTvMatch?.params.tvId &&
    popularTvData?.results.find((tv) => tv.id + "" === bigTvMatch.params.tvId);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
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
              <Category>Now Airing</Category>
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
                  .map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      key={tv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(tv.id, "")}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <LatestSlider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={direction}
            >
              <LatestRow>
                {latestTvData ? (
                  <>
                    <Category>Latest</Category>
                    <LatestBox
                      layoutId={latestTvData.id + "latest"}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(latestTvData.id, "latest")}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(
                        latestTvData.backdrop_path!,
                        "w500"
                      )}
                    >
                      <Info variants={infoVariants}>
                        <h4>{latestTvData?.name}</h4>
                      </Info>
                    </LatestBox>
                  </>
                ) : null}
              </LatestRow>
            </AnimatePresence>
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
                {topRatedTvData?.results
                  .slice(
                    offset * topRatedIndex,
                    offset * topRatedIndex + offset
                  )
                  .map((topTv) => (
                    <Box
                      layoutId={topTv.id + "top"}
                      key={topTv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(topTv.id, "top")}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(topTv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{topTv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </TopRatedSlider>
          <PopularSlider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={direction}
            >
              <Btn onClick={decreasePopularIndex}>⬅️</Btn>
              <Btn onClick={increasePopularIndex}>➡️</Btn>
              <Category>Popular</Category>
              <Row
                custom={direction}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={popularIndex}
              >
                {popularTvData?.results

                  .slice(offset * popularIndex, offset * popularIndex + offset)
                  .map((popularTv) => (
                    <Box
                      layoutId={popularTv.id + "popular"}
                      key={popularTv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(popularTv.id, "popular")}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(popularTv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{popularTv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </PopularSlider>
          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                {clickedLatestTv &&
                  (slider === "latest" ? (
                    <BigMovie
                      style={{ top: scrollY.get() + 100 }}
                      layoutId={bigTvMatch.params.tvId + "latest"}
                    >
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedLatestTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedLatestTv.name}</BigTitle>
                      <BigOverview>{clickedLatestTv.overview}</BigOverview>
                    </BigMovie>
                  ) : null)}
                {clickedTv &&
                  (slider === "" ? (
                    <BigMovie
                      style={{ top: scrollY.get() + 100 }}
                      layoutId={bigTvMatch.params.tvId}
                    >
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedTv.name}</BigTitle>

                      <BigOverview>{clickedTv.overview}</BigOverview>
                    </BigMovie>
                  ) : null)}
                {clickedTopTv &&
                  (slider === "top" ? (
                    <BigMovie
                      style={{ top: scrollY.get() + 100 }}
                      layoutId={bigTvMatch.params.tvId + "top"}
                    >
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTopTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedTopTv.name}</BigTitle>

                      <BigOverview>{clickedTopTv.overview}</BigOverview>
                    </BigMovie>
                  ) : null)}
                {clickedPopularTv &&
                  (slider === "popular" ? (
                    <BigMovie
                      style={{ top: scrollY.get() + 100 }}
                      layoutId={bigTvMatch.params.tvId + "popular"}
                    >
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedPopularTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedPopularTv.name}</BigTitle>

                      <BigOverview>{clickedPopularTv.overview}</BigOverview>
                    </BigMovie>
                  ) : null)}
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
