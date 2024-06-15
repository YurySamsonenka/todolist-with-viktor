type ButtonPropsType = {
	title: string
	onClick?:()=> void
	disabled?: boolean
	classes?: string
}

export const Button = ({title, onClick, disabled, classes}: ButtonPropsType) => {
	return (
		<button className={classes} disabled={disabled} onClick={onClick}>{title}</button>
	)
}
