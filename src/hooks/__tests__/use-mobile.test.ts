import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "../use-mobile";

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
    const mql = {
        matches,
        media: "",
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        onchange: null,
    };

    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(() => mql),
    });

    return mql;
};

// Mock window.innerWidth
const mockInnerWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: width,
    });
};

describe("useIsMobile", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return false for desktop screens (width >= 768px)", () => {
        mockInnerWidth(1024);
        const mql = mockMatchMedia(false);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);
        expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
        expect(mql.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    });

    it("should return true for mobile screens (width < 768px)", () => {
        mockInnerWidth(375);
        const mql = mockMatchMedia(true);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(true);
        expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
        expect(mql.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    });

    it("should return true for tablet screens at breakpoint (width = 767px)", () => {
        mockInnerWidth(767);
        const mql = mockMatchMedia(true);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(true);
    });

    it("should return false for screens just above breakpoint (width = 768px)", () => {
        mockInnerWidth(768);
        const mql = mockMatchMedia(false);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);
    });

    it("should update when screen size changes", () => {
        mockInnerWidth(1024);
        const mql = mockMatchMedia(false);

        const { result } = renderHook(() => useIsMobile());

        // Initially desktop
        expect(result.current).toBe(false);

        // Simulate screen resize to mobile
        act(() => {
            mockInnerWidth(375);
            const changeHandler = mql.addEventListener.mock.calls[0][1];
            changeHandler();
        });

        expect(result.current).toBe(true);
    });

    it("should cleanup event listener on unmount", () => {
        mockInnerWidth(1024);
        const mql = mockMatchMedia(false);

        const { unmount } = renderHook(() => useIsMobile());

        expect(mql.addEventListener).toHaveBeenCalled();

        unmount();

        expect(mql.removeEventListener).toHaveBeenCalledWith(
            "change",
            expect.any(Function)
        );
    });

    it("should handle multiple resize events correctly", () => {
        mockInnerWidth(1024);
        const mql = mockMatchMedia(false);

        const { result } = renderHook(() => useIsMobile());

        // Initially desktop
        expect(result.current).toBe(false);

        const changeHandler = mql.addEventListener.mock.calls[0][1];

        // Resize to mobile
        act(() => {
            mockInnerWidth(375);
            changeHandler();
        });
        expect(result.current).toBe(true);

        // Resize back to desktop
        act(() => {
            mockInnerWidth(1200);
            changeHandler();
        });
        expect(result.current).toBe(false);

        // Resize to small tablet
        act(() => {
            mockInnerWidth(600);
            changeHandler();
        });
        expect(result.current).toBe(true);
    });

    it("should handle edge cases with very small screens", () => {
        mockInnerWidth(320); // iPhone SE width
        const mql = mockMatchMedia(true);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(true);
    });

    it("should handle edge cases with very large screens", () => {
        mockInnerWidth(2560); // Large desktop monitor
        const mql = mockMatchMedia(false);

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);
    });

    it("should return false when isMobile is undefined initially", () => {
        // Don't set up window.innerWidth to simulate SSR/initial render
        Object.defineProperty(window, "innerWidth", {
            value: undefined,
            writable: true,
        });

        const mql = mockMatchMedia(false);

        const { result } = renderHook(() => useIsMobile());

        // !!undefined should return false
        expect(result.current).toBe(false);
    });
});
