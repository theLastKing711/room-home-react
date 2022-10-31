import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const StyledHeader = styled.header`
  z-index: 1000;
  position: absolute;
  top: 4rem;
  left: 6rem;

  .main-nav {
    display: flex;
    align-items: center;
  }

  .site-logo {
    font-size: 2rem;
    margin-right: 3rem;

    @media screen and (max-width: 500px) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .navigation-list {
    color: white;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-size: 1.1rem;

    &__link {
      position: relative;
      font-weight: bold;
      &::before {
        content: "";
        transition: transform 0.3s;
        position: absolute;
        top: 100%;
        left: 0;
        transform: scaleX(0);
        background-color: white;
        height: 1.5px;
        width: 100%;
      }

      &:hover::before {
        transform: scaleX(1);
      }
    }

    @media screen and (max-width: 500px) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &__link {
        color: black;
        &::before {
          background-color: black;
        }
      }

      &--is-hidden {
        display: none;
      }
    }
  }

  .close-btn {
    border: none;
    color: red;
    font-size: 1.5rem;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2rem;
  }

  .bars-button {
    border: none;
    color: var(--dark-gray);
    font-size: 1.5rem;
    background-color: transparent;
    cursor: pointer;
    margin-left: 2rem;
  }

  .mobile-nav {
    @media screen and (max-width: 500px) {
      position: fixed;
      top: 3rem;
      left: 0rem;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
    }
  }
`;

interface Props {
  isNavOpen: boolean;
  isScreenWidthSmall: boolean;
  closeNav: () => void;
  openNav: () => void;
}

const NavBar: React.FC<Props> = ({
  isNavOpen,
  isScreenWidthSmall,
  closeNav,
  openNav,
}: Props) => {
  return (
    <StyledHeader>
      <nav className="main-nav">
        {isScreenWidthSmall && !isNavOpen && (
          <div className="mobile-nav">
            {!isNavOpen && isScreenWidthSmall && (
              <button
                className="bars-button"
                aria-label="open navigation"
                onClick={openNav}
              >
                <FaBars />
              </button>
            )}
            {!isNavOpen && (
              <a href="/" className="site-logo">
                room
              </a>
            )}

            <div className="spacer"></div>
          </div>
        )}
        <ul
          className={`navigation-list ${
            isScreenWidthSmall && !isNavOpen ? "navigation-list--is-hidden" : ""
          }
          }`}
        >
          {isNavOpen && isScreenWidthSmall && (
            <li>
              <button
                className="close-btn"
                aria-label="close navigation"
                onClick={closeNav}
              >
                <AiOutlineClose />
              </button>
            </li>
          )}
          <li>
            {!isScreenWidthSmall && (
              <a href="/" className="site-logo site-logo--desktop">
                room
              </a>
            )}
          </li>
          <li>
            <a href="/" className="navigation-list__link">
              home
            </a>
          </li>
          <li>
            <a href="/" className="navigation-list__link">
              shop
            </a>
          </li>
          <li>
            <a href="/" className="navigation-list__link">
              about
            </a>
          </li>
          <li>
            <a href="/" className="navigation-list__link">
              contact
            </a>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default NavBar;
