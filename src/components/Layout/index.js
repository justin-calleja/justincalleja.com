import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled, { withTheme } from "styled-components"
import GlobalStyles from "~styles/GlobalStyles"
import Typography from "~styles/Typography"
import Sidebar from "~components/Sidebar"
import MenuItem from "~components/MenuItem"
import MobileHeader from "~components/MobileHeader"
import MainContent from "~components/MainContent"
import useIsScrollingDown from "~utils/useIsScrollingDown"
import ThemeToggleButton from "~components/Button/ThemeToggle"
import SunAndMoon from "~components/Svg/SunAndMoon"
import ArrowLeft from "~components/Svg/ArrowLeft"
import { getColor } from "~utils/theme"

const menuItemPaths = {
  home: "/",
  about: "/about",
  blog: "/blog",
}

const menuItemTexts = {
  home: "Home",
  about: "About",
  blog: "Blog",
}

const Container = styled.div`
  nav {
    user-select: none;
    ul {
      list-style-type: none;
      a {
        color: inherit;
      }
    }
  }
`

const useRerenderOnMountByKeyChange = () => {
  const [isClient, setClient] = useState(false)
  // use key on what needs to be re-rendered after first render on client because of state
  // in e.g. localStorage i.e. state which cannot be known at SSR time.
  // Since you're keeping theme info in localStorage, you'll need to re-render everything
  // on first render if you want the theme from localStorage to take effect.
  // This might lead to a flash of styled content from the wrong theme but the only other
  // alternative is to delay rendering instead.
  const key = isClient ? "client" : "server"
  useEffect(() => {
    setClient(true)
  }, [])

  return key
}

const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            author
          }
        }
      }
    `,
  )

  return siteMetadata
}

const useSidebarState = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return [isOpen, toggle, close]
}

const Back = styled.span`
  display: flex;
  align-items: center;
`

const Layout = ({ children, location, theme }) => {
  const key = useRerenderOnMountByKeyChange()
  const { author } = useSiteMetadata()
  const isScrollingDown = useIsScrollingDown()
  const [isSidebarOpen, toggleSidebar, closeSidebar] = useSidebarState()

  const url = location && location.pathname ? location.pathname : ""
  const isHomeActive = url === menuItemPaths.home
  const isAboutActive = url.startsWith(menuItemPaths.about)
  const isBlogActive = url.startsWith(menuItemPaths.blog)
  const blogShowBack = url.length > menuItemPaths.blog.length
  const mobileHeaderContent = isHomeActive ? (
    author
  ) : isAboutActive ? (
    menuItemTexts.about
  ) : isBlogActive && blogShowBack ? (
    <Back>
      <ArrowLeft fill={getColor({ theme })} />
      {menuItemTexts.blog}
    </Back>
  ) : isBlogActive ? (
    menuItemTexts.blog
  ) : (
    ""
  )
  const mobileHeaderLink =
    isHomeActive || isAboutActive ? "/about" : isBlogActive ? "/blog" : null

  return (
    <span>
      <GlobalStyles />
      <Typography />
      <Container key={key}>
        <Sidebar isOpen={isSidebarOpen}>
          <h2>{author}</h2>
          <nav>
            <ul>
              <MenuItem
                isActive={isHomeActive}
                to={menuItemPaths.home}
                onClick={closeSidebar}
              >
                {menuItemTexts.home}
              </MenuItem>
              {/* <MenuItem
                isActive={isAboutActive}
                to={menuItemPaths.about}
                onClick={closeSidebar}
              >
                {menuItemTexts.about}
              </MenuItem> */}
              <MenuItem
                isActive={isBlogActive}
                to={menuItemPaths.blog}
                onClick={closeSidebar}
              >
                {menuItemTexts.blog}
              </MenuItem>
            </ul>
          </nav>
          <ThemeToggleButton onClick={theme.toggleThemeName}>
            <SunAndMoon themeName={theme.name} />
          </ThemeToggleButton>
        </Sidebar>
        <MobileHeader
          isOpen={!isScrollingDown || isSidebarOpen}
          showText={isSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        >
          {mobileHeaderLink ? (
            <Link to={mobileHeaderLink}>{mobileHeaderContent}</Link>
          ) : (
            mobileHeaderContent
          )}
        </MobileHeader>
        <MainContent>{children}</MainContent>
      </Container>
    </span>
  )
}

export default withTheme(Layout)
