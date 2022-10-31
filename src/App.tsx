import styled from "styled-components";
import "./App.css";
import desktopHeroImage from "./images/desktop-image-hero-1.jpg";
import desktopHeroImage2 from "./images/desktop-image-hero-2.jpg";
import desktopHeroImage3 from "./images/desktop-image-hero-3.jpg";
import aboutDarkImage from "./images/image-about-dark.jpg";
import aboutLightImage from "./images/image-about-light.jpg";
import HeroImageMobile from "./images/mobile-image-hero-1.jpg";
import HeroImageMobile2 from "./images/mobile-image-hero-2.jpg";
import HeroImageMobile3 from "./images/mobile-image-hero-3.jpg";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useWindowSize } from "./hooks/useScreenWidth";
import { useRef, useState } from "react";
import NavBar from "./components/NavBar";

const meduimScreenWidth = 1050;
const imagesListLength = 2;

const StyledMain = styled.main`
  .first-row {
    height: 66.6666666666666666666666vh;
    background-color: white;
    display: flex;

    @media screen and (max-width: 1050px) {
      flex-direction: column;
      height: 100%;
    }
  }

  .hero-image-container {
    position: relative;
    flex: 0 0 58%;
    overflow: hidden;
    @media screen and (max-width: 1050px) {
      flex: 100%;
    }
  }

  .hero-image {
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    /* height: 100%; */
    object-fit: cover;
    position: absolute;

    transition: transform 0.3s;

    &--active {
      transform: translateX(0);
      z-index: 3;
      position: relative;
    }

    &--next {
      transform: translateX(100%);
      z-index: 1;
    }

    &--prev {
      transform: translateX(-100%);
      z-index: 1;
    }

    &--place-holder {
      z-index: 2;
      transition: all 0;
    }
  }

  .main-description {
    flex: 0 0 42%;
    position: relative;
    /* margin: auto; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h1 {
      font-size: 2.6rem;
      /* max-width: 380px; */
      margin-bottom: 2.2rem;
    }
    p {
      color: var(--dark-gray);
      font-weight: 600;
      /* max-width: 450px; */
      line-height: 1.4;
      margin-bottom: 2.2rem;
    }

    a {
      font-size: 1rem;
      letter-spacing: 0.9rem;
      color: var(--very-dark-gray);
      font-weight: 600;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: var(--dark-gray);
      }
    }
  }

  .main-description-container {
    padding: 2rem 4rem;

    @media screen and (max-width: 1050px) {
      padding: 4rem 3.5rem;
    }
  }

  .carousel-controls {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 4;
    /* transform: translateX(100%); */

    &__control {
      background-color: black;
      border: none;
      padding: 1.5rem;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: var(--dark-gray);
      }

      @media screen and (max-width: 500px) {
        padding: 1rem;
      }
    }

    &--desktop {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  .second-row {
    height: 33.33333333333333333333333333333vh;
    background-color: white;
    display: flex;

    @media screen and (max-width: 1050px) {
      flex-direction: column;
      height: auto;
    }
  }

  .about-dark-image-container {
    flex: 1;
  }

  .about-dark-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .secondary-text {
    flex: 1.2;
    margin: auto;
    padding: 1rem 2rem;

    h2 {
      font-size: 1rem;
      letter-spacing: 0.5rem;
      color: black;
      margin-bottom: 1.1rem;
    }

    p {
      color: var(--dark-gray);
      font-weight: 600;
      /* max-width: 450px; */
      line-height: 1.4;
      margin-bottom: 0rem;
    }

    @media screen and (max-width: 1050px) {
      padding: 4rem 1.5rem;
    }
  }

  .about-light-image-container {
    flex: 1;
  }

  .about-light-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function App() {
  const screenWidth = useWindowSize();

  const [activeItem, setActiveItem] = useState(0);
  const placeHolder = useRef(0);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => {
    setIsNavOpen(true);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const nextItem = () => {
    placeHolder.current = activeItem;

    if (isLastItemActive(activeItem)) {
      // alert("gg");
      setActiveItem(0);
      return;
    } else {
      setActiveItem((prev) => prev + 1);
      return;
    }
  };

  const prevItem = () => {
    placeHolder.current = activeItem;

    if (isFirstItemActive(activeItem)) {
      setActiveItem(2);
      return;
    } else {
      setActiveItem((prev) => prev - 1);
      return;
    }
  };

  const isFirstItemActive = (activeIndex: number): boolean => {
    return activeIndex == 0;
  };

  const isLastItemActive = (activeIndex: number): boolean => {
    return activeIndex == 2;
  };

  const isItemActive = (activeIndex: number, index: number): boolean => {
    return activeIndex == index;
  };

  const isPrevItem = (activeIndex: number, index: number): boolean => {
    if (isFirstItemActive(activeIndex) && index == 2) {
      return true;
    }

    return activeIndex == index + 1;
  };

  const isNextItem = (activeIndex: number, index: number): boolean => {
    if (isLastItemActive(activeIndex) && index == 0) {
      return true;
    }

    return activeIndex == index - 1;
  };

  const calculateCarouselItemClass = (
    activeIndex: number,
    index: number
  ): string => {
    if (isItemActive(activeIndex, index)) {
      return "hero-image--active";
    } else if (isPrevItem(activeIndex, index)) {
      return "hero-image--prev";
    } else if (isNextItem(activeIndex, index)) {
      return "hero-image--next";
    }
    return "";
  };

  const IsScreenWidthSmall = (
    screenWidth: number | undefined,
    meduimScreenWidth: number
  ): boolean => screenWidth != undefined && screenWidth <= meduimScreenWidth;

  const desktopHeroImages = [
    desktopHeroImage,
    desktopHeroImage2,
    desktopHeroImage3,
  ];

  const mobileHeroImages = [
    HeroImageMobile,
    HeroImageMobile2,
    HeroImageMobile3,
  ];

  const carouselImages = IsScreenWidthSmall(screenWidth, meduimScreenWidth)
    ? mobileHeroImages
    : desktopHeroImages;

  const smallScreenWidth = 500;

  return (
    <StyledMain className="App">
      <div className="first-row">
        <section className="hero-image-container">
          {carouselImages.map((item, index) => (
            <img
              key={index}
              src={item}
              alt="hero image"
              className={`hero-image ${calculateCarouselItemClass(
                activeItem,
                index
              )}`}
            />
          ))}
          <img
            key={4}
            src={carouselImages[placeHolder.current]}
            alt="hero image"
            className={`hero-image hero-image--place-holder`}
          />
          <NavBar
            isNavOpen={isNavOpen}
            isScreenWidthSmall={IsScreenWidthSmall(
              screenWidth,
              smallScreenWidth
            )}
            openNav={openNav}
            closeNav={closeNav}
          />

          {IsScreenWidthSmall(screenWidth, meduimScreenWidth) && (
            <div className="carousel-controls">
              <button className="carousel-controls__control" onClick={prevItem}>
                <FiArrowLeft color="white" fontSize="2rem" />
              </button>
              <button className="carousel-controls__control" onClick={nextItem}>
                <FiArrowRight color="white" fontSize="2rem" />
              </button>
            </div>
          )}
        </section>
        <section className="main-description">
          <div className="main-description-container">
            <h1>Discover innovative ways to decorate</h1>
            <p>
              we Provide unmatched qulity, comfort, and style for property
              owners acrss the country. Our experts combile orm and function in
              bringing your vision to life. Create a room in rour own style with
              our collection and make your property ad reflection of you and
              what you love.
            </p>
            <a href="/" className="shop-now-link">
              SHOP NOW
            </a>
          </div>
          {!IsScreenWidthSmall(screenWidth, meduimScreenWidth) && (
            <div className="carousel-controls--desktop">
              <button className="carousel-controls__control" onClick={prevItem}>
                <FiArrowLeft color="white" fontSize="2rem" />
              </button>
              <button className="carousel-controls__control" onClick={nextItem}>
                <FiArrowRight color="white" fontSize="2rem" />
              </button>
            </div>
          )}
        </section>
      </div>

      <div className="second-row">
        <section className="about-dark-image-container">
          <img
            src={aboutDarkImage}
            className="about-dark-image"
            alt="dark hero image"
          />
        </section>
        <section className="secondary-text">
          <h2>ABOUT OUR FURNITURE</h2>
          <p>
            Our multifunctional collection blends design and function to suit
            your individual taste.Make each room unique, or ppick a cohesive
            theme that best express your intersts and what insipres you. Find
            the furniture pieces your need, from traditional to contempporary
            styles or anything in beteween.Product specialists are available to
            help you create your dream space.
          </p>
        </section>
        <section className="about-light-image-container">
          <img
            src={aboutLightImage}
            className="about-light-image"
            alt="dark hero image"
          />
        </section>
      </div>
    </StyledMain>
  );
}

export default App;
