import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "quiet" | "nav";
type ButtonSize = "default" | "small";

interface ButtonProps {
	// href means this button navigates
	href?: string;
	// forces a plain anchor tag used for downloads
	download?: boolean;
	// visual emphasis
	variant?: ButtonVariant;
	// button size to include small variant
	size?: ButtonSize;
	// onClick method. NOTE: only used when there is no href.
	onClick?: () => void;
	// button type. NOTE: only used when there is no href.
	type?: "button" | "submit" | "reset";

	className?: string;
	children: React.ReactNode;
}

// Base classes used by all button types
const base = "relative inline-flex items-center gap-2 justify-center whitespace-nowrap border";

// Button variants per usage type
const variantClasses: Record<ButtonVariant, string> = {
	primary: `
        bg-ink text-paper border-ink highlight-box highlight-box-hover
        active:bg-charcoal active:border-charcoal
    `,
	secondary: `
        text-ink border-ink highlight-box highlight-box-hover
        active:text-charcoal active:border-charcoal active:bg-mild-grey/20
    `,
	quiet: `
        text-ink border-transparent underline underline-offset-4
        hover:text-pen-shinkai
        focus-visible:text-pen-shinkai
        active:text-charcoal
    `,
	nav: `
        text-ink border-transparent
        hover:text-pen-shinkai
        focus-visible:text-pen-shinkai
        active:text-charcoal
    `,
};

// Button size defaults
const sizeClasses: Record<ButtonSize, string> = {
	default: "min-h-11 px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base",
	small: "px-2 py-1 text-sm",
};

// Button default size mapping
const defaultSize: Record<ButtonVariant, ButtonSize> = {
	primary: "default",
	secondary: "default",
	quiet: "default",
	nav: "small",
};

export default function Button({
	href,
	download,
	variant = "primary",
	size = "default",
	onClick,
	type = "button",
	className = "",
	children,
}: ButtonProps) {
	const resolvedSize = size ?? defaultSize[variant];
	const classes = `${base} ${variantClasses[variant]} ${sizeClasses[resolvedSize]} ${className}`;

	// no href means it is a real button doing an action
	if (!href)
		return (
			<button
				onClick={onClick}
				type={type}
				className={`${classes} cursor-pointer`}
			>
				{children}
			</button>
		);

	// a file or an external target is a plain anchor, not a route
	if (download || href.startsWith("http") || href.startsWith("#")) {
		return (
			<a
				href={href}
				download={download}
				className={classes}
			>
				{children}
			</a>
		);
	}

	// otherwise it's a client-side link/route
	return (
		<Link
			href={href}
			className={classes}
		>
			{children}
		</Link>
	);
}
