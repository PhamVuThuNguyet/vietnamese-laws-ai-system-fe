/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

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
