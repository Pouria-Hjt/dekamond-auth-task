import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders Card component", () => {
      render(
        <Card data-testid="card">
          <CardContent>Card content</CardContent>
        </Card>,
      );

      const card = screen.getByTestId("card");
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute("data-slot", "card");
    });

    it("applies custom className", () => {
      render(
        <Card className="custom-card-class" data-testid="card">
          <CardContent>Card content</CardContent>
        </Card>,
      );

      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-card-class");
    });

    it("forwards props to underlying div", () => {
      render(
        <Card data-testid="card" role="region" aria-label="Card region">
          <CardContent>Card content</CardContent>
        </Card>,
      );

      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("role", "region");
      expect(card).toHaveAttribute("aria-label", "Card region");
    });
  });

  describe("CardHeader", () => {
    it("renders CardHeader component", () => {
      render(
        <Card>
          <CardHeader data-testid="card-header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>,
      );

      const header = screen.getByTestId("card-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("data-slot", "card-header");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardHeader className="custom-header-class" data-testid="card-header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>,
      );

      const header = screen.getByTestId("card-header");
      expect(header).toHaveClass("custom-header-class");
    });
  });

  describe("CardTitle", () => {
    it("renders CardTitle component", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle data-testid="card-title">Card Title</CardTitle>
          </CardHeader>
        </Card>,
      );

      const title = screen.getByTestId("card-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("data-slot", "card-title");
      expect(title).toHaveTextContent("Card Title");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title-class" data-testid="card-title">
              Card Title
            </CardTitle>
          </CardHeader>
        </Card>,
      );

      const title = screen.getByTestId("card-title");
      expect(title).toHaveClass("custom-title-class");
    });
  });

  describe("CardDescription", () => {
    it("renders CardDescription component", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription data-testid="card-description">
              Card description text
            </CardDescription>
          </CardHeader>
        </Card>,
      );

      const description = screen.getByTestId("card-description");
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute("data-slot", "card-description");
      expect(description).toHaveTextContent("Card description text");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription
              className="custom-description-class"
              data-testid="card-description"
            >
              Card description text
            </CardDescription>
          </CardHeader>
        </Card>,
      );

      const description = screen.getByTestId("card-description");
      expect(description).toHaveClass("custom-description-class");
    });
  });

  describe("CardContent", () => {
    it("renders CardContent component", () => {
      render(
        <Card>
          <CardContent data-testid="card-content">
            Card content goes here
          </CardContent>
        </Card>,
      );

      const content = screen.getByTestId("card-content");
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute("data-slot", "card-content");
      expect(content).toHaveTextContent("Card content goes here");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardContent
            className="custom-content-class"
            data-testid="card-content"
          >
            Card content goes here
          </CardContent>
        </Card>,
      );

      const content = screen.getByTestId("card-content");
      expect(content).toHaveClass("custom-content-class");
    });
  });

  describe("CardFooter", () => {
    it("renders CardFooter component", () => {
      render(
        <Card>
          <CardFooter data-testid="card-footer">Footer content</CardFooter>
        </Card>,
      );

      const footer = screen.getByTestId("card-footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute("data-slot", "card-footer");
      expect(footer).toHaveTextContent("Footer content");
    });

    it("applies custom className", () => {
      render(
        <Card>
          <CardFooter className="custom-footer-class" data-testid="card-footer">
            Footer content
          </CardFooter>
        </Card>,
      );

      const footer = screen.getByTestId("card-footer");
      expect(footer).toHaveClass("custom-footer-class");
    });
  });

  describe("Card Integration", () => {
    it("renders complete card with all components", () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Test Card</CardTitle>
            <CardDescription data-testid="description">
              This is a test card description
            </CardDescription>
          </CardHeader>
          <CardContent data-testid="content">
            <p>This is the card content</p>
          </CardContent>
          <CardFooter data-testid="footer">
            <button>Action</button>
          </CardFooter>
        </Card>,
      );

      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("title")).toHaveTextContent("Test Card");
      expect(screen.getByTestId("description")).toHaveTextContent(
        "This is a test card description",
      );
      expect(screen.getByTestId("content")).toHaveTextContent(
        "This is the card content",
      );
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveTextContent("Action");
    });
  });
});
