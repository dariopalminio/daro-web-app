import React from "react";
import "./footer.css";


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
    <div className="footer">
    <p>© 2021 {companyName}. Content is available under these licenses.
        Power by Daro.</p>
  </div>
  );
};
export default Footer;