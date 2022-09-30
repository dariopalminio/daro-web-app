import React from "react";
import styled from "styled-components";


const FooterContainer = styled.div`
display: flow;
width: 100%;
bottom: 0;
margin-bottom: 0px;
vertical-align: middle;
align-items: center;
justify-content: center;
text-align: center;
    `;

 interface Props {
  companyName: string;
  contactPhone?: string;
  contactAddress?: string;
}

/**
 * CartItem
 * 
 * Pattern: Presentation Component and Controled Component
 */
 const Footer: React.FC<Props> = ({ companyName, contactPhone, contactAddress}) => {

  return (
    <FooterContainer>
    <p>© 2021 {companyName}. Content is available under these licenses.
        Power by Daro.</p>
  </FooterContainer>
  );
};
export default Footer;