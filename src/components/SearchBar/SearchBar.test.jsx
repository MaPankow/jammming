import SearchBar from "./SearchBar";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

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
})


// Notizen für Testmethoden:

// describe('Search Bar component', () => {

//   it('renders search bar correctly')

//   it('allows user to type into the input field')

//   it('calls searchSpotify when form is submitted')

//   it('stores the search term in localStorage')

//   it('prevents search if input is empty')

// })