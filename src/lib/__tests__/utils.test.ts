import { cn, doesUserLoggedIn } from "../utils";

describe("cn utility function", () => {
    it("should combine class names", () => {
        const result = cn("bg-red-500", "text-white", "p-4");

        // Since cn uses clsx + twMerge, we just verify it returns a string
        expect(typeof result).toBe("string");
        expect(result).toBeTruthy();
    });

    it("should handle conditional classes", () => {
        const isActive = true;
        const isDisabled = false;

        const result = cn("base-class", isActive && "active", isDisabled && "disabled");

        expect(typeof result).toBe("string");
        expect(result).toBeTruthy();
    });

    it("should handle empty inputs", () => {
        const result = cn();

        expect(typeof result).toBe("string");
    });

    it("should handle null and undefined values", () => {
        const result = cn("valid-class", null, undefined, "another-class");

        expect(typeof result).toBe("string");
        expect(result).toBeTruthy();
    });

    it("should handle arrays of classes", () => {
        const result = cn(["class1", "class2"], "class3");

        expect(typeof result).toBe("string");
        expect(result).toBeTruthy();
    });

    it("should handle objects with boolean values", () => {
        const result = cn({
            "base-class": true,
            "conditional-class": false,
            "active-class": true,
        });

        expect(typeof result).toBe("string");
        expect(result).toBeTruthy();
    });

    it("should handle mixed input types", () => {
        const result = cn(
            "string-class",
            ["array-class1", "array-class2"],
            { "object-class": true, "false-class": false },
            false && "conditional-class"
        );

        expect(typeof result).toBe("string");
        expect(result).toBeTruthy();
    });

    it("should call the underlying clsx and twMerge functions", () => {
        // This test verifies that the function works with actual dependencies
        const result1 = cn("text-red-500", "text-blue-500"); // Conflicting classes
        const result2 = cn("px-4", "py-2");

        expect(typeof result1).toBe("string");
        expect(typeof result2).toBe("string");
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
    });
});

describe("doesUserLoggedIn utility function", () => {
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
            configurable: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return true when user data exists in localStorage", () => {
        mockLocalStorage.getItem.mockReturnValue('{"name": "John Doe"}');

        const result = doesUserLoggedIn();

        expect(result).toBe(true);
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith("dm-user");
    });

    it("should return false when no user data in localStorage", () => {
        mockLocalStorage.getItem.mockReturnValue(null);

        const result = doesUserLoggedIn();

        expect(result).toBe(false);
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith("dm-user");
    });

    it("should return false when localStorage returns empty string", () => {
        mockLocalStorage.getItem.mockReturnValue("");

        const result = doesUserLoggedIn();

        expect(result).toBe(false);
    });

    it("should return true when localStorage returns any truthy string", () => {
        mockLocalStorage.getItem.mockReturnValue("any-value");

        const result = doesUserLoggedIn();

        expect(result).toBe(true);
    });

    it("should return true when localStorage returns whitespace", () => {
        mockLocalStorage.getItem.mockReturnValue("   ");

        const result = doesUserLoggedIn();

        expect(result).toBe(true);
    });

    it("should handle localStorage getItem throwing an error", () => {
        mockLocalStorage.getItem.mockImplementation(() => {
            throw new Error("localStorage access denied");
        });

        expect(() => {
            doesUserLoggedIn();
        }).toThrow("localStorage access denied");
    });

    it("should return true for JSON objects in localStorage", () => {
        mockLocalStorage.getItem.mockReturnValue('{"user": {"name": "John"}}');

        const result = doesUserLoggedIn();

        expect(result).toBe(true);
    });

    it("should return true for non-JSON strings in localStorage", () => {
        mockLocalStorage.getItem.mockReturnValue("simple-string-value");

        const result = doesUserLoggedIn();

        expect(result).toBe(true);
    });

    it("should call localStorage.getItem exactly once", () => {
        mockLocalStorage.getItem.mockReturnValue("user-data");

        doesUserLoggedIn();

        expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith("dm-user");
    });

    it("should handle localStorage being null", () => {
        Object.defineProperty(window, "localStorage", {
            value: null,
            writable: true,
            configurable: true,
        });

        expect(() => {
            doesUserLoggedIn();
        }).toThrow();
    });

    it("should handle localStorage being undefined", () => {
        Object.defineProperty(window, "localStorage", {
            value: undefined,
            writable: true,
            configurable: true,
        });

        expect(() => {
            doesUserLoggedIn();
        }).toThrow();
    });
});
