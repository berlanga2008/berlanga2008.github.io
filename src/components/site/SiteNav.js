import { SiteLogo } from "./SiteLogo"
import React from "react"
import { Link } from "gatsby"
import { PrimaryNav } from "../navigation/PrimaryNav"
import { SiteIdentity } from "./SiteIdentity"
import { NavTitleLink } from "../navigation/NavTitleLink"
import { NavItemLink } from "../navigation/NavItemLink"

export const SiteNav = ({ title }) => (
  <PrimaryNav>
    <SiteIdentity>
      <SiteLogo />
      <NavTitleLink to="/">{title}</NavTitleLink>
    </SiteIdentity>
    <div>
      <Link to={"/"} />
      <NavItemLink to="/">Home</NavItemLink>
      <NavItemLink to="/category/blog">Blog</NavItemLink>
      <NavItemLink to="/bio">Bio</NavItemLink>
    </div>
  </PrimaryNav>
)
