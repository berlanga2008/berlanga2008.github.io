import React from "react"
import styled from "@emotion/styled"

const SiteIntroTitle = styled.h1`
  font-family: ${({ theme }) => theme.textFont};
  font-size: 3em;
  color: ${({ theme }) => theme.textColor};
  margin: 20px 0 0;
`

const SiteIntroHello = styled.small`
  font-size: 0.5em;
  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
  display: block;
`

const SiteIntroDescription = styled.h2`
  margin: 10px 0 20px;
  font-family: ${({ theme }) => theme.textFont};
  color: ${({ theme }) => theme.textColor};
  font-weight: 300;
`

export const SiteIntro = () => (
  <>
    <SiteIntroTitle>
      <SiteIntroHello>
        {/* <span role="img" aria-label="Waving">
          👋
</span> */}
        Hola!,
      </SiteIntroHello>
      Miguel Warrior Code
    </SiteIntroTitle>
    <SiteIntroDescription>
      Bienvenido a la web donde hablaré especialmente de React y Gatsby.
    </SiteIntroDescription>
  </>
)
