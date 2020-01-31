import styled from "@emotion/styled"

export const PrimaryNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  border-bottom: 1px dotted grey;
  background-color: rgba(249, 249, 249, 1);


  @media (max-width: 1200px) {
    flex-direction: column;
  }
`
