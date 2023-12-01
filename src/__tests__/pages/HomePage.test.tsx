// !STARTERCONF You should delete this page

import { render, screen } from '@testing-library/react';

import RootLayout from '@/app/layout';
import HomePage from '@/app/page';

describe('Homepage', () => {
  it('renders the Components', () => {
    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    );

    const heading = screen.getByText(/Tra cứu văn bản QPPL/i);

    expect(heading).toBeInTheDocument();
  });
});
