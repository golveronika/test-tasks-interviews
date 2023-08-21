import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../../context";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  // @ts-ignore
  const { state, actions } = useContext<IContext>(Context);
  const { i18n } = useTranslation();

  useEffect(() => {
    const { language } = i18n;
    const currentLanguage = state.language || "";

    if (currentLanguage !== language) actions.setLanguage(language);
  }, []);

  const handleLanguageChange = (language: string): void => {
    i18n.changeLanguage(language);
    actions.setLanguage(language);
  };

  return (
    <header>
      <Navbar expand="lg" className="bottom-shadow">
        <Container>
          <Navbar.Brand href="#">Sreality</Navbar.Brand>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
              {i18n.language.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-auto mw-unset">
              {i18n.languages
                .filter((lg) => lg !== i18n.language)
                .map((lg, indx) => (
                  <Dropdown.Item
                    className="w-auto mw-unset"
                    key={indx}
                    as="button"
                    onClick={() => handleLanguageChange(lg)}
                  >
                    {lg.toUpperCase()}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
