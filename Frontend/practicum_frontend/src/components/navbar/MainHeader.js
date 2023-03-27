import classes from "./MainHeader.module.css";
import { Navbar, Container, Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const MainHeader = () => {
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" className={classes.bg}>
      <Container>
        <Navbar.Brand className={classes.navBrand} href="/newDilemma">
          <FontAwesomeIcon icon={faCircleQuestion} />
          ANYTHING
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={classes.navbarToggleIcon}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={classes.navlink}>
            <Nav.Link href="/newDilemma">New Dilemma</Nav.Link>
            <Nav.Link href="/viewDilemma">View Dilemma</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
