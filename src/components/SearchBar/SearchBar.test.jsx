import SearchBar from "./SearchBar";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';


beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    localStorage.clear();
});

const setup = () => {
    const user = userEvent.setup()
    const mockSearchSpotify = vi.fn();

    render(<SearchBar searchSpotify={mockSearchSpotify} />);
    
    return {
        user,
        mockSearchSpotify,
        input: screen.getByLabelText(/browse tracks/i),
        button: screen.getByRole("button", { name: /search/i })
    }; 
};


describe("Search Bar component", () => {
    it("renders search bar correctly", () => {
        render(<SearchBar searchSpotify={vi.fn()} />);

        expect(screen.getByText("Find your favourite tracks and add them to the playlist")).toBeInTheDocument();
        expect(screen.getByLabelText("Browse tracks:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    });

    it('allows user to type into the input field', async () => {
        const { user, input } = setup();

        await user.type(input, "Muse");
        
        expect(input).toHaveValue("Muse");
    });
    
    it('calls searchSpotify when form is submitted', async () => {
        const { user, input, button, mockSearchSpotify } = setup();
        
        await user.type(input, "Muse");
        await user.click(button);

        expect(mockSearchSpotify).toHaveBeenCalledWith("Muse");
    });

    it('stores the search term in localStorage', async () => {
        const { user, input, button } = setup();
        
        await user.type(input, "Muse");
        await user.click(button);

        expect(localStorage.getItem("last_search_term")).toBe("Muse");
    });

    it ('prevents search if input is empty',  async() => {
        const { user, input, button, mockSearchSpotify } = setup();

        await user.type(input, " ");
        await user.click(button);

        expect(mockSearchSpotify).not.toHaveBeenCalledWith();
    });
    
    it ('does not store empty input in localStorage', async() => {
        const { user, input, button } = setup();

        await user.type(input, " ");
        await user.click(button);

        expect(localStorage.getItem("last_search_term")).toBeNull();
    });

    it ('shows inline error message if input is empty', async() => {
        const { user, input, button } = setup();

        await user.type(input, " ");
        await user.click(button);

        expect(screen.getByText(/Bitte gib einen Suchbegriff ein/i)).toBeInTheDocument();

    });

    it ('hides error message when user starts typing again', async() => {
        const { user, input, button } = setup();

        await user.type(input, " ");
        await user.click(button);

        expect(screen.getByText(/Bitte gib einen Suchbegriff ein/i)).toBeInTheDocument();
        
        await user.type(input, "M");

        expect(screen.queryByText(/Bitte gib einen Suchbegriff ein/i)).not.toBeInTheDocument();
    })
})


