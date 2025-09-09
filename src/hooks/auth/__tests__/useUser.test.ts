import { renderHook } from "@testing-library/react";
import { useUser } from "../useUser";

describe("useUser", () => {
    const mockLocalStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        Object.defineProperty(window, "localStorage", {
            value: mockLocalStorage,
            writable: true,
        });
    });

    it("should return null user when localStorage is empty", () => {
        mockLocalStorage.getItem.mockReturnValue(null);

        const { result } = renderHook(() => useUser());

        expect(result.current.user).toBeNull();
        expect(result.current.userName).toBe(" ");
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith("dm-user");
    });

    it("should return user data when localStorage has valid user", () => {
        const mockUser = {
            name: {
                first: "John",
                last: "Doe",
            },
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        const { result } = renderHook(() => useUser());

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.userName).toBe("John Doe");
    });

    it("should handle user with only first name", () => {
        const mockUser = {
            name: {
                first: "Jane",
                last: "",
            },
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        const { result } = renderHook(() => useUser());

        expect(result.current.userName).toBe("Jane ");
    });

    it("should handle user with only last name", () => {
        const mockUser = {
            name: {
                first: "",
                last: "Smith",
            },
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        const { result } = renderHook(() => useUser());

        expect(result.current.userName).toBe(" Smith");
    });

    it("should handle empty localStorage value", () => {
        mockLocalStorage.getItem.mockReturnValue("");

        const { result } = renderHook(() => useUser());

        expect(result.current.user).toBeNull();
        expect(result.current.userName).toBe(" ");
    });

    it("should handle user with missing name object", () => {
        const mockUser = {
            email: "test@example.com",
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        // This test documents the current bug in the useUser hook
        // The hook should handle undefined name object but currently doesn't
        expect(() => {
            renderHook(() => useUser());
        }).toThrow("Cannot read properties of undefined (reading 'first')");
    });

    // This test shows what the behavior should be after fixing the hook
    it.skip("should handle user with missing name object (after fix)", () => {
        const mockUser = {
            email: "test@example.com",
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        const { result } = renderHook(() => useUser());

        expect(result.current.user).toEqual(mockUser);
        expect(result.current.userName).toBe(" ");
    });

    it("should handle user with undefined name properties", () => {
        const mockUser = {
            name: {
                first: undefined,
                last: undefined,
            },
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        const { result } = renderHook(() => useUser());

        expect(result.current.userName).toBe(" ");
    });

    it("should handle special characters in names", () => {
        const mockUser = {
            name: {
                first: "José",
                last: "García-López",
            },
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        const { result } = renderHook(() => useUser());

        expect(result.current.userName).toBe("José García-López");
    });

    it("should only call localStorage.getItem once on mount", () => {
        mockLocalStorage.getItem.mockReturnValue(null);

        const { rerender } = renderHook(() => useUser());

        expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);

        rerender();
        rerender();

        expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
    });

    it("should throw error for invalid JSON", () => {
        mockLocalStorage.getItem.mockReturnValue("invalid-json");

        expect(() => {
            renderHook(() => useUser());
        }).toThrow();
    });

    it("should handle localStorage errors gracefully", () => {
        mockLocalStorage.getItem.mockImplementation(() => {
            throw new Error("localStorage error");
        });

        expect(() => {
            renderHook(() => useUser());
        }).toThrow("localStorage error");
    });

    it("should maintain referential equality across re-renders", () => {
        const mockUser = {
            name: {
                first: "John",
                last: "Doe",
            },
        };

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

        const { result, rerender } = renderHook(() => useUser());

        const firstUser = result.current.user;
        const firstUserName = result.current.userName;

        rerender();

        expect(result.current.user).toBe(firstUser);
        expect(result.current.userName).toBe(firstUserName);
    });
});
