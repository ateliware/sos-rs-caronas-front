import { render, screen } from '@testing-library/react';
import LoginPageContainer from './LoginPageContainer';

describe('LoginPageContainer', () => {
  it('renders without errors', () => {
    render(<LoginPageContainer>Test Content</LoginPageContainer>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with an advertisement image', () => {
    const loginImage = 'path/to/image.png';
    render(
      <LoginPageContainer loginImage={loginImage}>
        Test Content
      </LoginPageContainer>
    );
    const imageElement = screen.getByAltText('logo');
    expect(imageElement).toHaveAttribute('src', loginImage);
  });
});
