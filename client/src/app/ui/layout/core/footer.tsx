import React from "react";
import * as StateConfig from '../../../../domain/domain.config';
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
    <p>© 2021 {StateConfig.app_company_name}. Content is available under these licenses.
        Power by Daro.</p>
  </div>
  );
};
export default Footer;