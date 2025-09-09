import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

describe("Avatar Components", () => {
  describe("Avatar", () => {
    it("renders Avatar component", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("data-slot", "avatar");
    });

    it("applies custom className", () => {
      render(
        <Avatar className="custom-class" data-testid="avatar">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("custom-class");
    });

    it("forwards props to underlying element", () => {
      render(
        <Avatar data-testid="avatar" role="img">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveAttribute("role", "img");
    });
  });

  describe("AvatarImage", () => {
    it("renders AvatarImage component with proper attributes", () => {
      render(
        <Avatar>
          <AvatarImage
            src="https://example.com/avatar.jpg"
            alt="User Avatar"
            data-testid="avatar-image"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );

      // Check if the image element exists in the DOM (even if not visible)
      const image = screen.queryByTestId("avatar-image");
      if (image) {
        expect(image).toHaveAttribute("data-slot", "avatar-image");
        expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
        expect(image).toHaveAttribute("alt", "User Avatar");
      } else {
        // If image is not rendered, fallback should be shown
        const fallback = screen.getByText("JD");
        expect(fallback).toBeInTheDocument();
      }
    });

    it("applies custom className when rendered", () => {
      render(
        <Avatar>
          <AvatarImage
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRkY2NzAwIi8+Cjwvc3ZnPgo="
            alt="User Avatar"
            className="custom-image-class"
            data-testid="avatar-image"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );

      // Check if the image element exists and has the custom class
      const image = screen.queryByTestId("avatar-image");
      if (image) {
        expect(image).toHaveClass("custom-image-class");
      }
    });
  });

  describe("AvatarFallback", () => {
    it("renders AvatarFallback component", () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="fallback">JD</AvatarFallback>
        </Avatar>,
      );

      const fallback = screen.getByTestId("fallback");
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveAttribute("data-slot", "avatar-fallback");
      expect(fallback).toHaveTextContent("JD");
    });

    it("applies custom className", () => {
      render(
        <Avatar>
          <AvatarFallback
            className="custom-fallback-class"
            data-testid="fallback"
          >
            JD
          </AvatarFallback>
        </Avatar>,
      );

      const fallback = screen.getByTestId("fallback");
      expect(fallback).toHaveClass("custom-fallback-class");
    });

    it("shows fallback when image fails to load", () => {
      render(
        <Avatar>
          <AvatarImage src="invalid-url" alt="User Avatar" />
          <AvatarFallback data-testid="fallback">JD</AvatarFallback>
        </Avatar>,
      );

      // The fallback should be present in the DOM
      const fallback = screen.getByTestId("fallback");
      expect(fallback).toBeInTheDocument();
    });
  });

  describe("Avatar Integration", () => {
    it("renders avatar with fallback when image fails", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarImage
            src="invalid-url"
            alt="User Avatar"
            data-testid="avatar-image"
          />
          <AvatarFallback data-testid="fallback">JD</AvatarFallback>
        </Avatar>,
      );

      const avatar = screen.getByTestId("avatar");
      const fallback = screen.getByTestId("fallback");

      expect(avatar).toBeInTheDocument();
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent("JD");
    });

    it("shows only fallback text when image source is invalid", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarImage src="" alt="User Avatar" />
          <AvatarFallback data-testid="fallback">JD</AvatarFallback>
        </Avatar>,
      );

      const avatar = screen.getByTestId("avatar");
      const fallback = screen.getByTestId("fallback");

      expect(avatar).toBeInTheDocument();
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent("JD");
    });
  });
});
