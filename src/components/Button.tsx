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
const base = "relative inline-flex items-center gap-2 whitespace-nowrap border px-5 py-3";

const variantClasses: Record<ButtonVariant, string> = {
	primary: `
        bg-ink text-paper border-ink highlight-shade
        active:bg-charcoal active:border-charcoal
    `,
	secondary: `
        text-ink border-ink highlight-shade
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
	if (download || href.startsWith("http")) {
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
