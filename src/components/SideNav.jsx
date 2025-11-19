import { useState } from "react";
import { Button, Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideNav() {
    const [show, setShow] = useState(false);

    const open = () => setShow(true);
    const close = () => setShow(false);

    return (
        <>
            {/* Menu button fixed on top-left */}
            <Button
                variant="primary"
                onClick={open}
                style={{
                    margin: "10px",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: 1046
                }}
            >
                Menu
            </Button>

            <Offcanvas
                placement="start"
                show={show}
                onHide={close}
                backdrop={false}
                scroll={true}
                style={{
                    height: "100vh",        // FULL HEIGHT DOWN THE PAGE
                    maxHeight: "100vh",     // REMOVE LIMIT
                    borderRight: "1px solid #ccc", // OPTIONAL BORDER
                    backgroundColor: "#f8f9fa",    // OPTIONAL LIGHT BACKGROUND
                    paddingTop: "10px"       // Optional clean border
                }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Navigation</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" onClick={close}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" onClick={close}>About Me</Nav.Link>
                        <Nav.Link as={Link} to="/NewList" onClick={close}>Create a new list</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
