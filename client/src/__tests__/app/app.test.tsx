import { render, screen } from '@testing-library/react'
import App from '../../app/App'

test('App should renders layout divs', () => {
  render(<App />)

  const appLayoutDiv: HTMLDivElement = screen.getByTestId(
    "AppLayout"
  ) as HTMLDivElement;

  const appBarDiv: HTMLDivElement = screen.getByTestId(
    "AppBar"
  ) as HTMLDivElement;

  const mainContainerDiv: HTMLDivElement = screen.getByTestId(
    "MainContainer"
  ) as HTMLDivElement;

  expect(appLayoutDiv).toBeInTheDocument
  expect(appBarDiv).toBeInTheDocument
  expect(mainContainerDiv).toBeInTheDocument
});
