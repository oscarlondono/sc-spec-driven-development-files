import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, buttonVariants } from '@/components/ui/button';

describe('Button component', () => {
  describe('rendering', () => {
    it('renders a button element', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders its children as the label', () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('applies data-slot="button" attribute', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button');
    });
  });

  describe('disabled state', () => {
    it('is enabled by default', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeEnabled();
    });

    it('becomes disabled when the disabled prop is set', () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('className merging', () => {
    it('accepts a custom className', () => {
      render(<Button className="my-custom-class">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('my-custom-class');
    });
  });

  describe('buttonVariants helper', () => {
    it('returns a string for the default variant and size', () => {
      expect(typeof buttonVariants()).toBe('string');
    });

    it('returns a non-empty string', () => {
      expect(buttonVariants().length).toBeGreaterThan(0);
    });

    it('produces different output for different variants', () => {
      expect(buttonVariants({ variant: 'default' })).not.toBe(
        buttonVariants({ variant: 'destructive' }),
      );
    });

    it('produces different output for different sizes', () => {
      expect(buttonVariants({ size: 'default' })).not.toBe(buttonVariants({ size: 'lg' }));
    });
  });
});
