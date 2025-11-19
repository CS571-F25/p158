import { Card, Button } from "react-bootstrap";

export default function ItemCard({ name, price, image }) {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={image} alt={name} />

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          ${price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
