import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "quiet";

interface ButtonProps {
	// href means this button navigates
	href?: string;
	// forces a plain anchor tag used for downloads
	download?: boolean;
	// visual emphasis
	variant?: ButtonVariant;
	// onClick method. NOTE: only used when there is no href.
	onClick?: () => void;
	// button type. NOTE: only used when there is no href.
	type?: "button" | "submit" | "reset";

	className?: string;
	children: React.ReactNode;
}

// Base classes used by all button types
const base =
	"relative inline-flex items-center gap-2 justify-center whitespace-nowrap border min-h-11 px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base";

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
};

export default function Button({
	href,
	download,
	variant = "primary",
	onClick,
	type = "button",
	className = "",
	children,
}: ButtonProps) {
	const classes = `${base} ${variantClasses[variant]} ${className}`;

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
				draggable={false}
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
			draggable={false}
			className={classes}
		>
			{children}
		</Link>
	);
}
