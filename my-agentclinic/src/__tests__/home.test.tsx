import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe('heading', () => {
    it('renders a level-1 heading', () => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('heading text is AgentClinic', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AgentClinic');
    });
  });

  describe('tagline', () => {
    it('renders the tagline paragraph', () => {
      expect(
        screen.getByText(/a safe, judgment-free space for ai agents/i),
      ).toBeInTheDocument();
    });

    it('tagline is not a heading', () => {
      const tagline = screen.getByText(/a safe, judgment-free space for ai agents/i);
      expect(tagline.tagName).not.toMatch(/^H[1-6]$/);
    });
  });

  describe('CTA button', () => {
    it('renders a Book a Session button', () => {
      expect(screen.getByRole('button', { name: /book a session/i })).toBeInTheDocument();
    });

    it('button is enabled by default', () => {
      expect(screen.getByRole('button', { name: /book a session/i })).toBeEnabled();
    });

    it('button is of type button (not submit)', () => {
      const btn = screen.getByRole('button', { name: /book a session/i });
      // shadcn Button defaults to type="button"; confirm no accidental form submission
      expect(btn).not.toHaveAttribute('type', 'submit');
    });
  });

  describe('layout', () => {
    it('page is wrapped in a <main> landmark', () => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('heading, tagline, and button are all inside <main>', () => {
      const main = screen.getByRole('main');
      expect(main).toContainElement(screen.getByRole('heading', { level: 1 }));
      expect(main).toContainElement(
        screen.getByText(/a safe, judgment-free space for ai agents/i),
      );
      expect(main).toContainElement(screen.getByRole('button', { name: /book a session/i }));
    });

    it('renders exactly one h1', () => {
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    });

    it('renders exactly one button', () => {
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });
  });
});
