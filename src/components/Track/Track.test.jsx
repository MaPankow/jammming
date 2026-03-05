import Track from './Track';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('Track component', () => {

    const mockTrack = {
        name: 'Test Song',
        artists: [{ name: 'Test Artist' }],
        album: {
            name: 'Test Album',
            images: [{ url: 'test.jpg'}]
        }
    };

    it('renders track information correctly', () => {
        render(
            <Track 
                track={mockTrack}
                onAction={() => {}}
                actionLabel="+"
            />
        );

        expect(screen.getByText(/Test Song/)).toBeInTheDocument();
        expect(screen.getByText(/Test Artist/)).toBeInTheDocument();
        expect(screen.getByText(/Test Album/)).toBeInTheDocument();
    });

    it('calls onAction with track when button is clicked', async () => {
    const mockOnAction = vi.fn();

    render(
      <Track 
        track={mockTrack} 
        onAction={mockOnAction} 
        actionLabel="+"
      />
    );

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockOnAction).toHaveBeenCalledWith(mockTrack);
  });

})