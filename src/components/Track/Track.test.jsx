import Track from './Track';
import { render, screen, fireEvent } from '@testing-library/react';

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

    it('calls onAction with track when button is clicked', () => {
    const mockOnAction = vi.fn();

    render(
      <Track 
        track={mockTrack} 
        onAction={mockOnAction} 
        actionLabel="+"
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnAction).toHaveBeenCalledWith(mockTrack);
  });

})