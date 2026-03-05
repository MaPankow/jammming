import SearchBar from "./SearchBar";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';


describe('Search Bar component', () => {
    it('renders search bar correctly', () => {
        const mockSearchSpotify = vi.fn();
        
        render(<SearchBar searchSpotify={mockSearchSpotify} />);

        expect(screen.getByText("Find your favourite tracks and add them to the playlist")).toBeInTheDocument();
        expect(screen.getByLabelText("Browse tracks:")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    });

    it('allows user to type into the input field', async () => {
        const mockSearchSpotify = vi.fn();

        render(<SearchBar searchSpotify={mockSearchSpotify} />);
        const user = userEvent.setup();
        const input = screen.getByLabelText(/browse tracks:/i);
        await user.type(input, "Muse");

        expect(input).toHaveValue("Muse");
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